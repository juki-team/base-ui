import { LanguageDescription, LanguageSupport, StreamLanguage } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { stex } from '@codemirror/legacy-modes/mode/stex';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { CODE_LANGUAGE, CodeLanguage, NotificationType, ProfileSetting, Status, Theme } from '@juki-team/commons';
import { codeBlockConfig } from '@milkdown/components/code-block';
import { editorViewCtx } from '@milkdown/core';
import { Crepe } from '@milkdown/crepe';
import { parserCtx, prosePluginsCtx, remarkStringifyOptionsCtx, schemaCtx, serializerCtx } from '@milkdown/kit/core';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { trailing, trailingConfig } from '@milkdown/kit/plugin/trailing';
import { upload, uploadConfig, Uploader } from '@milkdown/kit/plugin/upload';
import type { Node } from '@milkdown/kit/prose/model';
import { EditorState, Plugin, PluginKey, Transaction } from '@milkdown/kit/prose/state';
import { Milkdown, useEditor } from '@milkdown/react';
import * as Viz from '@viz-js/viz';
import { TFunction } from 'i18next';
import katex from 'katex';
import mermaid from 'mermaid';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Dispatch, forwardRef, SetStateAction, useImperativeHandle, useMemo, useRef } from 'react';
import { v4 } from 'uuid';
import { useI18nStore } from '../../../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../../../stores/user/useUserStore';
import { T } from '../../../../atoms';
import { handleUploadImage } from '../../../../helpers';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { useStableRef } from '../../../../hooks/useStableRef';
// import { basicSetup } from '@uiw/react-codemirror';
import { basicSetup } from '../../../../molecules/_lazy_/CodeEditor/codemirror/extensions/basic-setup';
import type { NewNotificationType } from '../../../CardNotification/types';
import { CodeRenderMode } from '../../MdMath/types';

type HighlightMeta = { ranges: { from: number; to: number }[]; className: string } | { clear: true };

// ProseMirror plugin that manages node-level highlight decorations.
// Lives at module scope so its key is stable across renders.
const highlightPluginKey = new PluginKey<DecorationSet>('nodeHighlight');

const highlightPlugin = new Plugin<DecorationSet>({
  key: highlightPluginKey,
  state: {
    init: () => DecorationSet.empty,
    apply(tr: Transaction, decorations: DecorationSet) {
      const meta = tr.getMeta(highlightPluginKey) as HighlightMeta | undefined;
      if (meta) {
        if ('clear' in meta) return DecorationSet.empty;
        const decos = meta.ranges.map(({ from, to }) => Decoration.node(from, to, { class: meta.className }));
        return DecorationSet.create(tr.doc, decos);
      }
      return decorations.map(tr.mapping, tr.doc);
    },
  },
  props: {
    decorations: (state: EditorState) => highlightPluginKey.getState(state),
  },
});

export interface MilkdownEditorContentHandle {
  getSelectionMarkdown: () => string;
  replaceSelectionWithMarkdown: (md: string) => void;
  highlightSelectionNodes: (className: string) => void;
  clearHighlight: () => void;
}

interface MilkdownEditorContentProps {
  onChange?: (md: string) => void;
  value: string;
  setLoader: Dispatch<SetStateAction<Status>>;
  enableImageUpload: boolean;
}

export const defaultLightThemeOption = EditorView.theme(
  {
    '&': {
      backgroundColor: '#fff',
    },
  },
  {
    dark: false,
  },
);

const uploader =
  (setLoader: Dispatch<SetStateAction<Status>>, addNotification: (props: NewNotificationType) => void): Uploader =>
  async (files, schema) => {
    const images: File[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (!file) {
        continue;
      }

      // You can handle whatever the file type you want, we handle image here.
      if (!file.type.includes('image/')) {
        continue;
      }

      images.push(file);
    }
    setLoader(Status.LOADING);
    const nodes: Node[] = await Promise.all(
      images.map(async (image) => {
        const { status, message, content } = await handleUploadImage(image, false);
        if (status === Status.SUCCESS && schema?.nodes?.image) {
          addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
          return schema.nodes.image.createAndFill({ src: content!.imageUrl, alt: image.name }) as Node;
        }
        addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
        return null as unknown as Node;
      }),
    );
    setLoader(Status.SUCCESS);
    return nodes;
  };

const plainText = StreamLanguage.define({
  token(stream) {
    stream.skipToEnd();
    return null;
  },
});

const plainTextSupport = new LanguageSupport(plainText);

console.log({ languages });
const myLanguages = [
  // ...languages,
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C'),
    name: CodeLanguage.C.toLowerCase(),
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C'),
    name: CodeLanguage.C.toLowerCase() + `/${CodeRenderMode.EDITOR}`,
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C++'),
    name: CodeLanguage.CPP.toLowerCase(),
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C++'),
    name: CodeLanguage.CPP.toLowerCase() + `/${CodeRenderMode.EDITOR}`,
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Java'),
    name: CodeLanguage.JAVA.toLowerCase(),
    load: () => import('@codemirror/lang-java').then((m) => m.java()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Java'),
    name: CodeLanguage.JAVA.toLowerCase() + `/${CodeRenderMode.EDITOR}`,
    load: () => import('@codemirror/lang-java').then((m) => m.java()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Python'),
    name: CodeLanguage.PYTHON.toLowerCase(),
    load: () => import('@codemirror/lang-python').then((m) => m.python()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Python'),
    name: CodeLanguage.PYTHON.toLowerCase() + `/${CodeRenderMode.EDITOR}`,
    load: () => import('@codemirror/lang-python').then((m) => m.python()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JavaScript'),
    name: CodeLanguage.JAVASCRIPT.toLowerCase(),
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JavaScript'),
    name: CodeLanguage.JAVASCRIPT.toLowerCase() + `/${CodeRenderMode.EDITOR}`,
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'TypeScript'),
    name: CodeLanguage.TYPESCRIPT.toLowerCase(),
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript({ typescript: true })),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JSX'),
    name: CodeLanguage.JSX.toLowerCase(),
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript({ jsx: true })),
  }),
  LanguageDescription.of({
    name: CodeLanguage.MDX.toLowerCase(),
    alias: ['mdx'],
    extensions: ['mdx'],
    load: () =>
      Promise.all([import('@codemirror/lang-markdown'), import('@codemirror/lang-javascript')]).then(
        ([{ markdown }, { javascript }]) =>
          markdown({
            codeLanguages: [LanguageDescription.of({ name: 'javascript', load: async () => javascript({ jsx: true }) })],
          }),
      ),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'TSX'),
    name: CodeLanguage.TSX.toLowerCase(),
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript({ typescript: true, jsx: true })),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'HTML'),
    name: CodeLanguage.HTML.toLowerCase(),
    load: () => import('@codemirror/lang-html').then((m) => m.html()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JSON'),
    name: CodeLanguage.JSON.toLowerCase(),
    load: () => import('@codemirror/lang-json').then((m) => m.json()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Markdown'),
    name: CodeLanguage.MARKDOWN.toLowerCase(),
    load: () => import('@codemirror/lang-markdown').then((m) => m.markdown()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'LaTeX'),
    name: CodeLanguage.LATEX.toLowerCase(),
    support: new LanguageSupport(StreamLanguage.define(stex)),
  }),
  // LanguageDescription.of({
  //   name: CodeLanguage.MERMAID,
  //   alias: [ 'mermaid' ],
  //   extensions: [ 'mmd', 'mermaid' ],
  //   support: plainTextSupport,
  // }),
  // LanguageDescription.of({
  //   name: CodeLanguage.MERMAID + ' asImage',
  //   alias: [ 'mermaid' ],
  //   extensions: [ 'mmd', 'mermaid' ],
  //   support: plainTextSupport,
  // }),
  LanguageDescription.of({
    name: CodeLanguage.DOT.toLowerCase(),
    alias: ['dot'],
    extensions: ['dot'],
    load: () => import('@viz-js/lang-dot').then((m) => m.dot()),
  }),
  LanguageDescription.of({
    name: CodeLanguage.DOT.toLowerCase() + `/${CodeRenderMode.IMAGE}`,
    alias: ['dot'],
    extensions: ['dot'],
    load: () => import('@viz-js/lang-dot').then((m) => m.dot()),
  }),
  LanguageDescription.of({
    name: CodeLanguage.MERMAID.toLowerCase(),
    alias: ['mmd'],
    extensions: ['mmd'],
    load: () => import('codemirror-lang-mermaid').then((m) => m.mermaid()),
  }),
  LanguageDescription.of({
    name: CodeLanguage.MERMAID.toLowerCase() + `/${CodeRenderMode.IMAGE}`,
    alias: ['mmd'],
    extensions: ['mmd'],
    load: () => import('codemirror-lang-mermaid').then((m) => m.mermaid()),
  }),
  LanguageDescription.of({
    name: CodeLanguage.BASH.toLowerCase(),
    alias: ['bash', 'sh', 'shell'],
    extensions: ['sh', 'bash'],
    load: () => import('@codemirror/legacy-modes/mode/shell').then((m) => new LanguageSupport(StreamLanguage.define(m.shell))),
  }),
  LanguageDescription.of({
    name: CodeLanguage.TEXT.toLowerCase(),
    alias: ['plaintext'],
    extensions: ['txt', 'text'],
    support: plainTextSupport,
  }),
];

function renderLatex(content: string) {
  return katex.renderToString(content, {
    throwOnError: false,
    displayMode: true,
  });
}

function renderMermaid(content: string): HTMLElement {
  if (typeof document !== 'undefined') {
    const container = document.createElement('div');
    container.className = 'mermaid';
    container.innerHTML = content;

    setTimeout(() => mermaid.run({ querySelector: '.mermaid' }), 0);

    return container;
  }
  return null as unknown as HTMLElement;
}

function renderDot(content: string, t: TFunction): HTMLElement {
  if (typeof document !== 'undefined') {
    const container = document.createElement('div');
    const newId = v4();
    container.id = newId;

    const loader = document.createElement('div');
    loader.textContent = t('loading graph');
    loader.style.fontStyle = 'italic';
    container.appendChild(loader);

    Viz.instance()
      .then((viz) => {
        try {
          const container = document.getElementById(newId);
          if (container) {
            container.innerHTML = '';
            content.split('---').map((content) => {
              const svg = viz.renderSVGElement(content, {});
              container.appendChild(svg);
            });
          }
        } catch (error) {
          const container = document.getElementById(newId);
          if (container) {
            container.innerHTML = '';
            const errorDiv = document.createElement('div');
            errorDiv.textContent = `${t('error rendering graph')}: ${(error as Error)?.message || error}`;
            errorDiv.style.color = 'red';
            errorDiv.style.whiteSpace = 'pre-wrap';
            container.appendChild(errorDiv);
          }
        }
      })
      .catch((error) => {
        const container = document.getElementById(newId);
        if (container) {
          container.innerHTML = '';
          const errorDiv = document.createElement('div');
          errorDiv.textContent = `${t('error initializing Viz.js')}: ${error?.message || error}`;
          errorDiv.style.color = 'red';
          container.appendChild(errorDiv);
        }
      });

    return container;
  }

  return null as unknown as HTMLElement;
}

function normalizeNewlines(text: string): string {
  let normalized = text.replace(/\n{3,}/g, '\n\n');
  normalized = normalized.replace(/&#x20;/gi, ' ');
  return normalized.replace(/\n+$/g, '') + '\n';
}

export const MilkdownEditorContent = forwardRef<MilkdownEditorContentHandle, MilkdownEditorContentProps>(
  function MilkdownEditorContent({ value, onChange, setLoader }, ref) {
    const onChangeRef = useStableRef(onChange);
    const { addNotification } = useJukiNotification();
    const theme = useUserStore((store) => store.user.settings[ProfileSetting.THEME]);
    const currentMd = useRef(value);
    const triggerRender = useMemo(() => (value === currentMd.current ? 0 : Date.now()), [value]);
    const t = useI18nStore((store) => store.i18n.t);

    const { get: getEditor } = useEditor(
      (root) => {
        return new Crepe({
          root,
          defaultValue: value,
          // defaultValue: value
          //   .replace(/```C asCodeEditor/g, '```C&#x20;asCodeEditor')
          //   .replace(/```CPP asCodeEditor/g, '```CPP&#x20;asCodeEditor')
          //   .replace(/```JAVA asCodeEditor/g, '```JAVA&#x20;asCodeEditor')
          //   .replace(/```PYTHON asCodeEditor/g, '```PYTHON&#x20;asCodeEditor')
          //   .replace(/```JAVASCRIPT asCodeEditor/g, '```JAVASCRIPT&#x20;asCodeEditor')
          //   // .replace(/```MERMAID asImage/g, '```MERMAID&#x20;asImage')
          //   .replace(/```DOT asImage/g, '```DOT&#x20;asImage'),
          featureConfigs: {
            [Crepe.Feature.BlockEdit]: {
              blockHandle: {
                floatingUIOptions: { strategy: 'fixed' as const },
              },
            },
            [Crepe.Feature.CodeMirror]: {
              renderLanguage(lang, selected) {
                const [language, as] = lang.split('/');
                return (
                  (selected ? '✔ ' : '') +
                  (CODE_LANGUAGE[language!.toUpperCase() as CodeLanguage]?.label ?? language) +
                  t(
                    as === CodeRenderMode.EDITOR
                      ? ' (render as code editor)'
                      : as === CodeRenderMode.IMAGE
                        ? ' (render as image)'
                        : '',
                  )
                );
              },
              searchPlaceholder: 'Find a language...',
              noResultText: 'No language found',
            },
            [Crepe.Feature.ImageBlock]: {
              async onUpload(file: File) {
                setLoader(Status.LOADING);
                const { status, message, content } = await handleUploadImage(file, false);
                if (status === Status.SUCCESS) {
                  addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
                  setLoader(Status.SUCCESS);
                  return content!.imageUrl;
                } else {
                  addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
                  setLoader(Status.ERROR);
                  return '';
                }
              },
              inlineUploadPlaceholderText: '???',
            },
          },
        }).editor
          .use(listener)
          .use(upload)
          .use(cursor)
          .use(trailing)
          .config((ctx) => {
            const listener = ctx.get(listenerCtx);
            listener.markdownUpdated((_, markdown, prevMarkdown) => {
              const fixedMarkdown = normalizeNewlines(markdown);
              if (fixedMarkdown !== normalizeNewlines(prevMarkdown)) {
                onChangeRef.current?.(fixedMarkdown);
                currentMd.current = fixedMarkdown;
              }
            });
            ctx.update(uploadConfig.key, (prev) => ({
              ...prev,
              uploader: uploader(setLoader, addNotification),
              uploadWidgetFactory: (pos, spec) => {
                const dom = document.createElement('span');
                return Decoration.widget(pos, dom, spec);
              },
            }));
            ctx.update(codeBlockConfig.key, (defaultConfig) => ({
              ...defaultConfig,
              languages: myLanguages,
              extensions: [basicSetup(), ...(theme === Theme.DARK ? [oneDark] : [defaultLightThemeOption])],
              previewToggleButton: () => 'edit',
              renderPreview: (lang, content) => {
                const [language, as] = lang.split('/');
                if (language?.toLowerCase() === 'latex' && content.length > 0) {
                  return renderLatex(content /*config == null ? void 0 : ctx.katexOptions*/);
                }
                if (language?.toLowerCase() === 'mermaid' && as === CodeRenderMode.IMAGE && content.length > 0) {
                  return renderMermaid(content);
                }
                if (as === CodeRenderMode.IMAGE && content.length > 0) {
                  return renderDot(content, t);
                }
                return null;
              },
            }));
            ctx.set(remarkStringifyOptionsCtx, {
              bullet: '-',
              rule: '-',
              // fences: true,
              // incrementListMarker: false,
            });
            ctx.update(trailingConfig.key, (prev) => ({
              ...prev,
              shouldAppend: () => false,
            }));
            ctx.update(prosePluginsCtx, (plugins) => [...plugins, highlightPlugin]);
          });
      },
      [triggerRender, theme, t],
    );

    useImperativeHandle(
      ref,
      () => ({
        getSelectionMarkdown: () => {
          const editor = getEditor();
          if (!editor) return '';
          return (
            editor.action((ctx) => {
              const view = ctx.get(editorViewCtx);
              const serializer = ctx.get(serializerCtx);
              const schema = ctx.get(schemaCtx);
              const { from, to, empty } = view.state.selection;
              if (empty) {
                return '';
              }
              // Expand the selection to the full containing block node(s).
              // depth=1 are the direct children of doc (paragraphs, headings, etc.).
              const $from = view.state.doc.resolve(from);
              const $to = view.state.doc.resolve(to);
              const blockStart = $from.depth >= 1 ? $from.before(1) : 0;
              const blockEnd = $to.depth >= 1 ? $to.after(1) : view.state.doc.content.size;
              const slice = view.state.doc.slice(blockStart, blockEnd);
              const tempDoc = schema.node('doc', null, slice.content);
              return serializer(tempDoc);
            }) ?? ''
          );
        },
        replaceSelectionWithMarkdown: (md: string) => {
          const editor = getEditor();
          if (!editor) {
            return;
          }
          editor.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const parser = ctx.get(parserCtx);
            const { from, to } = view.state.selection;
            const $from = view.state.doc.resolve(from);
            const $to = view.state.doc.resolve(to);
            const blockStart = $from.depth >= 1 ? $from.before(1) : 0;
            const blockEnd = $to.depth >= 1 ? $to.after(1) : view.state.doc.content.size;
            const newDoc = parser(md);
            view.dispatch(view.state.tr.replaceWith(blockStart, blockEnd, newDoc.content));
          });
        },
        highlightSelectionNodes: (className: string) => {
          const editor = getEditor();
          if (!editor) return;
          editor.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const { from, to, empty } = view.state.selection;
            if (empty) {
              return;
            }
            const $from = view.state.doc.resolve(from);
            const $to = view.state.doc.resolve(to);
            const blockStart = $from.depth >= 1 ? $from.before(1) : 0;
            const blockEnd = $to.depth >= 1 ? $to.after(1) : view.state.doc.content.size;
            const ranges: { from: number; to: number }[] = [];
            view.state.doc.nodesBetween(blockStart, blockEnd, (node, pos, parent) => {
              if (parent === view.state.doc) {
                ranges.push({ from: pos, to: pos + node.nodeSize });
                return false;
              }
              return true;
            });
            const meta: HighlightMeta = { ranges, className };
            view.dispatch(view.state.tr.setMeta(highlightPluginKey, meta));
          });
        },
        clearHighlight: () => {
          const editor = getEditor();
          if (!editor) return;
          editor.action((ctx) => {
            const view = ctx.get(editorViewCtx);
            const meta: HighlightMeta = { clear: true };
            view.dispatch(view.state.tr.setMeta(highlightPluginKey, meta));
          });
        },
      }),
      [getEditor],
    );

    return (
      <div className="jk-md-math-milkdown-editor jk-md-math wh-100 pn-re jk-br-ie">
        <Milkdown />
      </div>
    );
  },
);
