// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
import { CODE_LANGUAGE, CodeLanguage, type  ContentResponseType, type UserBasicResponseDTO } from '@juki-team/commons';
import { type Element } from 'hast';
// import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import { Children, type CSSProperties, memo, type ReactNode, useMemo } from 'react';
import ReactMarkdown, { type Options as ReactMarkdownOptions } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import RemarkGfmPlugin from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';
import { QueryParamKey } from '../../../../enums';
import { jukiApiManager } from '../../../../settings';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { Button, DetectRequestAnimationFrame } from '../../../atoms';
import { VisibilityIcon, VisibilityOffIcon } from '../../../atoms/server';
import { classNames } from '../../../helpers';
import { useFetcher } from '../../../hooks/useFetcher';
import { useStableState } from '../../../hooks/useStableState';
import { CodeViewer } from '../../../molecules';
import { ErrorIcon, OpenInNewIcon, SpinIcon } from '../../../server';
import type { SetSearchParamsType } from '../../../types';
import { GraphvizViewers } from '../../GraphvizViewers/GraphvizViewers';
import { UserChip } from '../../UserChip/UserChip';
import { UserCodeEditor } from '../UserCodeEditor';
import type { CommandsObjectType, MdMathProps } from './types';
import { getCommands, hxRender, imgAlignStyle, textAlignStyle } from './utils';

type hxProps = { children: ReactNode & ReactNode[], node: Element };

const hx = (setSearchParams: SetSearchParamsType, noHLinks: boolean) => ({ children, node }: hxProps) => {
  
  const newChildren = Array.isArray(children) ? [ ...children ] : [ children ];
  if (typeof newChildren[0] === 'string') {
    const [ commands, newText ] = getCommands(newChildren[0]);
    newChildren[0] = newText;
    if (commands.textAlign) {
      return hxRender(node, newText, textAlignStyle[commands.textAlign] ?? {}, setSearchParams, noHLinks);
    }
  }
  
  return hxRender(node, children, {}, setSearchParams, noHLinks);
};

function UserInlineChip({ nickname }: { nickname: string }) {
  
  const {
    isLoading,
    data,
  } = useFetcher<ContentResponseType<UserBasicResponseDTO>>(jukiApiManager.API_V2.user.getSummary({ params: { nickname } }).url);
  
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
}

function CustomField({ commands }: { commands: CommandsObjectType, restText: string }) {
  if (commands.jkUserNickname) {
    return <UserInlineChip nickname={commands.jkUserNickname} />;
  }
  return <span>--</span>;
}

function MdMathComponent(props: MdMathProps) {
  
  const {
    source,
    blur: _blur,
    unBlur,
    slideView = false,
    detectRequestAnimationFrame,
  } = props;
  
  const { Link } = useUIStore(store => store.components);
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  // const [ rehypePlugins, setRehypePlugins ] = useState<any[]>([]);
  // const [ remarkPlugins, setRemarkPlugins ] = useState<any[]>([]);
  // useEffect(() => {
  //   setRehypePlugins([ require('rehype-katex').default ]);
  //   setRemarkPlugins([ require('remark-math').default, require('remark-gfm').default ]);
  // }, []);
  
  const mdProps = useMemo((): ReactMarkdownOptions => ({
    remarkPlugins: [ RemarkMathPlugin, RemarkGfmPlugin ],
    rehypePlugins: [ rehypeKatex ],
    components: {
      img({ alt = '', src, title }) {
        let style: CSSProperties = {};
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
        return <img alt={newAlt} src={src} style={style} title={title} />;
      },
      // h1(...props) {
      //   return null;
      // },
      h1: hx(setSearchParams, slideView) as any,
      h2: hx(setSearchParams, slideView) as any,
      h3: hx(setSearchParams, slideView) as any,
      h4: hx(setSearchParams, slideView) as any,
      h5: hx(setSearchParams, slideView) as any,
      h6: hx(setSearchParams, slideView) as any,
      p({ children = null, node }) {
        const newChildren = Array.isArray(children) ? [ ...children ] : [ children ];
        const isRoot = node?.position?.start?.column === 111111;
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
          return <p className={classNames({ 'fragment': isRoot })} style={style}>{Children.toArray(newChildren)}</p>;
        }
        return <p className={classNames({ 'fragment': isRoot })}>{children as ReactNode}</p>;
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
            const id = encodeURI(href.replace('#', ''));
            return (
              <div
                className="jk-md-math-link-container jk-row left cr-pr"
                id={id}
                onClick={() => setSearchParams({ name: QueryParamKey.PAGE_FOCUS, value: id })}
              >
                <div className="jk-md-math-link">
                  {children as ReactNode}
                </div>
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
      code: ({ children, className = '', node }) => {
        const isRoot = node?.position?.start?.column === 11111;
        const inline = !children?.toString().includes('\n');
        if (inline) {
          return <code className={classNames('inline-code cr-th bc-hl jk-br-ie', { 'fragment': isRoot })}>{children as ReactNode}</code>;
        }
        
        let text = (className as string).replace('language-', '');
        for (const a of Object.keys(CodeLanguage)) {
          if (text.startsWith(a)) {
            text = `\\lang=${text}`;
            break;
          }
        }
        const [ commands, newClassName ] = getCommands(text);
        const language = (commands.lang
          || commands.rest
          || newClassName
          || CodeLanguage.TEXT) as CodeLanguage;
        
        if (typeof children === 'string') {
          const meta = node?.data?.meta;
          if (language === CodeLanguage.DOT && meta === 'asImage') {
            return (
              <GraphvizViewers
                dot={children}
                className={classNames({ 'fragment': isRoot })}
                viewSourceButton={!slideView}
              />
            );
          }
          
          if (meta === 'asCodeEditor') {
            const storeKey = language + JSON.stringify(node?.position ?? '-');
            const fileName = `source.${CODE_LANGUAGE[language]?.fileExtension?.[0] || 'txt'}`;
            return (
              <UserCodeEditor
                storeKey={storeKey}
                key={storeKey}
                languages={[ { value: language, label: CODE_LANGUAGE[language]?.label ?? language } ]}
                initialFiles={{
                  [fileName]: {
                    source: children,
                    language: language,
                    index: 0,
                    name: fileName,
                    hidden: false,
                    readonly: false,
                    protected: false,
                  },
                }}
              />
            );
          }
          
          return (
            <CodeViewer
              className={classNames({ 'fragment': isRoot })}
              code={children}
              language={language}
              lineNumbers={commands.lineNumbers}
              height={Number.isNaN(+(commands.height || '_')) ? commands.height : commands.height + 'px'}
            />
          );
        }
        
        return null;
      },
      table: ({ children }) => {
        return (
          <div style={{ overflowX: 'auto' }}>
            <table>
              {children as ReactNode}
            </table>
          </div>
        );
      },
      pre: ({ children }) => {
        return children;
      },
    },
  }), [ Link, setSearchParams ]);
  const [ blur, setBlur ] = useStableState(_blur);
  
  return (
    <div className="jk-md-math pn-re">
      {detectRequestAnimationFrame && <DetectRequestAnimationFrame name="MdMath" />}
      <ReactMarkdown {...mdProps} >
        {source}
      </ReactMarkdown>
      {_blur && (unBlur ? blur : true) && (
        <div className="jk-overlay-backdrop jk-br-ie jk-overlay" style={{ position: 'absolute', zIndex: 'unset' }} />
      )}
      {_blur && unBlur && (
        <div className="pn-ae jk-pg-sm" style={{ top: 0 }}>
          <Button
            size="small"
            onClick={() => setBlur(!blur)}
            icon={blur ? <VisibilityIcon /> : <VisibilityOffIcon />}
          />
        </div>
      )}
    </div>
  );
}

const MdMath = memo(MdMathComponent);

export default MdMath;
