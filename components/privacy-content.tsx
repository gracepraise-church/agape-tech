import { privacySections } from "@/content/phase-two";

export function PrivacyContent() {
  return (
    <div className="privacy-content">
      <p className="privacy-intro">
        This overview reflects the current website application. Hosting-provider practices may
        differ, and this page should be updated when site integrations change.
      </p>
      {privacySections.map((section, index) => (
        <section className="privacy-section" key={section.title}>
          <span className="privacy-section-number">0{index + 1}</span>
          <div>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </section>
      ))}
    </div>
  );
}
