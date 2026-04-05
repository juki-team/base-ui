import {
  CODE_LANGUAGE,
  CodeEditorFiles,
  CodeLanguage,
  RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
  SubmissionRunStatus,
} from '@juki-team/commons';
import { UIMessage } from 'ai';
import { useRef, useState } from 'react';
import { Button } from '../../../atoms';
import { CheckIcon, ErrorIcon, ExclamationIcon, SpinIcon } from '../../../atoms/server';
import { MockupJukiProvider } from '../../../mockup';
import { AiChatPanel } from '../../AiChatPanel/AiChatPanel';
import { AiChatSuggestion, AiChatToolStateUI } from '../../AiChatPanel/types';
import { UserCodeEditor as UserCodeEditorCmp } from './';
import { UserCodeEditorHandle } from './types';

export default {
  component: UserCodeEditorCmp,
};

const initialTestCases = {
  'test-empty-with-PE': {
    key: 'test-empty-with-PE',
    index: 0,
    in: '2\n1 5',
    out: '',
    testOut: '6\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-without-PE': {
    key: 'test-empty-without-PE',
    index: 1,
    in: '2\n1 5',
    out: '',
    testOut: '6',
    withPE: false,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty': {
    key: 'test-empty',
    index: 2,
    in: '3\n1 2 -9 9 -19 8',
    out: '',
    testOut: '3\n0\n-11\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-1': {
    key: 'test-empty-1',
    index: 3,
    in: '5\n1 2\n-9 9\n-19 8\n0 0\n1 1',
    out: '',
    testOut: '3\n0\n-11\n0\n2\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-2': {
    key: 'test-empty-2',
    index: 4,
    in: '5\n1 2\n-9 9\n-19 8\n0 0\n1 1',
    out: '',
    testOut: '',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
};

const DEFAULT_MD_MATH_TOOL_STATE_UI: AiChatToolStateUI = {
  'input-streaming': { label: 'editing content', icon: <SpinIcon filledCircle size="tiny" className="cr-io-lt" /> },
  'input-available': { label: 'processing content', icon: <SpinIcon filledCircle size="tiny" className="cr-io-lt" /> },
  'approval-requested': { label: 'waiting for approval', icon: <ExclamationIcon filledCircle size="tiny" className="cr-wg" /> },
  'approval-responded': { label: 'approval responded', icon: <SpinIcon filledCircle size="tiny" className="cr-io-lt" /> },
  'output-available': { label: 'content ready', icon: <CheckIcon filledCircle size="tiny" className="cr-ss" /> },
  'output-error': { label: 'content error', icon: <ErrorIcon filledCircle size="tiny" className="cr-er" /> },
  'output-denied': { label: 'content denied', icon: <ErrorIcon filledCircle size="tiny" className="cr-er" /> },
};

const DEFAULT_MD_MATH_SUGGESTIONS: AiChatSuggestion[] = [
  {
    icon: <div>✨</div>,
    label: 'improve',
    prompt: 'Mejora la redacción y claridad del texto seleccionado manteniendo el mismo significado.',
  },
  {
    icon: <div>📝</div>,
    label: 'summarize',
    prompt: 'Resume el texto seleccionado de forma concisa.',
  },
  {
    icon: <div>🔤</div>,
    label: 'fix grammar',
    prompt: 'Corrige los errores gramaticales y ortográficos del texto seleccionado.',
  },
  {
    icon: <div>🌐</div>,
    label: 'translate',
    prompt: 'Traduce el texto seleccionado al inglés.',
  },
];

export const UserCodeEditor = () => {
  const [files, setFiles] = useState<CodeEditorFiles<CodeLanguage>>({});
  const [editorWidth, setEditorWidth] = useState<string>('');
  const [currentFileName, setCurrentFileName] = useState<string>('');
  const { source, language } = files?.[currentFileName] || { source: '', language: CodeLanguage.TEXT };
  const userCodeEditorRef = useRef<UserCodeEditorHandle<CodeLanguage>>(null);
  const getBodyRef = useRef(() => {
    const selectedSource = userCodeEditorRef.current?.markdownGetSelection() ?? '';
    if (selectedSource) {
      userCodeEditorRef.current?.markdownHighlightSelectionNodes('jk-md-math-node-highlighted');
    }
    return { source: language === CodeLanguage.MARKDOWN ? source : '', selectedSource };
  });

  const appliedPartsRef = useRef<Set<string>>(new Set());
  const onMessagesChangeRef = useRef((messages: UIMessage[]) => {
    for (const message of messages) {
      (
        message.parts as {
          type: string;
          output: { data: { content: string } };
          state: string;
        }[]
      ).forEach((part, i) => {
        if (part?.type === 'tool-suggestMarkdown' && part?.state === 'output-available') {
          const key = `${message.id}-${i}`;
          if (!appliedPartsRef.current.has(key) && typeof part?.output?.data?.content === 'string') {
            appliedPartsRef.current.add(key);
            userCodeEditorRef.current?.markdownReplaceSelectionWithMarkdown(part.output?.data?.content);
            userCodeEditorRef.current?.markdownHighlightSelectionNodes('jk-md-math-node-highlighted');
          }
        }
      });
    }
  });

  return (
    <MockupJukiProvider>
      <div style={{ height: '500px', padding: 20 }} className="jk-row gap nowrap">
        <div className="ht-100" style={{ width: editorWidth }}>
          <UserCodeEditorCmp<CodeLanguage>
            ref={userCodeEditorRef}
            // languages={[{ value: "A", label: "A" }]}
            initialTestCases={initialTestCases}
            languages={[
              ...RUNNER_ACCEPTED_PROGRAMMING_LANGUAGES,
              CodeLanguage.MARKDOWN,
              CodeLanguage.MERMAID,
              CodeLanguage.MDX,
            ].map((lang) => ({
              value: lang,
              label: CODE_LANGUAGE[lang].label,
            }))}
            storeKey={'testing'}
            enableAddCustomSampleCases
            enableAddSampleCases
            onFilesChange={setFiles}
            onCurrentFileNameChange={setCurrentFileName}
          />
        </div>
        <AiChatPanel
          title="tu IA"
          api="https://md.local.juki.app/api/chat/md"
          getBodyRef={getBodyRef}
          onMessagesChangeRef={onMessagesChangeRef}
          toolStateUI={DEFAULT_MD_MATH_TOOL_STATE_UI}
          suggestions={DEFAULT_MD_MATH_SUGGESTIONS}
          storeKey="test"
          onWidthChange={(width) => setEditorWidth(`calc(100% - ${width}px)`)}
          actions={({ setPendingParts }) => {
            return [
              <Button
                key="load-all-files"
                type="ghost"
                size="tiny"
                onClick={() => {
                  const parts = Object.values(files).map((file) => ({
                    type: 'file' as const,
                    name: file.name,
                    mediaType: CODE_LANGUAGE[file.language]?.mime || 'text/plain',
                    url: `data:text/plain;base64,${btoa(unescape(encodeURIComponent(file.source)))}`,
                  }));
                  setPendingParts(parts);
                }}
              >
                load all files
              </Button>,
            ];
          }}
        />
      </div>
    </MockupJukiProvider>
  );
};
