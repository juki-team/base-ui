import { isStringJson, Theme } from '@juki-team/commons';
import React, { Children, useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';
import { useInjectColorTextHighlight, useInjectFontSize, useInjectTheme } from '../../../hooks';
import { useAnimationFrameStore } from '../../../stores/animationFrame/useAnimationFrameStore';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { Client, T } from '../../atoms';
import { useGraphvizStore } from '../../organisms/Graphviz/GraphvizViewer';
import { isPrintingPDF, PdfExport } from './pdfexport';
import { SlideDeckProps } from './types';
// import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/black.css';
// import 'reveal.js/dist/theme/white.css';

function hasScroll(el: HTMLElement) {
  return el?.scrollHeight > el?.clientHeight || el?.scrollWidth > el?.clientWidth;
}

const SESSION_STORAGE_KEY = 'jk-reveal-slide-state';

const SlideDeckCmp = (props: SlideDeckProps) => {
  
  const { children, fontSize = 32, theme = Theme.LIGHT, colorTextHighlight, fragmented = false } = props;
  
  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<Reveal.Api | null>(null);
  const t = useI18nStore(store => store.i18n.t);
  const [ loading, setLoading ] = useState(true);
  const [ ready, setReady ] = useState(0);
  const helpDescription = t('Open help overlay');
  
  useEffect(() => {
    const renderGraphviz = () => {
      useGraphvizStore.getState().triggerRerender();
    };
    if (deckDivRef.current && !deckRef.current) {
      const isPrinting = isPrintingPDF();
      setLoading(true);
      deckRef.current = new Reveal(deckDivRef.current, {
        // disableLayout: false,
        // embedded: true,
        // overview: false,
        transition: 'fade',
        // hash: true,
        // @ts-ignore
        // keyboard: {
        // 27: function () {
        //   onClose?.();
        // },
        // },
      });
      deckRef.current.initialize({
        plugins: isPrinting ? [ PdfExport ] : [ RevealZoom, RevealNotes, RevealSearch, PdfExport ],
      }).then(() => {
        console.info('initialized');
      });
      console.info('Reveal init');
      // @ts-ignore
      document.__deckRef = deckRef.current;
      
      deckRef.current?.addKeyBinding(
        {
          keyCode: 191, key: '?',
          keyDescription: '?',
          shiftKey: true,
          description: 'Open help overlay',
        } as any,
        () => {
          deckRef.current?.toggleHelp();
        },
      );
      
      deckRef.current.on('slidechanged', () => {
        renderGraphviz();
        const state = deckRef.current?.getState();
        if (state) {
          console.log('setstate>', { state });
          sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
        }
      });
      
      deckRef.current.on('ready', () => {
        const now = Date.now();
        renderGraphviz();
        console.info('ready');
        if (!isPrinting) {
          deckRef.current?.toggleHelp();
        }
        setTimeout(() => {
          setReady(now);
        }, 400);
      });
      document.addEventListener('pdf-ready', renderGraphviz);
      
      deckRef.current.on('fragmentshown', (event: any) => {
        const fragmentEl: HTMLElement = event?.fragment;
        const parent = fragmentEl?.parentElement?.parentElement;
        if (parent && hasScroll(parent)) {
          fragmentEl.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        }
      });
    }
    
    return () => {
      try {
        document.removeEventListener('pdf-ready', renderGraphviz);
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, []);
  
  const framePending = useAnimationFrameStore(store => store.framePending);
  const frames = useAnimationFrameStore(store => store.frames);
  
  console.log({
    framePending,
    loading,
    ready,
    helpDescription,
    isPrinting: isPrintingPDF(),
    frames,
  });
  useEffect(() => {
    if (!framePending && deckRef.current && deckRef.current.isReady()) {
      setLoading(true);
      if (typeof document !== 'undefined' && fragmented) {
        const slides = document.querySelector('.slides');
        const parents = Array.from(slides?.getElementsByClassName('jk-md-math') ?? []).map(({ children }) => Array.from(children));
        console.log('>>>', { slides, parents });
        for (let i = 0; i < parents.length; i++) {
          let fragmentAdded = false;
          for (let j = 0; j < parents[i]!.length; j++) {
            if (parents[i]![j]!.tagName === 'OL' || parents[i]![j]!.tagName === 'UL') {
              for (const li of Array.from(parents[i]![j]!.children)) {
                if (li.classList?.add) {
                  li.classList.add('fragment');
                  fragmentAdded = true;
                }
              }
            }
            if (fragmentAdded || parents[i]![j]!.textContent !== parents[i - 1]?.[j]?.textContent) {
              if (!!parents[i]![j]?.classList?.add) {
                parents[i]![j]!.classList.add('fragment');
                fragmentAdded = true;
              }
            }
          }
        }
      }
      deckRef.current.layout();
      deckRef.current.sync();
      
      const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (isStringJson(savedState) && !isPrintingPDF()) {
        try {
          const parsedState = JSON.parse(savedState);
          const state = {
            ...parsedState,
            indexf: Math.max(parsedState.indexf || 0, 0),
            indexh: Math.max(parsedState.indexh || 0, 0),
            indexv: Math.max(parsedState.indexv || 0, 0),
          };
          console.log({ state });
          deckRef.current?.setState(state);
        } catch (e) {
          console.warn('Error parsing saved slide state', e);
        }
      }
      setTimeout(() => {
        setLoading(false);
      }, 100);
    }
  }, [ framePending, fragmented, ready, children ]);
  useInjectTheme(theme);
  useInjectFontSize(fontSize);
  useInjectColorTextHighlight(colorTextHighlight);
  
  return (
    <>
      <div className="reveal" ref={deckDivRef}>
        <div className="slides">
          {Children.toArray(children)}
        </div>
      </div>
      {loading && (
        <div className="jk-loader-layer jk-overlay bc-we">
          <div className="jk-row ai-be">
            <T className="tt-se">loading</T>&nbsp;
            <div className="dot-flashing" />
          </div>
        </div>
      )}
    </>
  );
};

export const SlideDeck = (props: SlideDeckProps) => (
  <Client>
    <SlideDeckCmp {...props} />
  </Client>
);
