import { useCallback, useEffect, useRef, useState } from 'react';
import { renderReactNodeOrFunctionP1 } from '../../helpers';
import type { TabsInlineBodyProps } from '../Tabs/types';

const onIdle = (callback: () => void) => {
  if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout: 3000 });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 1500);
  return () => clearTimeout(id);
};

export function TabsInlineBody<T = string>({ tabs, selectedTabKey }: TabsInlineBodyProps<T>) {
  const tabKeys = Object.keys(tabs);
  const selectedIndex = tabKeys.findIndex((key) => key === selectedTabKey) ?? 0;

  // Only the tabs opened at least once are mounted (they stay mounted, keeping their state). The others used to be
  // mounted hidden: their requests, refresh intervals and subscriptions ran without being seen.
  const selectedKey = String(selectedTabKey ?? '');
  const [visited, setVisited] = useState<ReadonlySet<string>>(() => new Set([selectedKey]));
  if (!visited.has(selectedKey)) {
    setVisited(new Set([...visited, selectedKey]));
  }

  // Instead, the not opened tabs preload their data / code when the browser is idle, so they open instantly.
  const tabsRef = useRef(tabs);
  tabsRef.current = tabs;
  const visitedRef = useRef(visited);
  visitedRef.current = visited;
  const preloadedRef = useRef(new Set<string>());
  const tabKeysSignature = tabKeys.join('\u0000');
  useEffect(
    () =>
      onIdle(() => {
        for (const [key, tab] of Object.entries(tabsRef.current)) {
          if (tab?.preload && !visitedRef.current.has(key) && !preloadedRef.current.has(key)) {
            preloadedRef.current.add(key);
            try {
              tab.preload();
            } catch {
              // a failed preload only means the tab will load when opened
            }
          }
        }
      }),
    [tabKeysSignature],
  );
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver>(null);

  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (node) {
      observerRef.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const { width, height } = entry.contentRect;
          setSize((prev) => {
            if (prev.width !== width || prev.height !== height) {
              return { width, height };
            }
            return prev;
          });
        }
      });
      observerRef.current.observe(node);
    }
  }, []);

  return (
    <div className="ow-hn jk-row nowrap wh-100 ht-100 jk-tabs-inline-layout" ref={measuredRef}>
      {!!width &&
        !!height &&
        tabKeys.map((key, index) => {
          const tab = tabs[key];
          const isVisible = Math.abs(selectedIndex - index) <= 0;
          if (!visited.has(key)) {
            return null;
          }
          return (
            <div
              key={key}
              className="jk-tabs-inline-body-content ow-ao bs-bb"
              style={{
                opacity: isVisible ? 1 : 0,
                width,
                height,
                left: -selectedIndex * width + index * width,
              }}
            >
              {renderReactNodeOrFunctionP1(tab?.body, { selectedTabKey })}
            </div>
          );
        })}
    </div>
  );
}
