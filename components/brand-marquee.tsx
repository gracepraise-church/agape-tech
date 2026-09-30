import { publishedExperienceItems, technologyMarquee } from "@/content/interactive";

const experienceItems = publishedExperienceItems();

type MarqueeRowProps = {
  label: string;
  listLabel: string;
  items: readonly string[];
  repeats: number;
};

// Approximates one loop's width at desktop type size so every row moves at a calm ~50px/s.
function marqueeDuration(items: readonly string[], repeats: number) {
  const characters = items.reduce((total, item) => total + item.length, 0) * repeats;
  const width = characters * 8.7 + items.length * repeats * 89;
  return `${Math.max(40, Math.round(width / 50))}s`;
}

function MarqueeRow({ label, listLabel, items, repeats }: MarqueeRowProps) {
  const duration = marqueeDuration(items, repeats);
  const visualItems = Array.from({ length: repeats }, () => items).flat();

  return (
    <div className="brand-row">
      <span className="brand-row-label">{label}</span>
      <div className="brand-marquee">
        <ul className="brand-list" aria-label={listLabel}>
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <div
          aria-hidden="true"
          className="brand-track"
          style={{ "--marquee-duration": duration } as React.CSSProperties}
        >
          {[0, 1].map((group) => (
            <div className="brand-group" key={group}>
              {visualItems.map((item, index) => (
                <span className="brand-item" key={`${group}-${index}-${item}`}>
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function BrandMarquee() {
  return (
    <section aria-labelledby="brand-band-title" className="brand-band">
      <h2 className="brand-band-title" id="brand-band-title">
        Professional experience and technologies
      </h2>
      <div className="page-shell brand-band-inner">
        <MarqueeRow
          label="PROFESSIONAL EXPERIENCE ACROSS"
          listLabel="Professional experience across these organizations"
          items={experienceItems}
          repeats={experienceItems.length >= 8 ? 1 : 2}
        />
        <MarqueeRow
          label="Technologies & Platforms"
          listLabel="Technologies and platforms"
          items={technologyMarquee}
          repeats={1}
        />
      </div>
    </section>
  );
}
