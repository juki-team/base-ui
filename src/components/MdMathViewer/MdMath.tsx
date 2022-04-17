// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
// import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import React, { CSSProperties, lazy, memo, ReactNode, Suspense, useEffect, useState } from 'react';
import { ReactMarkdownOptions } from 'react-markdown/lib/react-markdown';
import { ProgrammingLanguage } from '../../types';
// import ReactMarkdown from 'react-markdown';
// import rehypeKatex from 'rehype-katex';
// import gfm from 'remark-gfm';
// import RemarkMathPlugin from 'remark-math';
import { CodeViewer, ExternalIcon, LoadingIcon } from '../index';
import { getCommands, hxRender, imgAlignStyle, textAlignStyle } from './utils';

const ReactMarkdown = lazy(() => import('react-markdown'));
// const rehypeKatex = lazy(() => import('rehype-katex'));

const hx = ({ children, level }: { children: ReactNode & ReactNode[], level: number }) => {
  if (typeof children?.[0] === 'string') {
    const [commands, newText] = getCommands(children?.[0] as string || '');
    const newChildren = [...children];
    newChildren[0] = newText;
    if (commands.textAlign) {
      return hxRender(level, newChildren, textAlignStyle[commands.textAlign]);
    }
  }
  return hxRender(level, children, {});
};

export const MdMath = memo(({ source }: { source: string }) => {
  
  const [rehypePlugins, setRehypePlugins] = useState<any[]>([]);
  const [remarkPlugins, setRemarkPlugins] = useState<any[]>([]);
  useEffect(() => {
    setRehypePlugins([require('rehype-katex').default]);
    setRemarkPlugins([require('remark-math').default, require('remark-gfm').default]);
  }, []);
  
  const props: ReactMarkdownOptions = {
    remarkPlugins,
    rehypePlugins,
    components: {
      img({ alt = '', src }) {
        let style: CSSProperties = {
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
        };
        const [commands, newAlt] = getCommands(alt);
        if (commands.imgAlign) {
          style = {
            ...style,
            ...imgAlignStyle[commands.imgAlign],
          };
        }
        if (commands.size) {
          style.width = commands.size.width + 'px';
          style.height = commands.size.height + 'px';
        }
        return <img alt={newAlt} src={src} style={style} />;
      },
      h1: hx,
      h2: hx,
      h3: hx,
      h4: hx,
      h5: hx,
      h6: hx,
      p({ children = [] }) {
        if (typeof children?.[0] === 'string') {
          const [commands, newText] = getCommands(children?.[0]);
          let style: CSSProperties = {
            textAlign: 'justify',
          };
          if (commands.textAlign) {
            style = {
              ...style,
              ...textAlignStyle[commands.textAlign],
            };
          }
          const newChildren = [...children];
          newChildren[0] = newText;
          return <p style={style}>{newChildren}</p>;
        }
        return <p>{children}</p>;
      },
      a({ children, href }) {
        if (typeof children[0] === 'string') {
          return <a href={href} target="_blank" rel="noreferrer">{children}<ExternalIcon /></a>;
        }
        return <a href={href} target="_blank" rel="noreferrer">{children}</a>;
      },
      // input(...props) {
      //   return <pre>holiwi input</pre>;
      // },
      code: ({ children, inline, className = '' }) => {
        if (inline) {
          return <code className="inline-code">{children}</code>;
        }
        const text = (className as string).replace('language-', '');
        const [commands, newClassName] = getCommands(text);
        const language = (commands.lang || commands.rest || newClassName || ProgrammingLanguage.TEXT) as ProgrammingLanguage;
        return (
          <CodeViewer
            code={children.join('')}
            language={language}
            lineNumbers={commands.lineNumbers}
            height={Number.isNaN(+(commands.height || '_')) ? commands.height : commands.height + 'px'}
          />
        );
      },
    },
    children: source,
  };
  return (
    <div className="jk-md-math">
      <Suspense fallback={<LoadingIcon />}>
        <ReactMarkdown {...props}>
          {source}
        </ReactMarkdown>
      </Suspense>
    </div>
  );
});