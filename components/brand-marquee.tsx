import Image from "next/image";
import {
  publishedExperienceWordmarks,
  technologyWordmarks,
  type BrandWordmark,
} from "@/content/interactive";

const experienceItems = publishedExperienceWordmarks();

type MarqueeRowProps = {
  label: string;
  listLabel: string;
  items: readonly BrandWordmark[];
  repeats: number;
};

// Keep each loop calm and legible while allowing the same component to work for
// short employer lists and the longer technology inventory.
function marqueeDuration(items: readonly BrandWordmark[], repeats: number) {
  const characters = items.reduce((total, item) => total + item.name.length + item.mark.length, 0) * repeats;
  const width = characters * 7.6 + items.length * repeats * 112;
  return `${Math.max(40, Math.round(width / 50))}s`;
}

function MarqueeRow({ label, listLabel, items, repeats }: MarqueeRowProps) {
  const duration = marqueeDuration(items, repeats);
  const visualItems = Array.from({ length: repeats }, () => items).flat();
  const isProfessionalExperience = label === "PROFESSIONAL EXPERIENCE ACROSS";

  return (
    <div className="brand-row">
      <h3 className="brand-row-label">{label}</h3>
      <div
        aria-label={`${label.toLowerCase()} marquee`}
        className="brand-marquee"
        tabIndex={0}
      >
        <ul className="brand-list" aria-label={listLabel}>
          {items.map((item) => (
            <li aria-label={`${item.name} logo`} key={item.name}>
              {item.name}
            </li>
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
                <span className="brand-item" key={`${group}-${index}-${item.name}`}>
                  {item.logoAsset ? (
                    item.logoSurface === "light" ? (
                      <span className="brand-logo-surface-light">
                        <Image
                          alt={`${item.name} logo`}
                          className="brand-logo"
                          draggable="false"
                          height={40}
                          src={item.logoAsset}
                          unoptimized
                          width={160}
                        />
                      </span>
                    ) : (
                      <Image
                        alt={`${item.name} logo`}
                        className="brand-logo"
                        draggable="false"
                        height={40}
                        src={item.logoAsset}
                        unoptimized
                        width={160}
                      />
                    )
                  ) : (
                    <span className="brand-mark">{item.mark}</span>
                  )}
                  {!isProfessionalExperience && (
                    <span className="brand-item-name">{item.name}</span>
                  )}
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
        Professional experience across and technologies &amp; platforms
      </h2>
      <div className="page-shell brand-band-inner">
        <MarqueeRow
          label="PROFESSIONAL EXPERIENCE ACROSS"
          listLabel="Professional experience across these organizations"
          items={experienceItems}
          repeats={experienceItems.length >= 8 ? 1 : 2}
        />
        <MarqueeRow
          label="TECHNOLOGIES & PLATFORMS"
          listLabel="Technologies and platforms used in the engineering practice"
          items={technologyWordmarks}
          repeats={1}
        />
      </div>
    </section>
  );
}
