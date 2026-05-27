import { consoleWarn } from '@juki-team/commons/helpers';
import { instance } from '@viz-js/viz';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import { useT } from '../../../atoms/T/client';
import { classNames } from '../../../helpers/commons';
import type { GraphvizViewerProps } from './types';

interface GraphvizState {
  shouldRerender: number;
  triggerRerender: () => void;
}

export const useGraphvizStore = create<GraphvizState>((set) => ({
  shouldRerender: 0,
  triggerRerender: () => set(() => ({ shouldRerender: Date.now() })),
}));

export default function GraphvizViewer({ dot, className }: GraphvizViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useT();
  const shouldRerender = useGraphvizStore((store) => store.shouldRerender);

  // biome-ignore lint/correctness/useExhaustiveDependencies: shouldRerender is a trigger to re-render the SVG when the global flag toggles
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    instance().then((viz) => {
      const prevHeight = el.getBoundingClientRect().height;
      el.innerHTML = '';
      el.style.minHeight = prevHeight ? `${prevHeight}px` : '';
      try {
        const svg = viz.renderSVGElement(dot, {});
        el.appendChild(svg);
        el.style.minHeight = '';
      } catch (e) {
        consoleWarn('error on drawing Graphviz', e);
        el.innerHTML = '';
        el.style.minHeight = '';
        const errorDiv = document.createElement('div');
        errorDiv.textContent = `${t('error rendering graph')}: ${(e as Error)?.message || String(e)}`;
        errorDiv.style.color = 'red';
        errorDiv.style.whiteSpace = 'pre-wrap';
        el.appendChild(errorDiv);
      }
    });
  }, [dot, shouldRerender, t]);

  return (
    <div className={classNames('jk-graphviz-viewer-container', className)}>
      <div className="jk-graphviz-viewer" ref={containerRef} />
    </div>
  );
}

/*
digraph G {
  rankdir=LR;
  node [shape=plain, fontname="Inter"];
  edge [color="#f59e0b", penwidth=2];

  topLbl [label="top", shape=plaintext];

  stack [label=<
    <TABLE BORDER="1" CELLBORDER="1" CELLSPACING="0">
      <TR><TD><B>Stack (top)</B></TD></TR>
      <TR><TD PORT="top"><I>∅</I></TD></TR>
    </TABLE>
  >];

  topLbl -> stack:top;
}
 */
