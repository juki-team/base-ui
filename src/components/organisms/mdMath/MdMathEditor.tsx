import { CODE_LANGUAGE, CodeLanguage, Status } from '@juki-team/commons';
import Blockquote from '@tiptap/extension-blockquote';
import Bold from '@tiptap/extension-bold';
import BulletList from '@tiptap/extension-bullet-list';
import Code from '@tiptap/extension-code';
import CodeBlock from '@tiptap/extension-code-block';
import Document from '@tiptap/extension-document'; // The Document extension is required, no matter what you build with Tiptap.
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import Heading from '@tiptap/extension-heading';
import Highlight from '@tiptap/extension-highlight';
import History from '@tiptap/extension-history';
import Image from '@tiptap/extension-image';
import Italic from '@tiptap/extension-italic';
import ListItem from '@tiptap/extension-list-item';
import { Mathematics } from '@tiptap/extension-mathematics';
// import 'katex/dist/katex.min.css';
import OrderedList from '@tiptap/extension-ordered-list';
import Paragraph from '@tiptap/extension-paragraph';
import Strike from '@tiptap/extension-strike';
import Text from '@tiptap/extension-text';
import { BubbleMenu, FloatingMenu, useEditor } from '@tiptap/react';
import c from 'highlight.js/lib/languages/c';
import cpp from 'highlight.js/lib/languages/cpp';
import java from 'highlight.js/lib/languages/java';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import markdown from 'highlight.js/lib/languages/markdown';
import python from 'highlight.js/lib/languages/python';
import html from 'highlight.js/lib/languages/xml';
import { all, createLowlight } from 'lowlight';
import React, { CSSProperties, memo, useCallback, useEffect, useRef, useState } from 'react';
import { Markdown } from 'tiptap-markdown';
import { classNames, downloadBlobAsFile } from '../../../helpers';
import { useJukiNotification } from '../../../hooks';
import { NotificationType } from '../../../types';
import { Button, T } from '../../atoms';
import {
  AddPhotoAlternateIcon,
  CodeBlocksIcon,
  CodeIcon,
  DownloadIcon,
  FormatBoldIcon,
  FormatH1Icon,
  FormatH2Icon,
  FormatH3Icon,
  FormatH4Icon,
  FormatH5Icon,
  FormatH6Icon,
  FormatItalicIcon,
  FormatListBulletedIcon,
  FormatListNumberedIcon,
  LineLoader,
  LinkIcon,
  MoreVertIcon,
  OpenInNewIcon,
  SpinIcon,
  StepIntoIcon,
  StepOutIcon,
} from '../../atoms/server';
import { FormatInkHighlighterIcon } from '../../atoms/server/icons/google/FormatInkHighlighterIcon';
import { FormatQuoteIcon } from '../../atoms/server/icons/google/FormatQuoteIcon';
import { FormatStrikethroughIcon } from '../../atoms/server/icons/google/FormatStrikethroughIcon';
import { LinkOffIcon } from '../../atoms/server/icons/google/LinkOffIcon';
import { FloatToolbar } from '../../molecules';
import { ImageUploaderModal } from '../ImageUploader/ImageUploaderModal';
import { TiptapEditorContent } from './editor';
import {
  CurrentNodeHighlighter,
  CustomCodeBlockLowlight,
  CustomLink,
  markdownIt,
  SmartHeadingBackspace,
  SmartPasteMarkdown,
} from './extensions';
import { MdMathEditorProps } from './types';

const lowlight = createLowlight(all);

lowlight.register('c', c);
lowlight.register('cpp', cpp);
lowlight.register('java', java);
lowlight.register('python', python);
lowlight.register('javascript', javascript);
lowlight.register('html', html);
lowlight.register('json', json);
lowlight.register('markdown', markdown);

const CODE_LANGUAGES = [
  CodeLanguage.C,
  CodeLanguage.CPP,
  CodeLanguage.JAVA,
  CodeLanguage.PYTHON,
  CodeLanguage.JAVASCRIPT,
  CodeLanguage.HTML,
  CodeLanguage.JSON,
  CodeLanguage.MARKDOWN,
  CodeLanguage.TEXT,
];

export const MdMathEditor = memo(({
                                    md,
                                    initialMd = '',
                                    onChange,
                                    className,
                                    downloadButton,
                                  }: MdMathEditorProps) => {
  
  const [ position, setPosition ] = useState<{ height: number, top: number }>({ height: 0, top: 0 });
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [ open, setOpen ] = useState(false);
  const [ openImageModal, setOpenImageModal ] = useState(false);
  const [ loader, setLoader ] = useState(Status.NONE);
  const { addNotification } = useJukiNotification();
  const editor = useEditor({
    extensions: [
      Document,
      Gapcursor,
      Markdown,
      SmartPasteMarkdown.configure({
        addNotification: ({ type, message }: { type: NotificationType, message: string }) => {
          addNotification({ type, message: <T>{message}</T> });
        },
        setLoader,
      }),
      CurrentNodeHighlighter,
      //
      Paragraph,
      Text,
      Blockquote,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      CustomCodeBlockLowlight.configure({
        lowlight,
      }),
      // CustomHeading,
      Heading, SmartHeadingBackspace,
      Image,
      Dropcursor,
      Mathematics,
      History,
      // Marks
      Italic,
      Bold,
      Highlight,
      Strike,
      Code.configure({
        HTMLAttributes: {
          class: 'inline-code cr-th bc-hl jk-br-ie ws-np',
        },
      }),
      // Link,
      CustomLink,
      // Underline,
    ],
    // shouldRerenderOnTransaction: false,
    // immediatelyRender: true,
    content: '',
    injectCSS: false,
    //
    onUpdate({ editor }) {
      const textMd = editor?.storage.markdown.getMarkdown() as string ?? '';
      onChange?.(textMd);
    },
    onSelectionUpdate({ editor }) {
      const el = editorRef.current?.querySelector('.current-node-highlight') as HTMLElement
        || editorRef.current?.querySelector('img.ProseMirror-selectednode')
        || null;
      // const height = el?.offsetHeight ?? 0;
      // if (height !== position.height) {
      // setPosition(prevState => ({ ...prevState, height }));
      // }
      if (el && editorRef.current) {
        const elRect = el.getBoundingClientRect();
        const parentRect = editorRef.current.getBoundingClientRect();
        const top = elRect.top - parentRect.top;
        if (top !== position.top) {
          setPosition(prevState => ({ ...prevState, top }));
          setOpen(false);
        }
      }
    },
  });
  
  useEffect(() => {
    if (editor && initialMd) {
      const html = markdownIt.render(initialMd);
      editor.commands.setContent(html);
    }
  }, [ editor ]);
  
  useEffect(() => {
    if (editor && typeof md === 'string') {
      const html = markdownIt.render(md);
      editor.commands.setContent(html);
    }
  }, [ editor, md ]);
  
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);
    
    if (url === null) {
      return;
    }
    
    if (url === '') {
      editor?.chain().focus().extendMarkRange('link').unsetLink()
        .run();
      
      return;
    }
    
    try {
      editor?.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run();
    } catch (e: any) {
      alert(e?.message);
    }
  }, [ editor ]);
  
  return (
    <div
      ref={editorRef}
      className={classNames('jk-row pn-re', className)}
      style={{
        '--cursor-coordinate-y': `${position.top}px`,
        '--selected-node-height': `${position.height}px`,
      } as CSSProperties}
    >
      {loader === Status.LOADING && <LineLoader />}
      {editor ? <TiptapEditorContent editor={editor} readOnly={loader === Status.LOADING} /> : <SpinIcon />}
      {editor && (
        <>
          {downloadButton && (
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
                    icon: <OpenInNewIcon />,
                    label: <T>md</T>,
                    onClick: () => downloadBlobAsFile(new Blob([ editor.storage.markdown.getMarkdown() as string ?? '' ], { type: 'text/plain' }), 'file.md'),
                  },
                ],
              } ]} placement="rightTop"
            />
          )}
          <ImageUploaderModal
            isOpen={openImageModal}
            onClose={() => setOpenImageModal(false)}
            copyButtons
            onPickImageUrl={({ imageUrl }) => {
              editor?.chain().focus().setImage({ src: imageUrl }).run();
              setOpenImageModal(false);
            }}
          />
          <div className={classNames('jk-md-math-left-menu', { open })}>
            <div className="jk-col" onMouseDown={(event) => event.preventDefault()}>
              <div className="content jk-row gap nowrap left jk-pg-xsm bc-we jk-br-ie">
                {editor.isFocused && editor.isActive('codeBlock') ? (
                  <>
                    <div className="jk-row group jk-br-ie bc-hl">
                      <Button
                        tooltipContent="unset code block"
                        icon={<CodeBlocksIcon />}
                        onClick={() => editor?.commands.toggleCodeBlock()}
                        type="light"
                      />
                    </div>
                    <div className="jk-row group jk-br-ie bc-hl" style={{ maxWidth: 300, height: 28 + 28 }}>
                      {CODE_LANGUAGES.map(codeLanguage => (
                        <Button
                          size="tiny"
                          key={codeLanguage}
                          onClick={() => {
                            editor.chain().focus().setCodeBlock({ language: CODE_LANGUAGE[codeLanguage].highlightJsKey }).run();
                          }}
                          type={editor.getAttributes('codeBlock').language === CODE_LANGUAGE[codeLanguage].highlightJsKey ? 'primary' : 'light'}
                        >
                          <T className="tt-se">{CODE_LANGUAGE[codeLanguage]?.label}</T>
                        </Button>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="jk-row group jk-br-ie bc-hl">
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 1 }) ? 'unset heading #1' : 'set heading #1'}
                        icon={<FormatH1Icon />}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        disabled={!editor.can().toggleHeading({ level: 1 }) || editor.isActive('codeBlock')}
                        type={editor.isActive('heading', { level: 1 }) ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 2 }) ? 'unset heading #2' : 'set heading #2'}
                        icon={<FormatH2Icon />}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        disabled={!editor.can().toggleHeading({ level: 2 }) || editor.isActive('codeBlock')}
                        type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 3 }) ? 'unset heading #3' : 'set heading #3'}
                        icon={<FormatH3Icon />}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        disabled={!editor.can().toggleHeading({ level: 3 }) || editor.isActive('codeBlock')}
                        type={editor.isActive('heading', { level: 3 }) ? 'primary' : 'light'}
                      />
                      <br />
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 4 }) ? 'unset heading #4' : 'set heading #4'}
                        icon={<FormatH4Icon />}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                        disabled={!editor.can().toggleHeading({ level: 4 }) || editor.isActive('codeBlock')}
                        type={editor.isActive('heading', { level: 4 }) ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 5 }) ? 'unset heading #5' : 'set heading #5'}
                        icon={<FormatH5Icon />}
                        disabled={!editor.can().toggleHeading({ level: 5 }) || editor.isActive('codeBlock')}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                        type={editor.isActive('heading', { level: 5 }) ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent={editor.isActive('heading', { level: 6 }) ? 'unset heading #6' : 'set heading #6'}
                        icon={<FormatH6Icon />}
                        disabled={!editor.can().toggleHeading({ level: 6 }) || editor.isActive('codeBlock')}
                        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                        type={editor.isActive('heading', { level: 6 }) ? 'primary' : 'light'}
                      />
                    </div>
                    <div className="jk-row group jk-br-ie bc-hl">
                      <Button
                        tooltipContent={editor.isActive('blockquote') ? 'unset blockquote' : 'set blockquote'}
                        icon={<FormatQuoteIcon />}
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        disabled={!editor.can().toggleBlockquote() || editor.isActive('codeBlock')}
                        type={editor.isActive('blockquote') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent={editor.isActive('codeBlock') ? 'unset code block' : 'set code block'}
                        icon={<CodeBlocksIcon />}
                        onClick={() => editor?.chain().focus().unsetBlockquote().toggleCodeBlock({ language: CODE_LANGUAGE[CodeLanguage.TEXT].highlightJsKey }).run()}
                        type={editor.isActive('codeBlock') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="add image"
                        icon={<AddPhotoAlternateIcon />}
                        onClick={() => setOpenImageModal(true)}
                        type="light"
                      />
                      <Button
                        tooltipContent={editor.isActive('orderedList') ? 'toggle bullet list' : editor.isActive('bulletList') ? 'toggle ordered list' : 'set bullet list'}
                        icon={editor.isActive('orderedList') ? <FormatListBulletedIcon /> : <FormatListNumberedIcon />}
                        onClick={() => {
                          if (editor.isActive('bulletList')) {
                            editor.chain().focus().toggleOrderedList().run();
                          } else {
                            editor.chain().focus().toggleBulletList().run();
                          }
                        }}
                        type={editor.isActive('orderedList') || editor.isActive('bulletList') ? 'primary' : 'light'}
                        disabled={false}
                      />
                      <Button
                        tooltipContent="sink list item"
                        icon={<StepOutIcon rotate={90} />}
                        onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
                        disabled={!editor.can().sinkListItem('listItem')}
                        type="light"
                      />
                      <Button
                        tooltipContent="lift list item"
                        icon={<StepIntoIcon rotate={90} />}
                        onClick={() => editor.chain().focus().liftListItem('listItem').run()}
                        disabled={!editor.can().liftListItem('listItem')}
                        type="light"
                      />
                    </div>
                    <div className="jk-row group jk-br-ie bc-hl">
                      <Button
                        tooltipContent="unset bold"
                        icon={<FormatBoldIcon />}
                        disabled={!editor.isActive('bold')}
                        onClick={() => editor?.commands.unsetMark('bold', { extendEmptyMarkRange: true })}
                        type={editor.isActive('bold') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="unset italic"
                        icon={<FormatItalicIcon />}
                        disabled={!editor.isActive('italic')}
                        onClick={() => editor?.commands.unsetMark('italic', { extendEmptyMarkRange: true })}
                        type={editor.isActive('italic') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="unset strike"
                        icon={<FormatStrikethroughIcon />}
                        disabled={!editor.isActive('strike')}
                        onClick={() => editor?.commands.unsetMark('strike', { extendEmptyMarkRange: true })}
                        type={editor.isActive('strike') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="unhighlight"
                        icon={<FormatInkHighlighterIcon />}
                        disabled={!editor.isActive('highlight')}
                        onClick={() => editor?.commands.unsetMark('highlight', { extendEmptyMarkRange: true })}
                        type={editor.isActive('highlight') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="unset code inline"
                        icon={<CodeIcon />}
                        disabled={!editor.isActive('code')}
                        onClick={() => editor?.commands.unsetMark('code', { extendEmptyMarkRange: true })}
                        type={editor.isActive('code') ? 'primary' : 'light'}
                      />
                      <Button
                        tooltipContent="unset link"
                        icon={<LinkOffIcon />}
                        disabled={!editor.isActive('link')}
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        type={editor.isActive('link') ? 'primary' : 'light'}
                      />
                    </div>
                  </>
                )}
              </div>
              <div
                className="jk-row trigger-content nowrap stretch center"
                onClick={() => setOpen(!open)}
              >
                <div className="jk-row center trigger bc-we jk-br-ie ow-hn">
                  <div className="jk-row"><MoreVertIcon /></div>
                </div>
                <div className="div-gap" />
              </div>
            </div>
          </div>
          <FloatingMenu
            editor={editor}
            className="bc-we jk-br-ie"
          >
            <div
              className="jk-row left jk-pg-xsm"
              onMouseDown={(event) => event.preventDefault()}
            >
              <Button
                tooltipContent={editor.isActive('heading', { level: 1 }) ? 'unset heading #1' : 'set heading #1'}
                size="small"
                icon={<FormatH1Icon />}
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                disabled={!editor.can().toggleHeading({ level: 1 }) || editor.isActive('codeBlock')}
                type={editor.isActive('heading', { level: 1 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent={editor.isActive('heading', { level: 2 }) ? 'unset heading #2' : 'set heading #2'}
                size="small"
                icon={<FormatH2Icon />}
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                disabled={!editor.can().toggleHeading({ level: 2 }) || editor.isActive('codeBlock')}
                type={editor.isActive('heading', { level: 2 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent={editor.isActive('heading', { level: 3 }) ? 'unset heading #3' : 'set heading #3'}
                size="small"
                icon={<FormatH3Icon />}
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                disabled={!editor.can().toggleHeading({ level: 3 }) || editor.isActive('codeBlock')}
                type={editor.isActive('heading', { level: 3 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent={editor.isActive('heading', { level: 4 }) ? 'unset heading #4' : 'set heading #4'}
                size="small"
                icon={<FormatH4Icon />}
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                disabled={!editor.can().toggleHeading({ level: 4 }) || editor.isActive('codeBlock')}
                type={editor.isActive('heading', { level: 4 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent={editor.isActive('heading', { level: 5 }) ? 'unset heading #5' : 'set heading #5'}
                size="small"
                icon={<FormatH5Icon />}
                disabled={!editor.can().toggleHeading({ level: 5 }) || editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                type={editor.isActive('heading', { level: 5 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent={editor.isActive('heading', { level: 6 }) ? 'unset heading #6' : 'set heading #6'}
                size="small"
                icon={<FormatH6Icon />}
                disabled={!editor.can().toggleHeading({ level: 6 }) || editor.isActive('codeBlock')}
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                type={editor.isActive('heading', { level: 6 }) ? 'primary' : 'light'}
              />
              <Button
                tooltipContent="add image"
                size="small"
                icon={<AddPhotoAlternateIcon />}
                onClick={() => setOpenImageModal(true)}
                type="light"
              />
              {/*<Button*/}
              {/*  data-tooltip-id="jk-tooltip"*/}
              {/*  tooltipContent={editor.isActive('bold') ? 'unset bold' : 'set bold'}*/}
              {/*  size="small"*/}
              {/*  icon={<FormatBoldIcon />}*/}
              {/*  onClick={() => editor?.commands.toggleBold()}*/}
              {/*  type={editor.isActive('bold') ? 'primary' : 'light'}*/}
              {/*/>*/}
              {/*<Button*/}
              {/*  data-tooltip-id="jk-tooltip"*/}
              {/*  tooltipContent={editor.isActive('code') ? 'unset code inline' : 'set code inline'}*/}
              {/*  size="small"*/}
              {/*  icon={<CodeIcon />}*/}
              {/*  onClick={() => editor?.commands.toggleCode()}*/}
              {/*  type={editor.isActive('code') ? 'primary' : 'light'}*/}
              {/*/>*/}
              {/*<Button*/}
              {/*  data-tooltip-id="jk-tooltip"*/}
              {/*  tooltipContent={editor.isActive('italic') ? 'unset italic' : 'set italic'}*/}
              {/*  size="small"*/}
              {/*  icon={<FormatItalicIcon />}*/}
              {/*  onClick={() => editor?.commands.toggleItalic()}*/}
              {/*  type={editor.isActive('italic') ? 'primary' : 'light'}*/}
              {/*/>*/}
              {/*<Button*/}
              {/*  data-tooltip-id="jk-tooltip"*/}
              {/*  tooltipContent={editor.isActive('highlight') ? 'unhighlight' : 'highlight'}*/}
              {/*  size="small"*/}
              {/*  icon={<FormatInkHighlighterIcon />}*/}
              {/*  onClick={() => editor?.commands.toggleHighlight()}*/}
              {/*  type={editor.isActive('highlight') ? 'primary' : 'light'}*/}
              {/*/>*/}
              {/*<Button*/}
              {/*  data-tooltip-id="jk-tooltip"*/}
              {/*  tooltipContent={editor.isActive('strike') ? 'unset strike' : 'set strike'}*/}
              {/*  size="small"*/}
              {/*  icon={<FormatStrikethroughIcon />}*/}
              {/*  onClick={() => editor?.commands.toggleStrike()}*/}
              {/*  type={editor.isActive('strike') ? 'primary' : 'light'}*/}
              {/*/>*/}
              <Button
                tooltipContent={editor.isActive('codeBlock') ? 'unset code block' : 'set code block'}
                size="small"
                icon={<CodeBlocksIcon />}
                onClick={() => editor?.commands.setCodeBlock()}
                type="light"
              />
              <Button
                tooltipContent={editor.isActive('blockquote') ? 'unset blockquote' : 'set blockquote'}
                size="small"
                icon={<FormatQuoteIcon />}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                disabled={!editor.can().toggleBlockquote() || editor.isActive('heading') || editor.isActive('codeBlock')}
                type={editor.isActive('blockquote') ? 'primary' : 'light'}
              />
            </div>
          </FloatingMenu>
          <BubbleMenu
            editor={editor}
            className="bc-we jk-br-ie"
            shouldShow={() => (
              (editor.isFocused && editor.isActive('image'))
              || (editor.isFocused && !editor.state.selection.empty && !editor.isActive('codeBlock'))
            )}
          >
            <div
              className="jk-col left jk-pg-xsm"
              onMouseDown={(event) => event.preventDefault()}
            >
              {editor.isFocused && editor.isActive('image') ? (
                <div className="jk-row">
                  <Button
                    icon={<AddPhotoAlternateIcon strikethrough />}
                    onClick={() => editor.commands.deleteSelection()}
                    type="light"
                  >
                    <T>delete image</T>
                  </Button>
                </div>
              ) : (editor.isFocused && !editor.state.selection.empty && !editor.isActive('codeBlock')) && (
                <div className="jk-row">
                  <Button
                    tooltipContent={editor.isActive('bold') ? 'unset bold' : 'set bold'}
                    icon={<FormatBoldIcon />}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    type={editor.isActive('bold') ? 'primary' : 'light'}
                  />
                  <Button
                    tooltipContent={editor.isActive('italic') ? 'unset italic' : 'set italic'}
                    icon={<FormatItalicIcon />}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    type={editor.isActive('italic') ? 'primary' : 'light'}
                  />
                  <Button
                    tooltipContent={editor.isActive('strike') ? 'unset strike' : 'set strike'}
                    icon={<FormatStrikethroughIcon />}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    type={editor.isActive('strike') ? 'primary' : 'light'}
                  />
                  <Button
                    tooltipContent={editor.isActive('highlight') ? 'unhighlight' : 'highlight'}
                    icon={<FormatInkHighlighterIcon />}
                    onClick={() => editor.chain().focus().toggleHighlight().run()}
                    type={editor.isActive('highlight') ? 'primary' : 'light'}
                  />
                  <Button
                    tooltipContent={editor.isActive('code') ? 'unset code inline' : 'set code inline'}
                    icon={<CodeIcon />}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    type={editor.isActive('code') ? 'primary' : 'light'}
                  />
                  <Button
                    tooltipContent="set code block"
                    icon={<CodeBlocksIcon />}
                    onClick={() => {
                      const { from, to } = editor.state.selection;
                      const selectedText = editor.state.doc.textBetween(from, to, '\n');
                      editor.chain()
                        .focus()
                        .insertContentAt({ from, to }, [
                          {
                            type: 'codeBlock',
                            attrs: { language: CODE_LANGUAGE[CodeLanguage.TEXT].highlightJsKey }, // o el lenguaje que prefieras
                            content: [
                              {
                                type: 'text',
                                text: selectedText,
                              },
                            ],
                          },
                        ])
                        .run();
                    }}
                    type="light"
                  />
                  <Button
                    tooltipContent="set link"
                    icon={<LinkIcon />}
                    onClick={setLink}
                    type="light"
                  />
                </div>
              )}
            </div>
          </BubbleMenu>
        </>
      )}
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.initialMd === nextProps.initialMd &&
    prevProps.uploadImageButton === nextProps.uploadImageButton &&
    prevProps.downloadButton === nextProps.downloadButton &&
    prevProps.className === nextProps.className
  );
});
