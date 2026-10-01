import Link from "next/link";
import type { ContactService } from "@/lib/contact/options";

const defaultQuoteHref = "/contact/?service=Other%20%2F%20Not%20Sure%20Yet#project-intake";

export function QuoteCta({
  compact = false,
  service = "Other / Not Sure Yet",
}: {
  compact?: boolean;
  service?: ContactService;
}) {
  const quoteHref = service === "Other / Not Sure Yet"
    ? defaultQuoteHref
    : `/contact/?service=${encodeURIComponent(service)}#project-intake`;

  return (
    <section
      aria-labelledby={compact ? "services-quote-title" : "homepage-quote-title"}
      className={`quote-cta-section${compact ? " is-compact" : ""}`}
    >
      <div className="page-shell quote-cta-inner">
        <div>
          <span className="eyebrow">
            <span aria-hidden="true" className="eyebrow-mark" />
            CUSTOM SOLUTIONS / PRACTICAL INVESTMENT
          </span>
          <h2 id={compact ? "services-quote-title" : "homepage-quote-title"}>
            Professional Technology. Competitive Pricing.
          </h2>
          <p>
            From professional organization websites to customized management applications, we
            design practical solutions around your goals, technical requirements, and budget.
          </p>
        </div>
        <Link className="button button-primary quote-cta-button" href={quoteHref}>
          REQUEST A CUSTOM QUOTE <span aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
