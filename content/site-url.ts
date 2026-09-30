export function getSiteOrigin(): URL | undefined {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!value) return undefined;

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new Error("NEXT_PUBLIC_SITE_URL must be a valid HTTPS origin.");
  }
  if (
    (url.protocol !== "https:" && !(url.protocol === "http:" && url.hostname === "localhost")) ||
    url.username ||
    url.password ||
    url.pathname !== "/" ||
    url.search ||
    url.hash
  ) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin (HTTP is allowed for localhost only).");
  }
  return url;
}
