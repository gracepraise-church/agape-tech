"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function ScrollRevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

    const targets = document.querySelectorAll<HTMLElement>(
      "main > section:not(.hero-section), .footer-main",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.removeAttribute("data-reveal");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    for (const target of targets) {
      if (target.getBoundingClientRect().top < window.innerHeight * 0.92) continue;
      target.setAttribute("data-reveal", "pending");
      observer.observe(target);
    }

    document.body.classList.add("motion-ready");
    return () => {
      observer.disconnect();
      document.body.classList.remove("motion-ready");
    };
  }, [pathname]);

  return null;
}
