import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const projectRoot = new URL("../", import.meta.url);
const outputRoot = new URL("../out/", import.meta.url);

test("exports Chamidu's complete portfolio as static HTML", async () => {
  const html = await readFile(new URL("index.html", outputRoot), "utf8");

  assert.match(html, /<title>Chamidu Deshan \| Digital Marketer<\/title>/);
  assert.match(html, /I help brands earn/);
  assert.match(html, /Strategy first\./);
  assert.match(html, /Brands I(?:’|&#x27;)ve worked with\./);
  assert.match(html, /Inside the Work/);
  assert.match(html, /Have a brand ready/);
  assert.match(html, /mailto:cdeshanwork@gmail\.com/);
  assert.match(html, /linkedin\.com\/in\/cdeshan/);
  assert.match(html, /instagram\.com\/chamiiidu/);
  assert.doesNotMatch(html, /download[^<]*cv|curriculum vitae/i);
});

test("ships the supplied identity and brand assets", async () => {
  const requiredAssets = [
    "assets/chamidu-portrait.jpeg",
    "assets/fadna.png",
    "assets/fadna-life-science.png",
    "assets/qofl.png",
    "assets/social-work.jpg",
    "assets/analytics-work.jpg",
    "assets/bts-photoshoot.jpg",
    "assets/bts-camera.jpg",
  ];

  await Promise.all(
    requiredAssets.map((path) => access(new URL(path, outputRoot))),
  );
});

test("keeps responsive motion and accessibility safeguards", async () => {
  const [baseCss, extraCss, mobileCss, component] = await Promise.all([
    readFile(new URL("app/globals.css", projectRoot), "utf8"),
    readFile(new URL("app/portfolio-extra.css", projectRoot), "utf8"),
    readFile(new URL("app/mobile-reference.css", projectRoot), "utf8"),
    readFile(new URL("app/PortfolioSite.tsx", projectRoot), "utf8"),
  ]);

  assert.match(extraCss, /prefers-reduced-motion:\s*reduce/);
  assert.match(mobileCss, /bottom:\s*0/);
  assert.match(mobileCss, /background-size:\s*57px 57px/);
  assert.match(component, /aria-label="Main navigation"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(baseCss, /\.skip-link:focus/);
});
