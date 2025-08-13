import { LanguageDescription, LanguageSupport, StreamLanguage } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { stex } from '@codemirror/legacy-modes/mode/stex';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { CODE_LANGUAGE, CodeLanguage, ProfileSetting, Status, Theme } from '@juki-team/commons';
import { codeBlockConfig } from '@milkdown/components/code-block';
import { Crepe } from '@milkdown/crepe';
import { remarkStringifyOptionsCtx } from '@milkdown/kit/core';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { upload, uploadConfig, Uploader } from '@milkdown/kit/plugin/upload';
import type { Node } from '@milkdown/kit/prose/model';
import { Milkdown, useEditor } from '@milkdown/react';
import { basicSetup } from '@uiw/react-codemirror';
import * as Viz from '@viz-js/viz';
import { TFunction } from 'i18next';
import katex from 'katex';
import mermaid from 'mermaid';
import { Decoration } from 'prosemirror-view';
import React, { Dispatch, SetStateAction, useMemo, useRef } from 'react';
import { v4 } from 'uuid';
import { handleUploadImage } from '../../../../helpers';
import { useI18nStore, useJukiNotification, useStableRef, useUserStore } from '../../../../hooks';
import { NewNotificationType, NotificationType } from '../../../../types';
import { T } from '../../../atoms';

// import '@milkdown/crepe/theme/common/style.css';
// import '@milkdown/crepe/theme/frame.css';

interface MilkdownEditorContentProps {
  onChange?: (md: string) => void,
  value: string,
  setLoader: Dispatch<SetStateAction<Status>>,
  enableImageUpload: boolean,
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
      const nodes: Node[] = (await Promise.all(
        images.map(async (image) => {
          const { status, message, content } = await handleUploadImage(image, false);
          if (status === Status.SUCCESS) {
            addNotification({ type: NotificationType.SUCCESS, message: <T>{message}</T> });
            const alt = image.name;
            return schema.nodes.image.createAndFill({ src: content!.imageUrl, alt }) as Node;
          } else {
            addNotification({ type: NotificationType.ERROR, message: <T>{message}</T> });
            return null as unknown as Node;
          }
        }),
      ));
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

const myLanguages = [
  // ...languages,
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C'),
    name: CodeLanguage.C,
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'C++'),
    name: CodeLanguage.CPP,
    load: () => import('@codemirror/lang-cpp').then((m) => m.cpp()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Java'),
    name: CodeLanguage.JAVA,
    load: () => import('@codemirror/lang-java').then((m) => m.java()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Python'),
    name: CodeLanguage.PYTHON,
    load: () => import('@codemirror/lang-python').then((m) => m.python()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JavaScript'),
    name: CodeLanguage.JAVASCRIPT,
    load: () => import('@codemirror/lang-javascript').then((m) => m.javascript()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'HTML'),
    name: CodeLanguage.HTML,
    load: () => import('@codemirror/lang-html').then((m) => m.html()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'JSON'),
    name: CodeLanguage.JSON,
    load: () => import('@codemirror/lang-json').then((m) => m.json()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'Markdown'),
    name: CodeLanguage.MARKDOWN,
    load: () => import('@codemirror/lang-markdown').then((m) => m.markdown()),
  }),
  LanguageDescription.of({
    ...languages.find((language) => language.name === 'LaTeX'),
    name: CodeLanguage.LATEX,
    support: new LanguageSupport(StreamLanguage.define(stex)),
  }),
  LanguageDescription.of({
    name: CodeLanguage.MERMAID,
    alias: [ 'mermaid' ],
    extensions: [ 'mmd', 'mermaid' ],
    support: plainTextSupport,
  }),
  LanguageDescription.of({
    name: CodeLanguage.DOT,
    alias: [ 'dot' ],
    extensions: [ 'dot' ],
    load: () => import('@viz-js/lang-dot').then((m) => m.dot()),
  }),
  LanguageDescription.of({
    name: CodeLanguage.TEXT,
    alias: [ 'plaintext' ],
    extensions: [ 'txt', 'text' ],
    support: plainTextSupport,
  }),
];

function renderLatex(content: string, options: {}) {
  const html = katex.renderToString(content, {
    ...options,
    throwOnError: false,
    displayMode: true,
  });
  return html;
}

function renderMermaid(content: string): HTMLElement {
  const container = document.createElement('div');
  container.className = 'mermaid';
  container.innerHTML = content;
  
  setTimeout(() => mermaid.run({ querySelector: '.mermaid' }), 0);
  
  return container;
}

function renderDot(content: string, t: TFunction): HTMLElement {
  
  const container = document.createElement('div');
  const newId = v4();
  container.id = newId;
  
  const loader = document.createElement('div');
  loader.textContent = t('loading graph');
  loader.style.fontStyle = 'italic';
  container.appendChild(loader);
  
  Viz
    .instance()
    .then(viz => {
      try {
        const svg = viz.renderSVGElement(content, {});
        const container = document.getElementById(newId);
        if (container) {
          container.innerHTML = '';
          container.appendChild(svg);
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
    .catch(error => {
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

function normalizeNewlines(text: string): string {
  const normalized = text.replace(/\n{3,}/g, '\n\n');
  return normalized.replace(/\n+$/g, '') + '\n';
}

export const MilkdownEditorContent = ({ value, onChange, setLoader }: MilkdownEditorContentProps) => {
  
  const onChangeRef = useStableRef(onChange);
  const { addNotification } = useJukiNotification();
  const theme = useUserStore(store => store.user.settings[ProfileSetting.THEME]);
  const currentMd = useRef(value);
  const triggerRender = useMemo(() => value === currentMd.current ? 0 : Date.now(), [ value ]);
  const t = useI18nStore(store => store.i18n.t);
  
  useEditor((root) => {
    return new Crepe({
      root,
      defaultValue: value,
      featureConfigs: {
        [Crepe.Feature.CodeMirror]: {
          renderLanguage(language) {
            return CODE_LANGUAGE[language as CodeLanguage]?.label ?? language;
          },
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
      .config((ctx) => {
        const listener = ctx.get(listenerCtx);
        listener.markdownUpdated((_, markdown, prevMarkdown) => {
          const fixedMarkdown = normalizeNewlines(markdown);
          if (fixedMarkdown !== normalizeNewlines(prevMarkdown)) {
            onChangeRef.current?.(markdown);
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
          extensions: [
            basicSetup(),
            ...(theme === Theme.DARK ? [ oneDark ] : [ defaultLightThemeOption ]),
          ],
          previewToggleButton: () => 'edit',
          renderPreview: (language, content) => {
            if (language.toLowerCase() === 'latex' && content.length > 0) {
              return renderLatex(content, {}/*config == null ? void 0 : ctx.katexOptions*/);
            }
            if (language.toLowerCase() === 'mermaid' && content.length > 0) {
              return renderMermaid(content);
            }
            if (language.toLowerCase() === 'dot' && content.length > 0) {
              return renderDot(content, t);
            }
            return null;
          },
        }));
        ctx.set(remarkStringifyOptionsCtx, {
          bullet: '-',
          // fences: true,
          // incrementListMarker: false,
        });
        
      });
  }, [ triggerRender, theme ]);
  
  return (
    <div className="jk-input-milkdown jk-md-math-milkdown-editor jk-md-math wh-100 pn-re jk-br-ie">
      <Milkdown />
    </div>
  );
};
