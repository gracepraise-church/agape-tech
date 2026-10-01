import { companyHistory } from "@/content/business";

type EstablishedBadgeProps = {
  variant?: "default" | "hero";
};

export function EstablishedBadge({ variant = "default" }: EstablishedBadgeProps) {
  if (variant === "hero") {
    return (
      <div
        aria-label={`${companyHistory.yearsValue} years of engineering: Experience, Innovation, Quality`}
        className="established-badge established-badge-hero"
      >
        <span className="established-badge-years">{companyHistory.yearsValue}</span>
        <span aria-hidden="true" className="established-badge-rule" />
        <span className="established-badge-copy">
          <span className="established-badge-label">YEARS OF ENGINEERING</span>
          <span className="established-badge-subline">Experience • Innovation • Quality</span>
        </span>
      </div>
    );
  }

  return (
    <div className="established-badge">
      <span aria-hidden="true" className="established-badge-signal" />
      <span className="established-badge-years">{companyHistory.yearsValue}</span>
      <span className="established-badge-label">YEARS</span>
      <span aria-hidden="true" className="established-badge-rule" />
      <span className="established-badge-est">{companyHistory.badgeLabel}</span>
    </div>
  );
}
