import { PageHero } from "@/components/page-hero";
import { PrivacyContent } from "@/components/privacy-content";
import { createPageMetadata } from "@/content/metadata";

export const metadata = createPageMetadata({
  title: "Privacy",
  description:
    "Read how the current Agape Tech website handles project-finder selections and contact form information.",
  path: "/privacy/",
});

export default function PrivacyPage() {
  return (
    <main id="main-content">
      <PageHero
        description="A clear overview of what this version of the website does—and does not—collect through its application features."
        eyebrow="PRIVACY / CURRENT WEBSITE BEHAVIOR"
        title="Your information deserves care."
        variant="purpose"
      />
      <section className="privacy-page-section section-space">
        <div className="page-shell privacy-layout">
          <aside className="privacy-page-aside">
            <span className="privacy-aside-label">CURRENT IMPLEMENTATION</span>
            <span className="privacy-aside-mark" aria-hidden="true" />
            <p>Website features are described as they exist in this release.</p>
            <span className="privacy-aside-note">Update this page when integrations change.</span>
          </aside>
          <PrivacyContent />
        </div>
      </section>
    </main>
  );
}
