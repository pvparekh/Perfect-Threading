import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = "http://127.0.0.1:3000";
const routes = ["/", "/about", "/services", "/booking", "/contact", "/blog", "/blog/facial-guide", "/blog/threading-guide", "/blog/waxing-guide"];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560, 3440];
const fullScreenshot = new Set(["/", "/about", "/services", "/booking", "/contact", "/blog", "/blog/facial-guide", "/blog/threading-guide", "/blog/waxing-guide"]);
const captureWidths = new Set([390, 1440]);
const snapshot = JSON.parse(fs.readFileSync("docs/perfect-threading-redesign/approved-content-snapshot.json", "utf8"));
const failures = [];
const warnings = [];
const accessibility = [];
let checked = 0;
fs.mkdirSync("test-results/screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });

for (const width of widths) {
  const context = await browser.newContext({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1 });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of routes) {
    const label = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    try {
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.locator("h1").first().waitFor({ timeout: 10000 });
      await page.evaluate(() => document.fonts.ready);
      const metrics = await page.evaluate(() => {
        const heading = document.querySelector("h1");
        const rect = heading?.getBoundingClientRect();
        const documentWidth = document.documentElement.scrollWidth;
        const vw = document.documentElement.clientWidth;
        return { heading: heading?.innerText || "", documentWidth, vw, h1Rect: rect && { left: rect.left, right: rect.right } };
      });
      if (!response?.ok()) failures.push(route + " " + width + " response: " + response?.status());
      if (!metrics.heading.trim()) failures.push(route + " " + width + " missing heading");
      if (metrics.documentWidth > metrics.vw + 3) failures.push(route + " " + width + " horizontal overflow: " + metrics.documentWidth + " > " + metrics.vw);
      if (metrics.h1Rect && (metrics.h1Rect.left < -2 || metrics.h1Rect.right > metrics.vw + 2)) failures.push(route + " " + width + " heading clipped");

      if (route.startsWith("/blog/")) {
        const links = page.locator('p a[href="/booking"].underline');
        const displayModes = await links.evaluateAll((nodes) => nodes.map((node) => getComputedStyle(node).display));
        if (!displayModes.length || displayModes.some((mode) => mode !== "inline")) {
          failures.push(route + " " + width + ": article booking sentence link not inline");
        }
      }
      // Full-page screenshots inspect the settled final design, not the offscreen pre-reveal state.
      // Scroll-reveal activation itself is tested separately below.
      if (captureWidths.has(width) && fullScreenshot.has(route) || ((route === "/" || route === "/services") && [320, 768, 1024, 1920, 2560, 3440].includes(width))) {
        await page.evaluate(async () => {
          document.querySelectorAll('img[loading="lazy"], iframe[loading="lazy"]').forEach((element) => element.setAttribute("loading", "eager"));
          await Promise.race([
            Promise.all([...document.images].map((img) => img.decode().catch(() => {}))),
            new Promise((resolve) => setTimeout(resolve, 3000)),
          ]);
        });
        await page.evaluate(() => {
          document.querySelectorAll('[data-reveal="pending"]').forEach((element) => {
            element.dataset.reveal = "shown";
          });
        });
        await page.screenshot({ path: path.join("test-results/screenshots", label + "-" + width + ".png"), fullPage: true, animations: "disabled" });
      }
      if (width === 390 || width === 1440) {
        const scan = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"]).analyze();
        for (const violation of scan.violations) {
          accessibility.push({ route, width, id: violation.id, impact: violation.impact, targets: violation.nodes.map((n) => n.target).slice(0, 6) });
          if (violation.impact === "serious" || violation.impact === "critical") failures.push("Axe " + route + " " + width + " " + violation.id + " (" + violation.impact + ")");
          else warnings.push("Axe " + route + " " + width + " " + violation.id + " (" + violation.impact + ")");
        }
      }
      checked++;
    } catch (error) {
      failures.push(route + " " + width + ": " + String(error).slice(0, 350));
    }
  }

  if (width === 390) {
    try {
      await page.goto(base + "/", { waitUntil: "domcontentloaded" });
      const menu = page.locator(".mobile-menu-toggle");
      if (!(await menu.isVisible())) failures.push("Mobile menu trigger invisible");
      await menu.click();
      if (await menu.getAttribute("aria-expanded") !== "true") failures.push("Mobile menu failed to expand");
      if (await menu.getAttribute("aria-label") !== "Close menu") failures.push("Mobile menu label failed to update");
      const services = page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services" });
      if (!(await services.isVisible())) failures.push("Mobile Services link hidden after opening");
      await page.keyboard.press("Escape");
      if (await menu.getAttribute("aria-expanded") !== "false") failures.push("Escape did not close mobile menu");
      await menu.click();
      await services.click();
      await page.waitForURL("**/services");
      await page.getByRole("heading", { name: "Our Services", level: 1 }).waitFor({ timeout: 10000 });
    } catch (error) {
      failures.push("Mobile menu: " + String(error).slice(0, 500));
    }
  }

  if ([320, 390, 768, 1440, 3440].includes(width)) {
    try {
      await page.goto(base + "/services", { waitUntil: "domcontentloaded" });
      const serviceRows = await page.locator(".service-menu li").evaluateAll((elements) => elements.map((el) => {
        const h = el.querySelector("h3");
        const p = el.querySelector(".service-price");
        const hRect = h?.getBoundingClientRect();
        const pRect = p?.getBoundingClientRect();
        return { name: h?.textContent?.trim(), price: p?.textContent?.trim(), overlap: !!hRect && !!pRect && hRect.right > pRect.left + 2 && hRect.bottom > pRect.top && pRect.bottom > hRect.top };
      }));
      const expected = snapshot.services.flatMap((group) => group.items);
      if (JSON.stringify(serviceRows.map(({name,price})=>({name,price}))) !== JSON.stringify(expected)) failures.push("Services " + width + " content differs from approved 56");
      if (serviceRows.some((row) => row.overlap)) failures.push("Services " + width + " name and price overlap");
      const categoryLinks = page.locator(".service-index a");
      if ((await categoryLinks.count()) !== 5) failures.push("Missing category jump links");
      await categoryLinks.nth(1).click();
      if (!(await page.locator("#waxing").count())) failures.push("Waxing anchor missing");
    } catch (error) { failures.push("Service regression " + width + ": " + String(error).slice(0, 400)); }
  }

  if ([390, 1440].includes(width)) {
    try {
      await page.goto(base + "/booking", { waitUntil: "domcontentloaded" });
      if ((await page.getByRole("button", { name: "Book Now" }).count()) !== 1) failures.push("Booking " + width + ": expected one Calendly button");
      if ((await page.locator('a[href="tel:9733415970"]').count()) !== 3) failures.push("Booking " + width + ": expected three phone instructions");
      if ((await page.locator('a[href^="https://calendly.com"]').count()) !== 0) warnings.push("Original Calendly navigates via router.push rather than anchor");
      await page.goto(base + "/contact", { waitUntil: "domcontentloaded" });
      if ((await page.locator('a[href="tel:9733415970"]').count()) !== 1) failures.push("Contact " + width + ": phone destination changed");
      if ((await page.locator('a[href="mailto:salon@gmail.com"]').count()) !== 1) failures.push("Contact " + width + ": mail destination changed");
      if ((await page.locator('a[href^="https://www.google.com/maps/dir/"]').count()) !== 1) failures.push("Contact " + width + ": directions missing");
      if ((await page.locator("iframe[title]").count()) !== 1) failures.push("Contact " + width + ": embedded map missing");
    } catch (error) { failures.push("Contact/booking regression " + width + ": " + String(error).slice(0, 400)); }
  }
  if (errors.length) failures.push("JS error " + width + ": " + errors.join(" | ").slice(0, 350));
  await context.close();
}

/* Additional keyboard and non-destructive booking-path checks. */
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.keyboard.press("Tab");
    if (!(await page.locator(".skip-link").evaluate((el) => el === document.activeElement))) {
      failures.push("Keyboard: skip link is not first tab stop");
    }
    const menu = page.locator(".mobile-menu-toggle");
    await menu.focus();
    await page.keyboard.press("Enter");
    if (await menu.getAttribute("aria-expanded") !== "true") failures.push("Keyboard: mobile menu did not open");
    await page.keyboard.press("Escape");
    if (await menu.getAttribute("aria-expanded") !== "false") failures.push("Keyboard: mobile menu did not close");
    if (!(await menu.evaluate((el) => el === document.activeElement))) failures.push("Keyboard: focus was not returned to menu toggle");
    await page.emulateMedia({ reducedMotion: "reduce" });
    if (await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior) !== "auto") {
      failures.push("Reduced motion: nonessential smooth scroll is active");
    }
    await page.goto(base + "/about");
    await page.goto(base + "/services");
    await page.goBack();
    if (new URL(page.url()).pathname !== "/about") failures.push("Browser back did not work");
  } catch (err) { failures.push("Keyboard/history regression: " + String(err).slice(0, 500)); }
  await context.close();
}
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  try {
    await page.route("https://calendly.com/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "<title>Intercepted Calendly destination</title>" }));
    await page.goto(base + "/booking", { waitUntil: "domcontentloaded" });
    await page.getByRole("button", { name: "Book Now" }).click();
    await page.waitForURL("https://calendly.com/pvparekh14/perfect-threading-appointment", { timeout: 12000 });
    await page.goto(base + "/contact", { waitUntil: "domcontentloaded" });
    const source = await page.locator("iframe[title]").getAttribute("src");
    if (!source?.startsWith("https://www.google.com/maps/embed?pb=")) failures.push("Map embed URL changed");
  } catch (err) { failures.push("Calendly navigation regression: " + String(err).slice(0, 500)); }
  await context.close();
}

/* Motion is a nonessential enhancement: prove interaction, scroll, and accessibility. */
for (const width of [390, 1440]) {
  const context = await browser.newContext({ viewport: { width, height: 850 }, reducedMotion: "no-preference" });
  const page = await context.newPage();
  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.locator('main[data-motion="ready"]').waitFor({ timeout: 10000 });
    const headline = await page.locator('main > section:first-child h1').evaluate((el) => getComputedStyle(el).animationName);
    if (headline !== "salon-heading-enter") failures.push("Motion " + width + ": homepage heading entrance missing");
    const pending = page.locator('[data-reveal="pending"]');
    if (await pending.count() === 0) failures.push("Motion " + width + ": no below-fold scroll reveals armed");
    else {
      const first = pending.first();
      await first.scrollIntoViewIfNeeded({ timeout: 10000 });
      await page.waitForFunction((element) => element?.getAttribute("data-reveal") === "shown", await first.elementHandle(), { timeout: 8000 });
      if (await first.getAttribute("data-reveal") !== "shown") failures.push("Motion " + width + ": reveal did not activate on scroll");
      const scrolled = await page.locator(".site-header").getAttribute("data-scrolled");
      if (scrolled !== "true") failures.push("Motion " + width + ": sticky header did not register scrolling");
    }
    await page.goto(base + "/services", { waitUntil: "domcontentloaded" });
    await page.locator('main[data-motion="ready"]').waitFor({ timeout: 10000 });
    const menus = await page.locator(".service-menu li").count();
    if (menus !== 56) failures.push("Motion " + width + ": 56 service rows not present");
  } catch (error) {
    failures.push("Motion interaction " + width + ": " + String(error).slice(0, 450));
  }
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    await page.locator("h1").waitFor();
    await page.waitForTimeout(250);
    if (await page.locator('[data-reveal="pending"]').count()) failures.push("Reduced-motion visitor: content remained pending");
    const hero = await page.locator("h1").evaluate((el) => getComputedStyle(el).animationName);
    if (hero !== "none") failures.push("Reduced-motion visitor: heading entrance still animated");
    await page.goto(base + "/services", { waitUntil: "domcontentloaded" });
    if (await page.locator(".service-menu li").count() !== 56) failures.push("Reduced-motion visitor: service menu is incomplete");
  } catch (error) { failures.push("Reduced-motion regression: " + String(error).slice(0, 450)); }
  await context.close();
}

{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto(base + "/", { waitUntil: "domcontentloaded" });
    const visible = await page.locator("h1").evaluate((el) => getComputedStyle(el).opacity === "1");
    if (!visible) failures.push("No-JavaScript visitor: homepage headline is hidden");
    if (!(await page.locator('main > section:first-child > a[href="/booking"]').isVisible())) failures.push("No-JavaScript visitor: main booking CTA is hidden");
    await page.goto(base + "/services", { waitUntil: "domcontentloaded" });
    if (await page.locator(".service-menu li").count() !== 56) failures.push("No-JavaScript visitor: catalogue is incomplete");
  } catch (error) { failures.push("No-JavaScript progressive enhancement: " + String(error).slice(0, 450)); }
  await context.close();
}

await browser.close();
const report = { routes: routes.length, widths, checkedRouteViewportPairs: checked, failures, warnings, accessibility };
fs.writeFileSync("test-results/browser-smoke.json", JSON.stringify(report, null, 2));
console.log("BROWSER_QA_SUMMARY " + JSON.stringify({ checked, failures, warnings, accessibility }, null, 2));
if (failures.length) process.exitCode = 1;
