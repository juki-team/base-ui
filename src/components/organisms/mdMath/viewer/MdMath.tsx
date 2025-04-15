// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
import { ContentResponseType, ProgrammingLanguage, UserBasicResponseDTO } from '@juki-team/commons';
// import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import React, { CSSProperties, memo, ReactNode, useMemo } from 'react';
import ReactMarkdown, { Options as ReactMarkdownOptions } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import RemarkGfmPlugin from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';
import { useFetcher, useJukiUI } from '../../../../hooks';
import { jukiApiSocketManager } from '../../../../settings';
import { CodeViewer } from '../../../molecules';
import { ErrorIcon, OpenInNewIcon, SpinIcon } from '../../../server';
import { GraphvizViewer } from '../../Graphviz/GraphvizViewer';
import { UserChip } from '../../UserChip/UserChip';
import { CommandsObjectType } from './types';
import { getCommands, hxRender, imgAlignStyle, textAlignStyle } from './utils';

// const ReactMarkdown = lazy(() => import('react-markdown'));
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

const UserInlineChip = ({ nickname }: { nickname: string }) => {
  
  const {
    isLoading,
    data,
  } = useFetcher<ContentResponseType<UserBasicResponseDTO>>(jukiApiSocketManager.API_V1.user.getSummary({ params: { nickname } }).url);
  
  if (isLoading) {
    return <SpinIcon size="tiny" />;
  }
  
  if (!data?.success) {
    return <ErrorIcon />;
  }
  
  return (
    <UserChip
      nickname={nickname}
      imageUrl={data.content.imageUrl}
      className="jk-tag bc-hl dy-if- va-tp nowrap"
    />
  );
};

const CustomField = ({ commands }: { commands: CommandsObjectType, restText: string }) => {
  if (commands.jkUserNickname) {
    return <UserInlineChip nickname={commands.jkUserNickname} />;
  }
  return <span>--</span>;
};

export const MdMath = memo(({ source }: { source: string }) => {
  const { components: { Link } } = useJukiUI();
  // const [ rehypePlugins, setRehypePlugins ] = useState<any[]>([]);
  // const [ remarkPlugins, setRemarkPlugins ] = useState<any[]>([]);
  // useEffect(() => {
  //   setRehypePlugins([ require('rehype-katex').default ]);
  //   setRemarkPlugins([ require('remark-math').default, require('remark-gfm').default ]);
  // }, []);
  
  const props = useMemo((): ReactMarkdownOptions => ({
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
      p({ children = null }) {
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
        return <p>{children as ReactNode}</p>;
      },
      a({ children, href = '' }) {
        const firstChildrenString = typeof children === 'string'
          ? children
          : Array.isArray(children) ? (typeof children[0] === 'string' ? children[0] : null) : null;
        
        if (typeof firstChildrenString === 'string') {
          const [ commands, restText ] = getCommands(firstChildrenString);
          if (href === '@') {
            return <CustomField commands={commands} restText={restText} />;
          }
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
                  {restText}&nbsp;<OpenInNewIcon />
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
                  {children as ReactNode}
                </a>
              </div>
            );
          }
          
          return (
            <Link href={href} target="_blank" rel="noreferrer" className="jk-md-math-link with-icon">
              <>{children as ReactNode}&nbsp;<OpenInNewIcon /></>
            </Link>
          );
        }
        
        return (
          <Link href={href} target="_blank" rel="noreferrer" className="jk-md-math-link">
            {children as ReactNode}
          </Link>
        );
      },
      // input(...props) {
      //   return <pre>holiwi input</pre>;
      // },
      code: ({ children, className = '' }) => {
        const inline = !children?.toString().includes('\n');
        if (inline) {
          return <code className="inline-code">{children as ReactNode}</code>;
        }
        
        let text = (className as string).replace('language-', '');
        for (const a of Object.keys(ProgrammingLanguage)) {
          if (text.startsWith(a)) {
            text = `\\lang=${text}`;
            break;
          }
        }
        const [ commands, newClassName ] = getCommands(text);
        const language = (commands.lang
          || commands.rest
          || newClassName
          || ProgrammingLanguage.TEXT) as ProgrammingLanguage;
        
        if (typeof children === 'string') {
          
          if (language === ProgrammingLanguage.DOT && commands.asImage) {
            return (
              <GraphvizViewer value={children} className={`jk-row ${commands.imgAlign || ''}`} />
            );
          }
          
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
      table: ({ children, className = '' }) => {
        return (
          <div style={{ overflowX: 'auto' }}>
            <table>
              {children as ReactNode}
            </table>
          </div>
        );
      },
    },
  }), [ Link ]);
  
  return (
    <div className="jk-md-math">
      <ReactMarkdown {...props} >
        {source}
      </ReactMarkdown>
    </div>
  );
});
