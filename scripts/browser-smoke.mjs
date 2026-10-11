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
  const page = await browser.newPage({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1 });
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
      if (captureWidths.has(width) && fullScreenshot.has(route) || ((route === "/" || route === "/services") && [320, 768, 1024, 1920, 2560, 3440].includes(width))) {
        await page.screenshot({ path: path.join("test-results/screenshots", label + "-" + width + ".png"), fullPage: true, animations: "disabled" });
      }
      if ((width === 390 || width === 1440) && !route.startsWith("/blog/")) {
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
      if ((await page.locator("h1").innerText()) !== "Our Services") failures.push("Mobile menu navigation failed");
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
  await page.close();
}
await browser.close();
const report = { routes: routes.length, widths, checkedRouteViewportPairs: checked, failures, warnings, accessibility };
fs.writeFileSync("test-results/browser-smoke.json", JSON.stringify(report, null, 2));
console.log("BROWSER_QA_SUMMARY " + JSON.stringify({ checked, failures, warnings, accessibility }, null, 2));
if (failures.length) process.exitCode = 1;
