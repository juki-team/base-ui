import { graphviz, type GraphvizOptions } from 'd3-graphviz';
import { forwardRef, type  Ref, type RefObject, useEffect, useRef } from 'react';
import type { IGraphvizProps } from './types';

const defaultOptions: GraphvizOptions = {
  fit: true,
  // height: 500,
  // width: 500,
  zoom: false,
  useWorker: false as any,
};

// TODO: remove d3-graphviz

function GraphvizComponent({ dot, className, options = {} }: IGraphvizProps, ref: Ref<HTMLDivElement>) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const setRefs = (el: HTMLDivElement | null) => {
    containerRef.current = el;
    if (typeof ref === 'function') {
      ref(el);
    } else if (ref) {
      (ref as RefObject<HTMLDivElement | null>).current = el;
    }
  };
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    el.innerHTML = '';
    
    // crea instancia y conecta handler de errores
    const gv = graphviz(el, { ...defaultOptions, ...options })
      .onerror?.((e: any) => {
        // algunos builds exponen onerror; si no, ignora esta línea
        console.error(e?.message || String(e));
      });
    
    try {
      gv.renderDot(dot); // si hay error sintáctico y useWorker=false, lanza excepción
    } catch (e: any) {
      console.error(e?.message || String(e));
    }
    
    return () => {
      try {
        el.innerHTML = '';
      } catch {
      }
    };
  }, [ dot, options?.width, options?.height, options?.fit, options?.zoom ]);
  
  return <div className={className} ref={setRefs} />;
}

// export const Graphviz = ({ dot, className, options = {} }: IGraphvizProps) => {
const Graphviz = forwardRef(GraphvizComponent);

export default Graphviz;

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
