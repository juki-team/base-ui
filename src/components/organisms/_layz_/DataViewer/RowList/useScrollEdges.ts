import { type DependencyList, type RefObject, useEffect, useState } from 'react';

export interface ScrollEdges {
  top: boolean;
  bottom: boolean;
  left: boolean;
  right: boolean;
}

const NO_EDGES: ScrollEdges = { top: false, bottom: false, left: false, right: false };

/**
 * Whether the element can still scroll towards each side. Measured in a rAF after scroll/resize (never
 * during render, which would force a reflow) and only commits a state update when a flag flips.
 * `deps`: values that change the content size (e.g. total rows height, columns width).
 */
export function useScrollEdges(ref: RefObject<HTMLElement | null>, deps: DependencyList): ScrollEdges {
  const [edges, setEdges] = useState<ScrollEdges>(NO_EDGES);

  useEffect(() => {
    const element = ref.current;
    if (!element) {
      return;
    }
    let frame = 0;
    const measure = () => {
      frame = 0;
      const { scrollTop, scrollLeft, clientHeight, clientWidth, scrollHeight, scrollWidth } = element;
      const next: ScrollEdges = {
        top: scrollTop > 0,
        bottom: scrollTop + clientHeight < scrollHeight - 1,
        left: scrollLeft > 0,
        right: scrollWidth - clientWidth - scrollLeft > 1,
      };
      setEdges((prev) =>
        prev.top === next.top && prev.bottom === next.bottom && prev.left === next.left && prev.right === next.right
          ? prev
          : next,
      );
    };
    const schedule = () => {
      if (!frame) {
        frame = requestAnimationFrame(measure);
      }
    };
    schedule();
    element.addEventListener('scroll', schedule, { passive: true });
    const resizeObserver = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(schedule) : null;
    resizeObserver?.observe(element);
    return () => {
      element.removeEventListener('scroll', schedule);
      resizeObserver?.disconnect();
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, ...deps]);

  return edges;
}
