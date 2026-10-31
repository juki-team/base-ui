import { useEffect, useRef } from 'react';

export const MermaidInline = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !value) return;

    el.removeAttribute('data-processed');
    el.innerHTML = value;

    import('mermaid').then(({ default: mermaid }) => {
      // keep the pre-v12 appearance (v12 defaults to the redux-color theme, neo look and ELK layout)
      mermaid.initialize({ startOnLoad: false, securityLevel: 'loose', theme: 'default', look: 'classic', layout: 'dagre' });
      mermaid.run({ nodes: [el] });
    });
  }, [value]);

  return <div ref={ref} className="mermaid" />;
};
