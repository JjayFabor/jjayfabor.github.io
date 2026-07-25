// One-off screenshot helper: captures jjayfabor.com with a real browser so the
// SPA, fonts, and images are fully loaded (unlike a one-shot --screenshot).
// Usage: node scripts/screenshot.mjs
import { chromium } from "playwright-core";
import { homedir } from "node:os";
import { join } from "node:path";
import { readdirSync } from "node:fs";

// Find the Chromium that Playwright cached, without pinning a version number so
// this keeps working after `playwright install` bumps the build.
function findChrome() {
  const base = join(homedir(), ".cache/ms-playwright");
  const dir = readdirSync(base).find((d) => d.startsWith("chromium-"));
  if (!dir) throw new Error("No cached Chromium in ~/.cache/ms-playwright — run: npx playwright install chromium");
  return join(base, dir, "chrome-linux/chrome");
}

const CHROME = process.env.CHROME_PATH || findChrome();
const OUT = process.env.SHOT_DIR || "/tmp/shots";
const URL = process.env.SHOT_URL || "https://jjayfabor.com";

// Each: { name, url, scheme: 'dark'|'light', full?: capture the whole page }
const shots = [
  { name: "home-dark", url: URL, scheme: "dark" },
  { name: "home-light", url: URL, scheme: "light" },
  { name: "projects-dark", url: `${URL}/projects`, scheme: "dark" },
  { name: "detail-dark", url: `${URL}/projects/lettuce-watch`, scheme: "dark" },
];

const browser = await chromium.launch({ executablePath: CHROME, args: ["--no-sandbox"] });
for (const s of shots) {
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
    colorScheme: s.scheme,
  });
  const page = await ctx.newPage();
  await page.goto(s.url, { waitUntil: "networkidle", timeout: 30000 });
  // Make sure the hero photo + logos have actually decoded, not just requested.
  await page.evaluate(async () => {
    await Promise.all(
      [...document.images].map((img) =>
        img.complete ? Promise.resolve() : img.decode().catch(() => {}),
      ),
    );
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });
  await page.waitForTimeout(800); // let framer-motion settle
  const path = join(OUT, `${s.name}.png`);
  await page.screenshot({ path, fullPage: !!s.full });
  console.log("wrote", path);
  await ctx.close();
}
await browser.close();
