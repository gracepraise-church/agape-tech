# Production launch checklist

This checklist prepares the site for launch; it does not authorize deployment. Owner-dependent and provider-dependent items remain unchecked. The site is a Next.js static export in `out/` plus a Netlify Function for contact delivery, so a standalone static host cannot deliver inquiries.

## PRE-DEPLOYMENT

- [x] Run the unit and regression tests (`npm test`).
- [x] Run ESLint (`npm run lint`).
- [x] Run TypeScript validation (`npm run typecheck`).
- [x] Audit production dependencies (`npm audit --omit=dev`); the local audit reports no vulnerabilities.
- [x] Complete a production static export with the installed Next.js 16.3.7 documented Webpack option (`npx next build --webpack`). The normal Turbopack build remains the configured host build; only the local VS Code sandbox blocks its CSS worker from binding a port.
- [x] Confirm the export contains the homepage, six public subpages, metadata routes, manifest, and 404 page.
- [x] Configure baseline Netlify response headers for MIME sniffing, framing, referrer data, and unused browser capabilities.
- [x] Confirm unverified organization names are not presented as clients or professional experience.
- [ ] Owner confirms the legal name, brand, tagline, service descriptions, sector positioning, and all public claims.
- [ ] Owner supplies and approves any public address/location, phone, email, LinkedIn URL, leadership biography/photo/title, or organization names before they are added.
- [ ] Owner reviews the About leadership placeholder and representative-work wording.
- [ ] Owner or legal reviewer approves the Privacy page against the final provider configuration, retention practices, notices, and applicable jurisdiction.
- [ ] Review the final GitHub Desktop diff and confirm that no `.env` files, credentials, DNS data, or unrelated files are staged.

## NETLIFY

- [ ] With owner approval, connect the approved repository and production branch.
- [ ] Confirm Node 22, build command `npm run build`, publish directory `out`, Functions directory `netlify/functions`, and esbuild bundling match `netlify.toml`.
- [ ] Configure required runtime variables: `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`.
- [ ] Configure required build variable: `NEXT_PUBLIC_SITE_URL`.
- [ ] If enabled, configure `NEXT_PUBLIC_TURNSTILE_SITE_KEY` at build time and `TURNSTILE_SECRET_KEY` at function runtime for the same widget.
- [ ] If approved, configure optional `CONTACT_REPLY_TO_EMAIL` and `CONTACT_SEND_ACKNOWLEDGEMENT=true`.
- [ ] Deliberately configure preview-build canonical/indexing behavior and access controls; do not expose production secrets to untrusted preview contexts.
- [ ] Confirm `/contact/` submits to `/.netlify/functions/contact` on the deployed host.
- [ ] Review deployment logs, function routing, static asset routing, HTTPS behavior, security headers, `/404.html`, and real HTTP 404 responses.

## DOMAIN/DNS

- [ ] Owner selects the production domain and explicitly approves registrar, DNS, and Netlify domain changes.
- [ ] Use Netlify's current instructions for the assigned site to configure the apex and `www` records; do not guess record values.
- [ ] Verify domain ownership and SSL issuance.
- [ ] Choose the primary HTTPS host and redirect the alternate host to it.
- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final primary HTTPS origin only, with no path, query, or fragment, then rebuild.
- [ ] Verify apex, `www`, HTTP, HTTPS, and trailing-slash redirects resolve consistently to the canonical host.
- [ ] Record a rollback plan before changing DNS or promoting a production deployment.

## RESEND

- [ ] Owner chooses the inquiry inbox for `CONTACT_TO_EMAIL`.
- [ ] Owner chooses the sender address for `CONTACT_FROM_EMAIL`; do not infer it from the domain.
- [ ] Verify the sender domain/address in Resend using its current DNS instructions, including SPF/DKIM and recommended DMARC.
- [ ] Owner creates a scoped `RESEND_API_KEY` and adds it only to Netlify's function/runtime environment.
- [ ] Review the internal inquiry email's subject, text, HTML, reply-to behavior, and escaping with owner-approved addresses.
- [ ] Decide whether to send visitor acknowledgements; if enabled, approve `CONTACT_REPLY_TO_EMAIL` and review the acknowledgement subject, text, and HTML.
- [ ] After an approved deployment, send a non-sensitive test inquiry and confirm internal receipt, reply-to behavior, and optional acknowledgement.
- [ ] Review Resend activity and Netlify logs for failures without recording submitted content or secrets.

## TURNSTILE

- [ ] Owner decides whether Cloudflare Turnstile is required.
- [ ] If enabled, register the actual production and approved preview hostnames.
- [ ] Configure both keys for the same widget; never configure only one.
- [ ] Rebuild after changing `NEXT_PUBLIC_TURNSTILE_SITE_KEY` because it is embedded in the static export.
- [ ] Test keyboard and screen-reader access, script-load failure, challenge expiry, invalid/missing tokens, and a valid challenge on the deployed host.
- [ ] Confirm form entries remain available and delivery is never reported as successful when verification fails.
- [ ] Review Netlify/Cloudflare WAF, rate-limit, logging, and retention options; the honeypot, bounded JSON validation, same-origin check, and optional Turnstile are not a distributed rate limiter.

## POST-DEPLOYMENT

- [ ] Verify HTTPS, certificate validity, canonical redirects, and the primary host from an external network.
- [ ] Verify every public route, asset, navigation item, call to action, form state, privacy link, and 404 response.
- [ ] Inspect browser console and network requests for runtime errors, mixed content, missing assets, and failed Function calls.
- [ ] Confirm monitoring and rollback access before announcing launch.
- [ ] Recheck provider terms, privacy wording, log retention, and access controls whenever integrations change.

## SEO

- [x] Canonical, Open Graph, Twitter, sitemap, robots, and Organization JSON-LD derive from validated `NEXT_PUBLIC_SITE_URL`.
- [x] Without a configured production origin, pages request no indexing, robots disallows crawling, and the sitemap is empty.
- [x] The configured sitemap includes all seven public routes.
- [ ] After setting the real origin, verify canonical and Open Graph URLs/images on every page.
- [ ] Verify `/sitemap.xml` uses only the primary host and `/robots.txt` advertises that sitemap.
- [ ] Validate Organization JSON-LD with the final domain and owner-approved business facts.
- [ ] Test social sharing previews and submit the sitemap to owner-approved search tools after launch.

## CONTACT FORM

- [x] Server-side schema validation, bounded request size, strict JSON content type, honeypot handling, same-origin host/protocol checking, and explicit error responses are implemented.
- [x] Delivery configuration failures, provider failures, and Turnstile failures do not return success.
- [x] Internal email content is HTML-escaped, and the visitor address is used as reply-to rather than as the sender.
- [x] Optional acknowledgement is disabled by default and runs only after successful internal delivery.
- [x] Client-side error states preserve entries, expose field errors, focus the status/first invalid field, and reset expired or failed Turnstile widgets.
- [ ] Test successful delivery and all failure states through the deployed Netlify Function with approved non-sensitive data.
- [ ] Confirm actual recipient, sender, reply-to, acknowledgement choice, and provider logs.

## MOBILE/DESKTOP SMOKE TEST

- [x] Responsive CSS, mobile navigation, visible focus styles, skip link, semantic labels, form error associations, and reduced-motion rules are present in the local implementation.
- [ ] Test the exported site at representative mobile, tablet, laptop, and wide-desktop viewport sizes.
- [ ] Test keyboard-only navigation, skip link, mobile-menu open/close/focus behavior, form validation, and Turnstile.
- [ ] Test with reduced motion enabled and at 200% browser zoom.
- [ ] Inspect contrast, text wrapping, horizontal overflow, touch target usability, image loading, and layout shifts with browser accessibility tooling.
- [ ] Repeat the smoke test on the final deployed hostname in current Safari, Chrome, Firefox, and a mobile browser.

## RELEASE CONTROL

- [ ] Owner approves business facts, privacy wording, production domain, email configuration, credentials, and launch window.
- [ ] Owner reviews and commits the approved changes using GitHub Desktop.
- [ ] Owner intentionally pushes the reviewed branch and reviews the Netlify preview.
- [ ] Owner separately approves production deployment, DNS changes, and any real email test.
- [ ] After release, complete all remaining post-deployment checks and record the known-good rollback deploy.
