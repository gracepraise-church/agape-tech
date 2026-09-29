type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading${centered ? " is-centered" : ""}${light ? " is-light" : ""}`}
    >
      <span className="eyebrow">
        <span className="eyebrow-mark" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
