// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
import { ProgrammingLanguage } from '@juki-team/commons';
// import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import React, { CSSProperties, lazy, memo, ReactNode, Suspense } from 'react';
import { Options as ReactMarkdownOptions } from 'react-markdown';
// import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import RemarkGfmPlugin from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';
import { useJukiUI } from '../../../../hooks';
import { CopyToClipboard, LinkIcon, OpenInNewIcon, SpinIcon } from '../../../atoms';
import { CodeViewer } from '../../../molecules';
import { getCommands, hxRender, imgAlignStyle, textAlignStyle } from './utils';

const ReactMarkdown = lazy(() => import('react-markdown'));
// const rehypeKatex = lazy(() => import('rehype-katex'));

const hx = ({ children, node: { tagName } }: { children: ReactNode & ReactNode[], node: { tagName: string } }) => {
  const newChildren = Array.isArray(children) ? [ ...children ] : [ children ];
  if (typeof newChildren[0] === 'string') {
    const [ commands, newText ] = getCommands(newChildren[0]);
    newChildren[0] = newText;
    if (commands.textAlign) {
      return hxRender(tagName, newText, textAlignStyle[commands.textAlign]);
    }
  }
  
  return hxRender(tagName, children, {});
};

export const MdMath = memo(({ source }: { source: string }) => {
  const { components: { Link } } = useJukiUI();
  // const [ rehypePlugins, setRehypePlugins ] = useState<any[]>([]);
  // const [ remarkPlugins, setRemarkPlugins ] = useState<any[]>([]);
  // useEffect(() => {
  //   setRehypePlugins([ require('rehype-katex').default ]);
  //   setRemarkPlugins([ require('remark-math').default, require('remark-gfm').default ]);
  // }, []);
  
  const props: ReactMarkdownOptions = {
    remarkPlugins: [ RemarkMathPlugin, RemarkGfmPlugin ],
    rehypePlugins: [ rehypeKatex ],
    components: {
      img({ alt = '', src }) {
        let style: CSSProperties = {
          maxWidth: '100%',
          display: 'block',
          margin: '0 auto',
        };
        const [ commands, newAlt ] = getCommands(alt);
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
      // h1(...props) {
      //   return null;
      // },
      h1: hx as any,
      h2: hx as any,
      h3: hx as any,
      h4: hx as any,
      h5: hx as any,
      h6: hx as any,
      p({ children = [] }) {
        const newChildren = Array.isArray(children) ? [ ...children ] : [ children ];
        if (typeof newChildren[0] === 'string') {
          const [ commands, newText ] = getCommands(newChildren[0]);
          let style: CSSProperties = {
            textAlign: 'justify',
          };
          if (commands.textAlign) {
            style = {
              ...style,
              ...textAlignStyle[commands.textAlign],
            };
          }
          newChildren[0] = newText;
          return <p style={style}>{newChildren}</p>;
        }
        return <p>{children}</p>;
      },
      a({ children, href = '' }: { children?: ReactNode[] | ReactNode, href?: string }) {
        const firstChildrenString = typeof children === 'string'
          ? children
          : Array.isArray(children) ? (typeof children[0] === 'string' ? children[0] : null) : null;
        
        if (typeof firstChildrenString === 'string') {
          const [ commands, newText ] = getCommands(firstChildrenString);
          const style = { outline: '2px solid var(--t-color-gray-6)', border: 'none', height: '100%' };
          if (commands.height) {
            style.height = Number.isNaN(+commands.height) ? commands.height : (commands.height + 'px');
          }
          
          if (commands.preview === 'pdf') {
            return (
              <object data={href} type="application/pdf" width="100%" height="100%" style={style}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="jk-md-math-link"
                >
                  {newText}&nbsp;<OpenInNewIcon />
                </Link>
              </object>
            );
          }
          
          if (commands.preview === 'html') {
            return <iframe src={href} style={{ width: '100%', ...style }} title="preview-html-document" />;
          }
          
          if (href?.startsWith('#')) {
            const url = new URL(window?.location?.href || '');
            url.hash = href;
            
            return (
              <div className="jk-md-math-link-container jk-row left" id={href.replace('#', '')}>
                <a href={href} className="jk-md-math-link">
                  {children}
                </a>
                &nbsp;
                <CopyToClipboard text={url.toString()}>
                  <LinkIcon className="clickable" style={{ borderRadius: '50%', display: 'inline-grid' }} />
                </CopyToClipboard>
              </div>
            );
          }
          return (
            <Link href={href} target="_blank" rel="noreferrer" className="jk-md-math-link with-icon">
              <>{children}&nbsp;<OpenInNewIcon /></>
            </Link>
          );
        }
        
        return (
          <Link href={href} target="_blank" rel="noreferrer" className="jk-md-math-link">
            {children}
          </Link>
        );
      },
      // input(...props) {
      //   return <pre>holiwi input</pre>;
      // },
      code: ({ children, className = '' }) => {
        const inline = !children?.toString().includes('\n');
        if (inline) {
          return <code className="inline-code">{children}</code>;
        }
        const text = (className as string).replace('language-', '');
        const [ commands, newClassName ] = getCommands(text);
        const language = (commands.lang
          || commands.rest
          || newClassName
          || ProgrammingLanguage.TEXT) as ProgrammingLanguage;
        
        if (typeof children === 'string') {
          return (
            <CodeViewer
              // code={children.join('')}
              code={children}
              language={language}
              lineNumbers={commands.lineNumbers}
              height={Number.isNaN(+(commands.height || '_')) ? commands.height : commands.height + 'px'}
            />
          );
        }
        
        return null;
      },
      table: ({ children, className = '', ...props }) => {
        return (
          <div style={{ overflowX: 'auto' }}>
            <table>
              {children}
            </table>
          </div>
        );
      },
    },
    children: source,
  };
  
  return (
    <div className="jk-md-math">
      <Suspense fallback={<SpinIcon />}>
        <ReactMarkdown {...props} >
          {source}
        </ReactMarkdown>
      </Suspense>
    </div>
  );
});
