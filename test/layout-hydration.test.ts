import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const layoutSource = readFileSync(new URL("../app/layout.tsx", import.meta.url), "utf8");

describe("root layout hydration contract", () => {
  it("renders the initial JavaScript class on the server without mutating html before hydration", () => {
    expect(layoutSource).toContain('<html className="js" lang="en">');
    expect(layoutSource).not.toContain("document.documentElement.classList.add");
    expect(layoutSource).not.toContain("suppressHydrationWarning");
  });

  it("keeps a no-JavaScript flow-layout fallback for the reserved story heights", () => {
    expect(layoutSource).toContain("<noscript>");
    expect(layoutSource).toContain(".js .story-section .story-track");
    expect(layoutSource).toContain("height: auto");
    expect(layoutSource).toContain(".js .work-story-outer");
  });
});
