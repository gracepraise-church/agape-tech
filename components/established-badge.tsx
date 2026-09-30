import { companyHistory } from "@/content/business";

export function EstablishedBadge() {
  return (
    <div className="established-badge">
      <span aria-hidden="true" className="established-badge-signal" />
      <span className="established-badge-years">{companyHistory.yearsValue}</span>
      <span className="established-badge-label">YEARS</span>
      <span aria-hidden="true" className="established-badge-rule" />
      <span className="established-badge-est">{companyHistory.establishedLabel}</span>
    </div>
  );
}
