import { Check, MessageCircle, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageHero } from "@/components/page-hero";
import { createPageMetadata } from "@/content/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Tell Agape Tech what you are building and where thoughtful engineering support could help.",
  path: "/contact/",
});

export default function ContactPage() {
  return (
    <main id="main-content">
      <PageHero
        asideDescription="A useful first conversation begins with understanding what matters most to you."
        asideTitle="No pitch deck required."
        description="A new idea, a stubborn quality problem, or a workflow ready for a better way—tell us what you’re working through."
        eyebrow="CONTACT / START A PROJECT"
        title="Tell Us What You’re Building."
        ctaHref="#project-intake"
        ctaLabel="Go to the project form"
        variant="editorial"
      />
      <section className="contact-section section-space" id="project-intake">
        <div className="page-shell contact-layout">
          <aside className="contact-aside">
            <span className="eyebrow"><span aria-hidden="true" className="eyebrow-mark" />A GOOD CONVERSATION STARTS HERE</span>
            <h2>A little context helps us meet you where you are.</h2>
            <p>
              Share the essentials—what you’re building, what feels difficult, and where you are in
              the process. You do not need to have the whole plan figured out.
            </p>
            <div className="contact-promise">
              <span><MessageCircle aria-hidden="true" size={17} /></span>
              <div>
                <h3>Thoughtful, practical discussion</h3>
                <p>We’ll focus on understanding the challenge and what a useful next step might be.</p>
              </div>
            </div>
            <div className="contact-promise">
              <span><ShieldCheck aria-hidden="true" size={17} /></span>
              <div>
                <h3>Delivery status is explicit</h3>
                <p>
                  Submitting sends your details to the contact function. If email delivery is not
                  configured, the form reports the error and keeps your entries so you can try again.
                </p>
              </div>
            </div>
            <div className="contact-aside-note">
              <Check aria-hidden="true" size={15} />
              <span>Share only information you’re comfortable including in an initial inquiry.</span>
            </div>
          </aside>
          <ContactForm turnstileSiteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />
        </div>
      </section>
    </main>
  );
}
