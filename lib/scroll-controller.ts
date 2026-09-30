"use client";

import { useEffect, type RefObject } from "react";

type Subscriber = () => void;

const subscribers = new Set<Subscriber>();
let frame = 0;

function run() {
  frame = 0;
  for (const subscriber of subscribers) subscriber();
}

function schedule() {
  if (!frame) frame = window.requestAnimationFrame(run);
}

/** One shared, rAF-throttled passive scroll/resize listener for every scroll-driven section. */
function subscribe(subscriber: Subscriber) {
  subscribers.add(subscriber);
  if (subscribers.size === 1) {
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  schedule();

  return () => {
    subscribers.delete(subscriber);
    if (subscribers.size === 0) {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

/**
 * Calls `onFrame` on animation frames while `ref` is near the viewport.
 * Uses native document scrolling only; never prevents or replaces scroll input.
 */
export function useScrollFrame(
  ref: RefObject<HTMLElement | null>,
  onFrame: () => void,
  enabled: boolean,
) {
  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    let unsubscribe: (() => void) | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting && !unsubscribe) {
          unsubscribe = subscribe(onFrame);
        } else if (!entry?.isIntersecting && unsubscribe) {
          onFrame();
          unsubscribe();
          unsubscribe = null;
        }
      },
      { rootMargin: "50% 0px 50% 0px" },
    );
    observer.observe(element);
    onFrame();

    return () => {
      observer.disconnect();
      unsubscribe?.();
    };
  }, [ref, onFrame, enabled]);
}

/** Tracks a media query without reading `window` during server render. */
export function subscribeMedia(query: string, callback: (matches: boolean) => void) {
  const media = window.matchMedia(query);
  const listener = () => callback(media.matches);
  listener();
  media.addEventListener("change", listener);
  return () => media.removeEventListener("change", listener);
}
