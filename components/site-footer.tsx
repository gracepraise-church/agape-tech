import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { business } from "@/content/business";
import { navigation, services } from "@/content/site";

export function SiteFooter() {
  const showLinkedIn = Boolean(business.linkedin);

  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-brand-column">
          <Link className="footer-brand" href="/" aria-label="Agape Tech home">
            <Image
              src="/assets/brand/agape-tech-logo-horizontal-white.png"
              alt="Agape Tech — Technology with Purpose"
              width={2172}
              height={724}
              sizes="(max-width: 720px) 184px, 218px"
            />
          </Link>
          <p>
            Engineering confidence into every digital experience — with care for the people and
            purpose behind the technology.
          </p>
          <span className="footer-location-note">Built with purpose. Made to move things forward.</span>
        </div>

        <div className="footer-link-group">
          <h2>Explore</h2>
          {navigation.map(({ label, href }) => (
            <Link href={href} key={href}>
              {label}
            </Link>
          ))}
        </div>

        <div className="footer-link-group">
          <h2>Capabilities</h2>
          {services.slice(0, 4).map((service) => (
            <Link href="/services/" key={service.title}>
              {service.title}
            </Link>
          ))}
          <Link className="footer-all-services" href="/services/">
            All services <ArrowUpRight aria-hidden="true" size={14} />
          </Link>
        </div>

        <div className="footer-contact">
          <span className="footer-eyebrow">HAVE A CHALLENGE IN MIND?</span>
          <h2>Let’s find the next right step.</h2>
          <Link className="footer-contact-link" href="/contact/">
            Start a conversation <ArrowUpRight aria-hidden="true" size={17} />
          </Link>
          {showLinkedIn ? (
            <Link className="footer-social-note" href={business.linkedin!} rel="noreferrer" target="_blank">
              LinkedIn
            </Link>
          ) : null}
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <span>© {new Date().getFullYear()} Agape Tech LLC</span>
        <span className="footer-signoff">Technology with Purpose.</span>
        <Link href="/privacy/">Privacy</Link>
      </div>
    </footer>
  );
}
