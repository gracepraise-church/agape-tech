import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { WorkGallery } from "@/components/work-gallery";
import { createPageMetadata } from "@/content/metadata";

export const metadata = createPageMetadata({
  title: "Work",
  description:
    "Representative engineering experience in AI quality, automation, API validation, performance, cloud integration, and digital products.",
  path: "/work/",
});

export default function WorkPage() {
  return (
    <main id="main-content">
      <PageHero
        description="A considered look at the kinds of engineering challenges we understand and the approaches we bring to them."
        eyebrow="WORK / REPRESENTATIVE ENGINEERING EXPERIENCE"
        title="Good engineering shows up in the details."
        variant="portfolio"
      />
      <section className="work-page-section section-space">
        <div className="page-shell">
          <SectionHeading
            description="Explore representative patterns across AI, quality, automation, APIs, performance, cloud, and development."
            eyebrow="FIELD NOTES"
            title="Experience, applied with care."
          />
          <WorkGallery />
        </div>
      </section>
    </main>
  );
}
