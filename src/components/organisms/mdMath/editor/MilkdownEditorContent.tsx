import { LanguageDescription, LanguageSupport, StreamLanguage } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { oneDark } from '@codemirror/theme-one-dark';
import { EditorView } from '@codemirror/view';
import { CODE_LANGUAGE, CodeLanguage, ProfileSetting, Status, Theme } from '@juki-team/commons';
import { codeBlockConfig } from '@milkdown/components/code-block';
import { Crepe } from '@milkdown/crepe';
import { cursor } from '@milkdown/kit/plugin/cursor';
import { listener, listenerCtx } from '@milkdown/kit/plugin/listener';
import { trailing } from '@milkdown/kit/plugin/trailing';
import { upload, uploadConfig, Uploader } from '@milkdown/kit/plugin/upload';
import type { Node } from '@milkdown/kit/prose/model';
import { insert } from '@milkdown/kit/utils';
import { Milkdown, useEditor, useInstance } from '@milkdown/react';
import { getMarkdown } from '@milkdown/utils';
import { basicSetup } from '@uiw/react-codemirror';
import { Decoration } from 'prosemirror-view';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { classNames, downloadBlobAsFile, handleUploadImage } from '../../../../helpers';
import { useJukiNotification, useStableRef, useUserStore } from '../../../../hooks';
import { NewNotificationType, NotificationType } from '../../../../types';
import { T } from '../../../atoms';
import { DownloadIcon, LineLoader } from '../../../atoms/server';
import { FloatToolbar } from '../../../molecules';
import { ImageUploaderModal } from '../../ImageUploader/ImageUploaderModal';
// import '@milkdown/crepe/theme/common/style.css';
// import '@milkdown/crepe/theme/frame.css';

interface EditorProps {
  onChange?: (md: string) => void,
  value: string,
  setLoader: Dispatch<SetStateAction<Status>>,
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
    name: CodeLanguage.TEXT,
    alias: [ 'plaintext' ],
    extensions: [ 'txt', 'text' ],
    support: plainTextSupport,
  }),
];

const Editor = ({ value, onChange, setLoader }: EditorProps) => {
  
  const onChangeRef = useStableRef(onChange);
  const { addNotification } = useJukiNotification();
  const theme = useUserStore(store => store.user.settings[ProfileSetting.THEME]);
  
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
      .use(trailing)
      .use(cursor)
      .config((ctx) => {
        const listener = ctx.get(listenerCtx);
        
        listener.markdownUpdated((_, markdown, prevMarkdown) => {
          if (markdown !== prevMarkdown) {
            onChangeRef.current?.(markdown);
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
        }));
      });
  }, [ value, theme ]);
  
  return <Milkdown />;
};

const ImageUploader = () => {
  
  const [ isLoading, getInstance ] = useInstance();
  const [ openImageModal, setOpenImageModal ] = useState(false);
  
  return (
    <ImageUploaderModal
      isOpen={openImageModal}
      onClose={() => setOpenImageModal(false)}
      copyButtons
      onPickImageUrl={({ imageUrl }) => {
        if (isLoading) return;
        
        const editor = getInstance();
        if (!editor) return;
        
        editor.action(insert(`![image](${imageUrl})`));
        setOpenImageModal(false);
      }}
    />
  );
};

const DownloadToolbar = () => {
  
  const [ _, getInstance ] = useInstance();
  
  return (
    <FloatToolbar
      actionButtons={[ {
        icon: <DownloadIcon />,
        buttons: [
          // TODO:
          // {
          //   icon: <DownloadIcon />,
          //   label: <T>pdf</T>,
          //   onClick: handleShareMdPdf('pdf', source, sourceUrl, setSourceUrl, userTheme),
          // },
          {
            icon: <DownloadIcon />,
            label: <T>md</T>,
            onClick: () => downloadBlobAsFile(new Blob([ getInstance()?.action(getMarkdown()) ?? '' ], { type: 'text/plain' }), 'file.md'),
          },
        ],
      } ]}
      placement="rightTop"
    />
  );
};

interface MilkdownEditorContentProps extends Omit<EditorProps, 'setLoader'> {
  className?: string,
  downloadButton?: boolean,
}

export const MilkdownEditorContent = ({ value, onChange, className, downloadButton }: MilkdownEditorContentProps) => {
  
  const [ loader, setLoader ] = useState(Status.NONE);
  
  return (
    <div className={classNames('jk-milkdown-editor jk-md-math wh-100 pn-re', className)}>
      {loader === Status.LOADING && <LineLoader />}
      {loader === Status.LOADING && (
        <div className="jk-loader-layer pn-ae jk-col">
          <div className="jk-loader-layer pn-ae jk-overlay-backdrop" style={{ opacity: 0.8, zIndex: 1 }}></div>
          <div
            className="jk-row"
            style={{
              zIndex: 1,
              position: 'sticky',
              margin: '0 auto',
              top: 0,
              bottom: '50%',
              transform: 'translate(0, 100%)',
            }}
          >
            <div className="jk-row bc-we jk-pg-sm jk-br-ie" style={{ alignItems: 'baseline' }}>
              <T className="tt-se">uploading images</T> &nbsp;
              <div className="dot-flashing" />
            </div>
          </div>
        </div>
      )}
      {downloadButton && <DownloadToolbar />}
      <ImageUploader />
      <Editor value={value} onChange={onChange} setLoader={setLoader} />
    </div>
  );
};
