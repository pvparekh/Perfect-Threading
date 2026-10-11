import fs from "node:fs";
import path from "node:path";
import { chromium } from "playwright";

const base = "http://127.0.0.1:3000";
const routes = ["/", "/about", "/services", "/booking", "/contact", "/blog", "/blog/facial-guide", "/blog/threading-guide", "/blog/waxing-guide"];
const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920, 2560, 3440];
const important = new Set(["/", "/services", "/booking", "/contact"]);
const snapshot = JSON.parse(fs.readFileSync("docs/perfect-threading-redesign/approved-content-snapshot.json", "utf8"));
fs.mkdirSync("test-results/screenshots", { recursive: true });
const failures = [];
const notes = [];
const browser = await chromium.launch({ headless: true });
let total = 0;

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: width < 700 ? 844 : 900 }, deviceScaleFactor: 1 });
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  const pagesToCheck = (width === 390 || width === 1440) ? routes : [...important];
  for (const route of pagesToCheck) {
    const label = route === "/" ? "home" : route.slice(1).replaceAll("/", "-");
    try {
      const response = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 30000 });
      await page.locator("h1").first().waitFor({ timeout: 10000 });
      await page.evaluate(() => document.fonts.ready);
      const results = await page.evaluate(() => ({
        scrollWidth: document.documentElement.scrollWidth,
        viewportWidth: document.documentElement.clientWidth,
        heading: document.querySelector("h1")?.innerText,
      }));
      if (!response?.ok()) failures.push(route + " (" + width + "): response " + response?.status());
      if (!results.heading?.trim()) failures.push(route + " (" + width + "): missing heading");
      if (results.scrollWidth > results.viewportWidth + 3) failures.push(route + " (" + width + "): horizontal overflow " + results.scrollWidth + " > " + results.viewportWidth);
      if ((width === 390 || width === 1440) || ((route === "/" || route === "/services") && widths.includes(width))) {
        await page.screenshot({ path: path.join("test-results/screenshots", label + "-" + width + ".png"), fullPage: true, animations: "disabled" });
      }
      total += 1;
    } catch (error) {
      failures.push(route + " (" + width + "): " + String(error));
    }
  }
  if (width === 390) {
    try {
      await page.goto(base + "/", { waitUntil: "domcontentloaded" });
      const menu = page.getByRole("button", { name: "Open menu" });
      await menu.click();
      if (await menu.getAttribute("aria-expanded") !== "true") failures.push("Mobile menu did not expand");
      const services = page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Services" });
      if (!(await services.isVisible())) failures.push("Mobile menu Services link is hidden");
      await page.keyboard.press("Escape");
      if (await menu.getAttribute("aria-expanded") !== "false") failures.push("Mobile Escape did not close menu");
    } catch (error) {
      failures.push("Mobile menu test: " + String(error));
    }
  }
  if (width === 1440) {
    try {
      await page.goto(base + "/services", { waitUntil: "domcontentloaded" });
      const found = await page.locator(".service-menu li").evaluateAll((elements) => elements.map((element) => ({
        name: element.querySelector("h3")?.textContent?.trim(),
        price: element.querySelector(".service-price")?.textContent?.trim(),
      })));
      const expected = snapshot.services.flatMap((group) => group.items);
      if (JSON.stringify(found) !== JSON.stringify(expected)) failures.push("Rendered 56-service price menu differs from approved inventory");
      if ((await page.locator(".service-index a").count()) !== 5) failures.push("Service category navigation does not contain five anchors");
      await page.goto(base + "/booking", { waitUntil: "domcontentloaded" });
      if (await page.getByRole("button", { name: "Book Now" }).count() !== 1) failures.push("Expected exactly one existing Calendly booking button");
      if (await page.locator('a[href="tel:9733415970"]').count() !== 3) failures.push("Expected three phone-booking service links");
    } catch (error) {
      failures.push("Services/booking regression: " + String(error));
    }
  }
  if (errors.length) failures.push("Javascript errors (" + width + "): " + errors.join(" | ").slice(0, 500));
  await page.close();
}

await browser.close();
const report = { routes: routes.length, viewportWidths: widths, checkedRouteViewportPairs: total, failures, notes };
fs.writeFileSync("test-results/browser-smoke.json", JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;
