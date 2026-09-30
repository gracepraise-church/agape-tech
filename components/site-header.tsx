"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
        return;
      }

      if (event.key !== "Tab") return;
      const links = mobileMenuRef.current?.querySelectorAll<HTMLElement>("a");
      if (!links?.length) return;

      const firstLink = links[0];
      const lastLink = links[links.length - 1];
      if (event.shiftKey && document.activeElement === firstLink) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        firstLink.focus();
      }
    };

    mobileMenuRef.current?.querySelector<HTMLElement>("a")?.focus();
    document.addEventListener("keydown", onKeyDown);
    document.body.classList.add("menu-open");
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("menu-open");
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <Link className="brand-link" href="/" aria-label="Agape Tech home" onClick={closeMenu}>
          <Image
            src="/assets/brand/agape-tech-logo-horizontal-transparent.webp"
            alt="Agape Tech — Technology with Purpose"
            width={2172}
            height={724}
            sizes="(max-width: 720px) 148px, 188px"
          />
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                aria-current={isActive ? "page" : undefined}
                className={isActive ? "nav-link is-active" : "nav-link"}
                href={item.href}
                key={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link className="header-cta" href="/contact/">
          <span>Start a project</span>
          <ArrowUpRight aria-hidden="true" size={16} strokeWidth={1.8} />
        </Link>

        <button
          aria-controls={isMenuOpen ? "mobile-navigation" : undefined}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="menu-toggle"
          onClick={() => setIsMenuOpen((open) => !open)}
          ref={menuButtonRef}
          type="button"
        >
          {isMenuOpen ? <X aria-hidden="true" size={23} /> : <Menu aria-hidden="true" size={23} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          aria-label="Mobile navigation"
          aria-modal="true"
          className="mobile-menu"
          id="mobile-navigation"
          ref={mobileMenuRef}
          role="dialog"
        >
          <nav aria-label="Mobile navigation">
            {navigation.map((item, index) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  aria-current={isActive ? "page" : undefined}
                  className={isActive ? "mobile-nav-link is-active" : "mobile-nav-link"}
                  href={item.href}
                  key={item.href}
                  onClick={closeMenu}
                  style={{ animationDelay: `${index * 45}ms` }}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight aria-hidden="true" size={20} strokeWidth={1.6} />
                </Link>
              );
            })}
            <p className="mobile-menu-note">Thoughtful engineering, built around your next step.</p>
          </nav>
        </div>
      )}
    </header>
  );
}
