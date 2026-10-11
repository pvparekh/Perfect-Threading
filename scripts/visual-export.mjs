import { chromium } from "playwright";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 860 }, deviceScaleFactor: 1 });
const views = [
  { route:"/", width:1440, height:860, label:"home-desktop" },
  { route:"/", width:390, height:844, label:"home-mobile" },
  { route:"/services", width:1440, height:900, label:"services-desktop" },
  { route:"/booking", width:390, height:844, label:"booking-mobile" }
];
for (const view of views) {
  await page.setViewportSize({width:view.width,height:view.height});
  await page.goto("http://127.0.0.1:3000"+view.route,{waitUntil:"domcontentloaded"});
  await page.evaluate(() => document.fonts.ready);
  const buffer = await page.screenshot({type:"jpeg",quality:38,animations:"disabled"});
  console.log("VISUAL_CAPTURE_"+view.label+"_START"+buffer.toString("base64")+"VISUAL_CAPTURE_"+view.label+"_END");
}
await browser.close();
