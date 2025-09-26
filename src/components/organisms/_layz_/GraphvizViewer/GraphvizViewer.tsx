import { graphviz, type GraphvizOptions } from 'd3-graphviz';
import { memo, useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { classNames } from '../../../../helpers';
import { Graphviz } from '../Graphviz';
import type { GraphvizViewerProps } from '../Graphviz/types';

const defaultOptions: GraphvizOptions = {
  fit: true,
  // height: 500,
  // width: 500,
  zoom: false,
  useWorker: false as any,
};

interface GraphvizState {
  shouldRerender: number;
  triggerRerender: () => void;
}

export const useGraphvizStore = create<GraphvizState>((set) => ({
  shouldRerender: 0,
  triggerRerender: () =>
    set(() => ({ shouldRerender: Date.now() })),
}));

function GraphvizViewerComponent({ value, className, width, height }: GraphvizViewerProps) {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [ error, setError ] = useState<string>('');
  const shouldRerender = useGraphvizStore((s) => s.shouldRerender);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    el.innerHTML = '';
    setError('');
    const options = { width, height };
    
    try {
      graphviz(el, { ...defaultOptions, ...options })
        .fit(false)
        .renderDot(value)
        .onerror?.((e: any) => {
        setError(e?.message || String(e));
      });
    } catch (e: any) {
      setError(e?.message || String(e));
    }
    
    return () => {
      try {
        el.innerHTML = '';
      } catch {
      }
    };
  }, [ value, width, height, shouldRerender ]);
  
  return (
    <div className={classNames('jk-graphviz-viewer-container', className)}>
      {error && <div className="jk-tag bc-er">{error}</div>}
      <Graphviz dot={value} className="jk-graphviz-viewer" options={{ width, height }} ref={containerRef} />
    </div>
  );
}

const GraphvizViewer = memo(GraphvizViewerComponent);

export default GraphvizViewer;
