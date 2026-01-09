// https://medium.com/@MatDrinksTea/rendering-markdown-and-latex-in-react-dec355e74119
import { CODE_LANGUAGE, CodeLanguage, type  ContentResponseType, type UserBasicResponseDTO } from '@juki-team/commons';
import { type Element } from 'hast';
// import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import { Children, ComponentType, type CSSProperties, memo, type ReactNode, useMemo } from 'react';
import ReactMarkdown, { type Options as ReactMarkdownOptions } from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import RemarkGfmPlugin from 'remark-gfm';
import RemarkMathPlugin from 'remark-math';
import { QueryParamKey } from '../../../../enums';
import { jukiApiManager } from '../../../../settings';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
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
import { CodeRenderMode, CommandsObjectType, MdMathProps } from './types';
import { getCommands, hxRender, imgAlignStyle, textAlignStyle } from './utils';

// const schema = {
//   ...defaultSchema,
//   // Allow KaTeX/MathML and preserve classes/styles used by KaTeX CSS.
//   tagNames: Array.from(new Set([
//     ...(defaultSchema.tagNames ?? []),
//     'br',
//     // KaTeX HTML wrappers
//     'span',
//     'div',
//     // KaTeX MathML for accessibility
//     'math',
//     'semantics',
//     'mrow',
//     'mi',
//     'mo',
//     'mn',
//     'ms',
//     'mtext',
//     'annotation',
//     'annotation-xml',
//   ])),
//   attributes: {
//     ...(defaultSchema.attributes ?? {}),
//     span: [
//       ...(((defaultSchema.attributes)?.span ?? []) as []),
//       'className',
//       'style',
//     ],
//     div: [
//       ...(((defaultSchema.attributes)?.div ?? []) as []),
//       'className',
//       'style',
//     ],
//     math: [
//       ...(((defaultSchema.attributes)?.math ?? []) as []),
//       'xmlns',
//     ],
//     annotation: [
//       ...(((defaultSchema.attributes)?.annotation ?? []) as []),
//       'encoding',
//     ],
//     'annotation-xml': [
//       ...(((defaultSchema.attributes)?.['annotation-xml'] ?? []) as []),
//       'encoding',
//     ],
//   },
//   properties: {
//     code: [ 'meta' ],
//   },
//   allowAttributes: {
//     code: [ 'data-meta' ],
//   },
// };

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
  
  const companyKey = useUserStore(store => store.company.key);
  const {
    isLoading,
    data,
  } = useFetcher<ContentResponseType<UserBasicResponseDTO>>(jukiApiManager.API_V2.user.getSummary({
    params: {
      nickname,
      companyKey,
    },
  }).url);
  
  if (isLoading) {
    return <SpinIcon size="tiny" />;
  }
  
  if (!data?.success) {
    return <ErrorIcon />;
  }
  
  return (
    <UserChip
      nickname={nickname}
      companyKey={companyKey}
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
    // Important order:
    // - rehype-raw: parse raw HTML in markdown into the AST
    // - rehype-katex: render math into HTML/MathML
    // - rehype-sanitize: sanitize the final tree (with KaTeX-safe schema)
    rehypePlugins: [ rehypeRaw, rehypeKatex ],
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
      h1: hx(setSearchParams, slideView) as ComponentType,
      h2: hx(setSearchParams, slideView) as ComponentType,
      h3: hx(setSearchParams, slideView) as ComponentType,
      h4: hx(setSearchParams, slideView) as ComponentType,
      h5: hx(setSearchParams, slideView) as ComponentType,
      h6: hx(setSearchParams, slideView) as ComponentType,
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
          const style = { outline: '2px solid var(--cr-gy-6)', border: 'none', height: '100%' };
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
      script: () => null,
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
        const [ language, flag ] = ((commands.lang
          || commands.rest
          || newClassName
          || CodeLanguage.TEXT)).split('/') as [ CodeLanguage, CodeRenderMode ];
        
        if (typeof children === 'string') {
          if (language === CodeLanguage.DOT && flag === CodeRenderMode.IMAGE) {
            return (
              <GraphvizViewers
                dot={children}
                className={classNames({ 'fragment': isRoot })}
                viewSourceButton={!slideView}
              />
            );
          }
          
          if (flag === CodeRenderMode.EDITOR) {
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
            <div className="jk-pg-sm bc-we-lt jk-br-ie">
              <CodeViewer
                className={classNames({ 'fragment': isRoot })}
                code={children}
                language={language}
                lineNumbers={commands.lineNumbers}
                height={Number.isNaN(+(commands.height || '_')) ? commands.height : commands.height + 'px'}
              />
            </div>
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
  }), [ Link, setSearchParams, slideView ]);
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
