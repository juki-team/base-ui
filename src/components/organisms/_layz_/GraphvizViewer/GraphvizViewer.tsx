import { instance } from '@viz-js/viz';
import { useEffect, useRef } from 'react';
import { create } from 'zustand';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { classNames } from '../../../helpers';
import { GraphvizViewerProps } from './types';

interface GraphvizState {
  shouldRerender: number;
  triggerRerender: () => void;
}

export const useGraphvizStore = create<GraphvizState>((set) => ({
  shouldRerender: 0,
  triggerRerender: () =>
    set(() => ({ shouldRerender: Date.now() })),
}));

export default function GraphvizViewer({ dot, className }: GraphvizViewerProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useI18nStore(store => store.i18n.t);
  const shouldRerender = useGraphvizStore(store => store.shouldRerender);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    instance().then(viz => {
      el.innerHTML = '';
      try {
        const svg = viz.renderSVGElement(dot, {});
        el.appendChild(svg);
      } catch (e: any) {
        console.warn('error on drawing Graphviz', e);
        el.innerHTML = '';
        const errorDiv = document.createElement('div');
        errorDiv.textContent = t('error rendering graph') + `: ${e?.message || String(e)}`;
        errorDiv.style.color = 'red';
        errorDiv.style.whiteSpace = 'pre-wrap';
        el.appendChild(errorDiv);
      }
    });
    
    return () => {
      try {
        el.innerHTML = '';
      } catch {
      }
    };
  }, [ dot, shouldRerender ]);
  
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
