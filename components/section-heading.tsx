type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
  id,
}: SectionHeadingProps) {
  return (
    <div
      className={`section-heading${centered ? " is-centered" : ""}${light ? " is-light" : ""}`}
    >
      <span className="eyebrow">
        <span className="eyebrow-mark" aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}
