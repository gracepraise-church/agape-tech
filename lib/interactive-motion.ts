export function clamp01(value: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(1, Math.max(0, value));
}

/**
 * Progress (0–1) through a pinned region: 0 when the section top reaches the
 * viewport top, 1 when its bottom reaches the viewport bottom.
 */
export function pinnedProgress(sectionTop: number, sectionHeight: number, viewportHeight: number) {
  const distance = sectionHeight - viewportHeight;
  if (distance <= 0) return sectionTop <= 0 ? 1 : 0;
  return clamp01(-sectionTop / distance);
}

export function stageIndexFromProgress(progress: number, count: number) {
  if (count <= 0) return 0;
  return Math.min(count - 1, Math.floor(clamp01(progress) * count));
}

/** Scroll position (relative to the section top) that centers a stage within the pinned range. */
export function stageScrollOffset(index: number, count: number, scrollDistance: number) {
  if (count <= 0 || scrollDistance <= 0) return 0;
  return ((index + 0.5) / count) * scrollDistance;
}

export function nextTabIndex(key: string, current: number, count: number): number | null {
  if (count <= 0) return null;
  switch (key) {
    case "ArrowRight":
    case "ArrowDown":
      return (current + 1) % count;
    case "ArrowLeft":
    case "ArrowUp":
      return (current - 1 + count) % count;
    case "Home":
      return 0;
    case "End":
      return count - 1;
    default:
      return null;
  }
}
