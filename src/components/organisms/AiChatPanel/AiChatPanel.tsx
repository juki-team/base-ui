import { useChat } from '@ai-sdk/react';
import { getUserKey } from '@juki-team/commons';
import { DefaultChatTransport } from 'ai';
import { CSSProperties, useEffect, useRef, useState } from 'react';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, T, TextArea } from '../../atoms';
import { CheckIcon, ErrorIcon, SendIcon, SmartToyIcon } from '../../atoms/server';
import { classNames, upperFirst } from '../../helpers';
import { MdMathViewer } from '../MdMathViewer/MdMathViewer';
import type { AiChatPanelProps } from './types';

export const AiChatPanel = ({ api, storeKey, getBodyRef, onMessagesChangeRef, toolStateUI, suggestions }: AiChatPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');

  const t = useI18nStore((store) => store.i18n.t);

  const {
    company: { key: companyKey },
    nickname,
  } = useUserStore((store) => store.user);

  const storageKey = storeKey ? `jk-ai-chat/${getUserKey(nickname, companyKey)}/${storeKey}` : '';

  const initialMessages = (() => {
    if (!storageKey) {
      return [];
    }
    try {
      return JSON.parse(localStorage.getItem(storageKey) ?? '[]');
    } catch {
      localStorage.removeItem(storageKey);
      return [];
    }
  })();

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api,
    }),
    messages: !!storageKey && Array.isArray(initialMessages) ? initialMessages : [],
  });

  useEffect(() => {
    onMessagesChangeRef.current?.(messages);
  }, [messages, onMessagesChangeRef]);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef(true);

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

  const send = (prompt?: string) => {
    shouldAutoScrollRef.current = true;
    void sendMessage({ text: prompt ?? input }, { body: { ...getBodyRef.current() } });
    setInput('');
  };

  return (
    <div
      ref={scrollContainerRef}
      className={classNames('chat-right-panel jk-br-ie jk-col gap nowrap stretch ht-100', { 'bc-we': isOpen })}
      style={
        isOpen ? { width: 'var(--chat-right-panel-width, calc(100vw / 3))' } : { width: 'calc(var(--tx-h-m) + var(--pad-sm))' }
      }
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
              <>
                <SmartToyIcon size="tiny" className="cr-io" />
                <T className="tt-se">select text and ask me to edit it</T>
              </>
            )}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
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
              <Button icon={<SendIcon />} submit style={{ height: '100%' }} />
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
