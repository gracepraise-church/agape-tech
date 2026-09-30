import { afterEach, describe, expect, it, vi } from "vitest";
import { getSiteOrigin } from "../content/site-url";

afterEach(() => vi.unstubAllEnvs());

describe("NEXT_PUBLIC_SITE_URL", () => {
  it("does not publish an origin before configuration", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(getSiteOrigin()).toBeUndefined();
  });

  it("accepts an HTTPS origin and local HTTP development", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://agape.example");
    expect(getSiteOrigin()?.toString()).toBe("https://agape.example/");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "http://localhost:8888");
    expect(getSiteOrigin()?.origin).toBe("http://localhost:8888");
  });

  it.each([
    "https://agape.example/path",
    "https://agape.example/?preview=1",
    "https://agape.example/#section",
    "http://agape.example",
    "javascript:alert(1)",
    "not a url",
  ])("rejects a non-origin or insecure value: %s", (value) => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", value);
    expect(getSiteOrigin).toThrow(/NEXT_PUBLIC_SITE_URL/);
  });
});
