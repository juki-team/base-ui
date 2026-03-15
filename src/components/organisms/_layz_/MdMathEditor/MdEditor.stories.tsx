import { Meta, StoryObj } from '@storybook/react-vite';
import { UIMessage } from 'ai';
import { useRef, useState } from 'react';
import { CheckIcon, ErrorIcon, ExclamationIcon, SpinIcon } from '../../../atoms/server';
import { MockupJukiProvider } from '../../../mockup';
import { AiChatPanel } from '../../AiChatPanel/AiChatPanel';
import { AiChatSuggestion, AiChatToolStateUI } from '../../AiChatPanel/types';
import { SAMPLE_MD_CONTENT } from '../../MdMathViewer/constants';
import { MdMathViewer } from '../../MdMathViewer/MdMathViewer';
import { MemoMdMathViewer } from '../../MdMathViewer/MemoMdMathViewer.deprecated';
import { MdMathEditor } from './';
import { MdMathEditorHandle, MdMathEditorProps } from './types';

const meta: Meta<typeof MdMathEditor> = {
  component: MdMathEditor,
  argTypes: {},
};

export default meta;

type Story = StoryObj<typeof MdMathEditor>;

console.info({ MemoMdMathViewer });

const DEFAULT_MD_MATH_TOOL_STATE_UI: AiChatToolStateUI = {
  'input-streaming': { label: 'editing content', icon: <SpinIcon filledCircle size="tiny" className="cr-il" /> },
  'input-available': { label: 'processing content', icon: <SpinIcon filledCircle size="tiny" className="cr-il" /> },
  'approval-requested': { label: 'waiting for approval', icon: <ExclamationIcon filledCircle size="tiny" className="cr-wg" /> },
  'approval-responded': { label: 'approval responded', icon: <SpinIcon filledCircle size="tiny" className="cr-il" /> },
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

const Cmp = (props: MdMathEditorProps) => {
  const [md, setMd] = useState(SAMPLE_MD_CONTENT);

  const editorRef = useRef<MdMathEditorHandle>(null);

  const getBodyRef = useRef(() => {
    const selectedSource = editorRef.current?.getSelectionMarkdown() ?? '';
    if (selectedSource) {
      editorRef.current?.highlightSelectionNodes('jk-md-math-node-highlighted');
    }
    return { source: md, selectedSource };
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
            editorRef.current?.replaceSelectionWithMarkdown(part.output?.data?.content);
            editorRef.current?.highlightSelectionNodes('jk-md-math-node-highlighted');
          }
        }
      });
    }
  });

  return (
    <MockupJukiProvider>
      <div style={{ padding: '50px' }} className="jk-row gap nowrap top wh-100 ht-100">
        <div style={{ width: '45%', border: '1pxsolid red' }}>
          <MdMathEditor {...props} value={md} onChange={setMd} ref={editorRef} />
        </div>
        {props.enableIA && (
          <AiChatPanel
            api="https://md.local.juki.app/api/chat/md-math"
            getBodyRef={getBodyRef}
            onMessagesChangeRef={onMessagesChangeRef}
            toolStateUI={DEFAULT_MD_MATH_TOOL_STATE_UI}
            suggestions={DEFAULT_MD_MATH_SUGGESTIONS}
          />
        )}
        <MdMathViewer source={md} style={{ width: '45%', border: '1pxsolid red' }} />
        {/*<MdMathEditor initialMd={md} className="ow-ao flex-2" />*/}
        <div style={{ flex: 1 }}>
          <pre>
            <code>{md}</code>
          </pre>
        </div>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => <Cmp {...args} />,
};

Regular.args = {
  // sharedButton: true,
  // downloadButton: true,
  enableIA: true,
};
