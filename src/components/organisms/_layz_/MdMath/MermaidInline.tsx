import { useEffect, useRef } from 'react';

export const MermaidInline = ({ value }: { value: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !value) return;

    el.removeAttribute('data-processed');
    el.innerHTML = value;

    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
      mermaid.run({ nodes: [el] });
    });
  }, [value]);

  return <div ref={ref} className="mermaid" />;
};