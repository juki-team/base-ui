import { useCallback, useRef, useState } from 'react';
import { renderReactNodeOrFunctionP1 } from '../../helpers';
import type { TabsInlineBodyProps } from '../Tabs/types';

export function TabsInlineBody<T = string, >({ tabs, selectedTabKey }: TabsInlineBodyProps<T>) {
  const tabKeys = Object.keys(tabs);
  const selectedIndex = tabKeys.findIndex(key => key === selectedTabKey) ?? 0;
  const [ { width, height }, setSize ] = useState({ width: 0, height: 0 });
  const observerRef = useRef<ResizeObserver>(null);
  
  const measuredRef = useCallback((node: HTMLDivElement | null) => {
    observerRef.current?.disconnect();
    if (node) {
      observerRef.current = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setSize(prev => {
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
      {!!width && !!height && tabKeys.map((key, index) => {
        const tab = tabs[key];
        const isVisible = Math.abs(selectedIndex - index) <= 0;
        return (
          <div
            key={key}
            className="jk-tabs-inline-body-content"
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
