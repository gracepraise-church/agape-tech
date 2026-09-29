import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, BrainCircuit, Check, Compass, Layers3, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  accent?: string;
  description: string;
  variant?: "editorial" | "purpose" | "technical" | "portfolio";
  asideTitle?: string;
  asideDescription?: string;
  ctaHref?: string;
  ctaLabel?: string;
  children?: ReactNode;
};

const visualIcons = [BrainCircuit, ShieldCheck, Workflow, Sparkles, Layers3, Compass];
const visualLabels = ["INTELLIGENT SYSTEMS", "QUALITY ENGINEERING", "AUTOMATION", "PRODUCT DELIVERY"];

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  variant = "editorial",
  asideTitle,
  asideDescription,
  ctaHref = "/contact/",
  ctaLabel = "Start a conversation",
  children,
}: PageHeroProps) {
  const titleParts = accent ? title.split(accent) : [title];
  return (
    <section className={`page-hero page-hero-${variant}`}>
      <div aria-hidden="true" className="page-hero-grid" />
      <div aria-hidden="true" className="page-hero-glow" />
      <div className="page-shell page-hero-layout">
        <div className="page-hero-copy">
          <span className="eyebrow">
            <span aria-hidden="true" className="eyebrow-mark" />
            {eyebrow}
          </span>
          <h1>
            {accent && titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <span>{accent}</span>
                {titleParts.slice(1).join(accent)}
              </>
            ) : (
              title
            )}
          </h1>
          <p>{description}</p>
          {children}
        </div>
        <div className="page-hero-aside">
          {variant === "purpose" ? (
            <div className="page-hero-purpose-visual">
              <div aria-hidden="true" className="page-hero-orbit" />
              <Image
                alt=""
                aria-hidden="true"
                height={1254}
                priority
                src="/assets/brand/agape-tech-logo-icon-transparent.png"
                width={1254}
                sizes="(max-width: 850px) 104px, 144px"
              />
              <span>LIGHT / PURPOSE / SERVICE</span>
            </div>
          ) : variant === "portfolio" ? (
            <div className="page-hero-ledger">
              <span className="page-hero-ledger-label">EXPERIENCE, APPLIED</span>
              <p>Representative engineering experience</p>
              <div className="page-hero-ledger-row">
                <span>BUILD</span>
                <span>01 / 04</span>
              </div>
              <div className="page-hero-ledger-row">
                <span>VALIDATE</span>
                <span>02 / 04</span>
              </div>
              <div className="page-hero-ledger-row">
                <span>IMPROVE</span>
                <span>03 / 04</span>
              </div>
            </div>
          ) : variant === "technical" ? (
            <div className="page-hero-visual">
              <span className="page-hero-visual-corner">ENGINEERING PRACTICE / 01</span>
              <div className="page-hero-visual-stack" aria-hidden="true">
                {visualIcons.slice(0, 4).map((Icon, index) => (
                  <span className={`visual-tile visual-tile-${index + 1}`} key={index}>
                    <Icon size={index === 0 ? 24 : 19} strokeWidth={1.5} />
                  </span>
                ))}
              </div>
              <div className="page-hero-visual-labels">
                {visualLabels.slice(0, 3).map((label) => (
                  <span key={label}>
                    <Check aria-hidden="true" size={12} />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="page-hero-aside-card">
              <span className="page-hero-aside-icon">
                <Compass aria-hidden="true" size={19} strokeWidth={1.5} />
              </span>
              <span className="page-hero-aside-code">AGAPE TECH / FIELD NOTES</span>
              <h2>{asideTitle ?? "Start with what matters."}</h2>
              <p>
                {asideDescription ??
                  "Ground the technical approach in the people, priorities, and conditions around the work."}
              </p>
              <span className="page-hero-aside-rule" />
              <span className="page-hero-aside-foot">
                <span>DISCOVER WITH INTENTION</span>
                <ArrowDown aria-hidden="true" size={14} />
              </span>
            </div>
          )}
        </div>
        <Link className="page-hero-link" href={ctaHref}>
          {ctaLabel} <ArrowUpRight aria-hidden="true" size={16} />
        </Link>
      </div>
    </section>
  );
}
