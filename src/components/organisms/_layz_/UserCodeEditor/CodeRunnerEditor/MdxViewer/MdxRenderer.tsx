import { evaluate } from '@mdx-js/mdx';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import React, { type ComponentType, useEffect, useState } from 'react';
import * as runtime from 'react/jsx-runtime';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MDXComponents = Record<string, ComponentType<any>>;

type MDXContentComponent = ComponentType<{ components?: MDXComponents }>;

interface MdxRendererProps {
  source: string;
  components?: MDXComponents;
}

export function MdxRenderer({ source, components }: MdxRendererProps) {
  const [Component, setComponent] = useState<MDXContentComponent | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function prepare() {
      try {
        const { default: Content } = await evaluate(source, {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(runtime as any),
          baseUrl: import.meta.url,
          remarkPlugins: [remarkGfm, remarkMath],
          rehypePlugins: [rehypeKatex],
        });
        if (!cancelled) {
          setComponent(() => Content as unknown as MDXContentComponent);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError((err as Error).message);
          setComponent(null);
        }
      }
    }
    prepare();
    return () => {
      cancelled = true;
    };
  }, [source]);

  if (error) return <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>{error}</pre>;
  if (!Component) return null;

  const base: MDXComponents = { ...defaultMdxComponents, ...components };
  const usedNames = [...source.matchAll(/<([A-Z][a-zA-Z0-9]*)\b/g)].map((m) => m[1]!);
  for (const name of usedNames) {
    if (!(name in base)) {
      const n = name;
      base[n] = ({ children }: { children?: React.ReactNode }) => (
        <span style={{ color: 'orange', border: '1px dashed orange', padding: '0 4px', fontFamily: 'monospace' }}>
          &lt;{n}&gt;{children}&lt;/{n}&gt;
        </span>
      );
    }
  }

  return <Component components={base} />;
}
