import { useChat } from '@ai-sdk/react';
import { getUserKey } from '@juki-team/commons';
import { DefaultChatTransport } from 'ai';
import { CSSProperties, DragEvent, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, T, TextArea } from '../../atoms';
import { CheckIcon, CloseIcon, ErrorIcon, SendIcon, SmartToyIcon } from '../../atoms/server';
import { classNames, upperFirst } from '../../helpers';
import { useStableRef } from '../../hooks/useStableRef';
import { MdMathViewer } from '../MdMathViewer/MdMathViewer';
import type { AiChatPanelProps, Part } from './types';

export const AiChatPanel = (props: AiChatPanelProps) => {
  const { api, storeKey, getBodyRef, onMessagesChangeRef, toolStateUI, suggestions, onWidthChange, actions } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [pendingParts, setPendingParts] = useState<Part[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ref: panelRef, width: panelWidth = 0 } = useResizeDetector<HTMLDivElement>({ handleHeight: false });
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef(true);
  const onWidthChangeRef = useStableRef(onWidthChange);

  useEffect(() => {
    onWidthChangeRef.current?.(panelWidth);
  }, [panelWidth, onWidthChangeRef]);

  const t = useI18nStore((store) => store.i18n.t);

  const {
    company: { key: companyKey },
    nickname,
  } = useUserStore((store) => store.user);

  const storageKey = storeKey ? `jk-ai-chat/${getUserKey(nickname, companyKey)}/${storeKey}` : '';

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api }),
    messages: [],
  });

  const setMessagesRef = useStableRef(setMessages);
  useEffect(() => {
    if (!storageKey) {
      setMessagesRef.current([]);
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) ?? '[]');
      setMessagesRef.current(Array.isArray(saved) ? saved : []);
    } catch {
      localStorage.removeItem(storageKey);
      setMessagesRef.current([]);
    }
  }, [setMessagesRef, storageKey]);

  useEffect(() => {
    onMessagesChangeRef.current?.(messages);
    if (!shouldAutoScrollRef.current) {
      return;
    }
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
    });
  }, [messages, onMessagesChangeRef]);

  useEffect(() => {
    if (storageKey && messages?.length > 0) {
      localStorage.setItem(storageKey, JSON.stringify(messages));
    }
  }, [storageKey, messages]);
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) {
      return;
    }
    const onScroll = () => {
      shouldAutoScrollRef.current = el.scrollHeight - el.scrollTop - el.clientHeight < 10;
    };
    el.addEventListener('scroll', onScroll);
    return () => {
      el.removeEventListener('scroll', onScroll);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) {
      return;
    }
    messagesEndRef.current?.scrollIntoView({
      behavior: 'auto',
      block: 'nearest',
    });
  }, [messages]);

  const fileToDataUrl = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const addImageFiles = async (files: FileList | File[]) => {
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (!imageFiles.length) return;
    const newParts = await Promise.all(
      imageFiles.map(async (file) => ({ type: 'file' as const, mediaType: file.type, url: await fileToDataUrl(file) })),
    );
    setPendingParts((prev) => [...prev, ...newParts]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    void addImageFiles(e.dataTransfer.files);
  };

  const send = (prompt?: string) => {
    shouldAutoScrollRef.current = true;
    const text = prompt ?? input;
    const parts: Part[] = [{ type: 'text', text }, ...pendingParts];
    void sendMessage({ parts } as Parameters<typeof sendMessage>[0], { body: { ...getBodyRef.current() } });
    setInput('');
    setPendingParts([]);
  };

  const width = isOpen ? 'var(--chat-right-panel-width, calc(100vw / 3))' : 'calc(var(--tx-h-m) + var(--pad-sm))';

  return (
    <div
      ref={(el) => {
        scrollContainerRef.current = el;
        panelRef.current = el;
      }}
      className={classNames('chat-right-panel jk-br-ie jk-col gap nowrap stretch ht-100', { 'bc-we': isOpen })}
      style={{ width, minWidth: width }}
    >
      <div
        className={classNames('jk-row center cr-we bc-io jk-pg-xsm jk-br-ie hr-e1', { 'vertical-text': !isOpen })}
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          ...(isOpen ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}),
        }}
      >
        <SmartToyIcon />
        &nbsp;
        <T className="fw-bd tt-se">Juki AI Editor</T>
      </div>

      {isOpen && (
        <div className="jk-col gap stretch ai-chat-messages tx-s flex-1 jk-pg-xsm">
          <div className="flex-1" />
          {messages.map((message) => (
            <div key={message.id} className={classNames('message jk-br-ie bc-hl jk-pg-xsm', message.role)}>
              {message.parts.map((part, i) => {
                switch (part.type) {
                  case 'file':
                    return part.mediaType?.startsWith('image/') ? (
                      <img
                        key={`${message.id}-${i}`}
                        src={part.url as string}
                        alt="attachment"
                        style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4, objectFit: 'contain' }}
                      />
                    ) : null;

                  case 'text':
                    return (
                      <div key={`${message.id}-${i}`}>
                        <MdMathViewer source={part.text} flatView />
                      </div>
                    );

                  case 'tool-editMarkdown':
                    return (
                      <div key={`${message.id}-${i}`} className="jk-col gap-sm">
                        <div className="jk-row left fw-lr">
                          {toolStateUI?.[part?.state] ? (
                            <>
                              <T className="tt-se">{toolStateUI[part.state]!.label}</T>&nbsp;
                              {toolStateUI[part.state]!.icon}
                            </>
                          ) : (
                            <CheckIcon filledCircle size="tiny" />
                          )}
                        </div>
                      </div>
                    );

                  default:
                    return null;
                }
              })}
            </div>
          ))}
          <div className="jk-row left gap tx-t cr-hd">
            {status === 'submitted' ? (
              <>
                <SmartToyIcon size="tiny" className="cr-io" />
                <div className="jk-row" style={{ alignItems: 'baseline' }}>
                  <T className="tt-se">thinking</T>&nbsp;
                  <div
                    className="dot-flashing"
                    style={
                      {
                        '--dot-flashing-color': 'var(--cr-hd)',
                        '--dot-flashing-color-light': 'var(--cr-ht)',
                        '--dot-flashing-size': '4px',
                      } as CSSProperties
                    }
                  />
                </div>
              </>
            ) : status === 'streaming' ? (
              <>
                <SmartToyIcon size="tiny" className="cr-io" />
                <div className="jk-row" style={{ alignItems: 'baseline' }}>
                  <T className="tt-se">writing</T>&nbsp;
                  <div
                    className="dot-flashing"
                    style={
                      {
                        '--dot-flashing-color': 'var(--cr-hd)',
                        '--dot-flashing-color-light': 'var(--cr-ht)',
                        '--dot-flashing-size': '4px',
                      } as CSSProperties
                    }
                  />
                </div>
              </>
            ) : status === 'error' ? (
              <>
                <ErrorIcon size="tiny" className="cr-er" />
                <T className="tt-se cr-er">something went wrong</T>
              </>
            ) : (
              <div className="jk-col stretch gap">
                <div className="jk-row">
                  <SmartToyIcon size="tiny" className="cr-io" />
                  <T className="tt-se">select text and ask me to edit it</T>
                </div>
                {!!actions && <div>{actions({ setPendingParts })}</div>}
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => e.target.files && void addImageFiles(e.target.files)}
          />
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send();
            }}
          >
            <div
              className={classNames('jk-col gap-sm jk-br-ie', { 'bc-al': isDragging })}
              style={{ border: isDragging ? '2px dashed var(--cr-io)' : '2px dashed transparent', padding: 4 }}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {pendingParts.length > 0 && (
                <div className="jk-row gap left" style={{ flexWrap: 'wrap' }}>
                  {pendingParts.map((part, idx) => (
                    <div key={idx} style={{ position: 'relative', display: 'inline-block' }}>
                      {part.mediaType?.startsWith('image/') ? (
                        <img
                          src={part.url}
                          alt={part.name ?? `image-${idx}`}
                          style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 4 }}
                        />
                      ) : (
                        <div
                          style={{
                            width: 56,
                            height: 56,
                            borderRadius: 4,
                            background: 'var(--cr-hl)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: 4,
                            overflow: 'hidden',
                          }}
                        >
                          <span style={{ fontSize: 10, wordBreak: 'break-all', textAlign: 'center', lineHeight: 1.2 }}>
                            {part.name ?? `file-${idx}`}
                          </span>
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => setPendingParts((prev) => prev.filter((_, i) => i !== idx))}
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: -4,
                          background: 'var(--cr-er)',
                          border: 'none',
                          borderRadius: '50%',
                          width: 16,
                          height: 16,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 0,
                        }}
                      >
                        <CloseIcon size="tiny" className="cr-we" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <div className="jk-row wh-100 nowrap top gap">
                <TextArea
                  value={input}
                  placeholder={
                    upperFirst(messages.length ? t('ask a follow-up') : t('select text and describe what to do')) +
                    ', ' +
                    t('control + click to send message')
                  }
                  onChange={setInput}
                  disabled={status !== 'ready'}
                  onCtrlEnter={send}
                />
                <div className="jk-col gap" style={{ height: '100%' }}>
                  <Button
                    type="secondary"
                    size="small"
                    icon={<span style={{ fontSize: 14 }}>🖼</span>}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={status !== 'ready'}
                  />
                  <Button icon={<SendIcon />} submit style={{ flex: 1 }} />
                </div>
              </div>
            </div>
          </form>

          {!!suggestions?.length && (
            <div className="jk-row gap jk-pg-xsm">
              {suggestions.map((sug) => (
                <Button
                  key={sug.label}
                  onClick={() => send(sug.prompt)}
                  icon={sug.icon}
                  size="tiny"
                  type="ghost"
                  disabled={status !== 'ready'}
                >
                  <T className="tt-se">{sug.label}</T>
                </Button>
              ))}
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      )}
    </div>
  );
};
