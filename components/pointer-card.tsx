"use client";

import type { PointerEvent, ReactNode } from "react";

type PointerCardProps = {
  children: ReactNode;
  className: string;
};

export function PointerCard({ children, className }: PointerCardProps) {
  const trackPointer = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <article className={`${className} pointer-card`} onPointerMove={trackPointer}>
      {children}
    </article>
  );
}
