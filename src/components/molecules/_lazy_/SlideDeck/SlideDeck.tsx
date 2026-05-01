import { ASPECT_RATIO } from '@juki-team/commons/constants';
import { Theme } from '@juki-team/commons/enums';
import { isStringJson } from '@juki-team/commons/helpers';
import { Children, useEffect, useRef, useState } from 'react';
import Reveal, { type RevealApi, type RevealState } from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes';
import RevealSearch from 'reveal.js/plugin/search';
import RevealZoom from 'reveal.js/plugin/zoom';
import { useAnimationFrameStore } from '../../../../stores/animationFrame/useAnimationFrameStore';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { Client, T } from '../../../atoms';
import { useInjectColorTextHighlight } from '../../../hooks/useInjectColorTextHighlight';
import { useInjectFontSize } from '../../../hooks/useInjectFontSize';
import { useInjectTheme } from '../../../hooks/useInjectTheme';
import { useGraphvizStore } from '../../../organisms/_layz_/GraphvizViewer/GraphvizViewer';
import { isPrintingPDF, PdfExport } from './pdfexport';
import type { SlideDeckProps } from './types';

// import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/black.css';
// import 'reveal.js/dist/theme/white.css';

function hasScroll(el: HTMLElement) {
  return el?.scrollHeight > el?.clientHeight || el?.scrollWidth > el?.clientWidth;
}

const SESSION_STORAGE_KEY = 'jk-reveal-slide-state';

function SlideDeckComponent(props: SlideDeckProps) {
  const { children, fontSize = 32, theme = Theme.LIGHT, colorTextHighlight, aspectRatio, autoSlide } = props;

  const deckDivRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<RevealApi | null>(null);
  const t = useI18nStore((store) => store.i18n.t);
  const [loading, setLoading] = useState(true);
  const [ready, setReady] = useState(0);
  console.info('render SlideDeckCmp');

  useEffect(() => {
    const renderGraphviz = () => {
      useGraphvizStore.getState().triggerRerender();
    };
    setTimeout(() => {
      if (deckDivRef.current && !deckRef.current) {
        const isPrinting = isPrintingPDF();
        console.info('new Reveal');
        deckRef.current = new Reveal(deckDivRef.current, {
          // disableLayout: false,
          // embedded: true,
          // overview: false,
          transition: 'fade',
          help: true,
          previewLinks: true,
          transitionSpeed: 'fast',
          pdfSeparateFragments: false,
          // hash: true,
          // keyboard: {
          // 27: function () {
          //   onClose?.();
          // },
          // },
          autoSlide: autoSlide ?? false,
          margin: 0.1,
          width: ASPECT_RATIO[aspectRatio]?.width,
          height: ASPECT_RATIO[aspectRatio]?.height,
          plugins: isPrinting ? [PdfExport] : [RevealZoom, RevealNotes, RevealSearch, PdfExport],
        });
        deckRef.current?.initialize();

        deckRef.current.on('slidechanged', () => {
          renderGraphviz();
          const state = deckRef.current?.getState();
          if (state) {
            sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(state));
          }
        });

        deckRef.current.on('ready', () => {
          const now = Date.now();
          renderGraphviz();
          if (!isPrinting && typeof autoSlide !== 'number') {
            deckRef.current?.toggleHelp();
          }
          console.info("deckRef.current.on('ready')");
          setTimeout(() => {
            setReady(now);
          }, 1000);
        });
        document.addEventListener('pdf-ready', renderGraphviz);

        deckRef.current.on('fragmentshown', (event) => {
          const fragmentEl = (event as unknown as { fragment?: HTMLElement })?.fragment;
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
    }, 1000);

    return () => {
      try {
        document.removeEventListener('pdf-ready', renderGraphviz);
      } catch (error) {
        console.warn('Reveal.js destroy call failed.', error);
      }
    };
  }, [aspectRatio, autoSlide]);

  useEffect(() => {
    deckRef.current?.addKeyBinding(
      {
        keyCode: 191,
        key: '?',
        keyDescription: '?',
        shiftKey: true,
        description: t('Open help overlay'),
      } as never,
      () => {
        deckRef.current?.toggleHelp();
      },
    );
  }, [t]);

  const framePending = useAnimationFrameStore((store) => store.framePending);

  // biome-ignore lint/correctness/useExhaustiveDependencies: framePending is the trigger; deckRef and document queries are read at runtime
  useEffect(() => {
    setLoading(true);
    if (!framePending && deckRef.current && deckRef.current.isReady()) {
      const isPrinting = isPrintingPDF();
      if (typeof document !== 'undefined' && !isPrinting) {
        const slides = document.querySelector('.slides');
        const parents = Array.from(slides?.getElementsByClassName('jk-md-math') ?? []).map(({ children }) =>
          Array.from(children),
        );
        for (let i = 0; i < parents.length; i++) {
          const parent = parents[i];
          if (!parent) continue;
          const previousParent = parents[i - 1];
          let fragmentAdded = false;
          for (let j = 0; j < parent.length; j++) {
            const child = parent[j];
            if (!child) continue;
            if (child.tagName === 'OL' || child.tagName === 'UL') {
              for (const li of Array.from(child.children)) {
                if (li.classList?.add) {
                  li.classList.add('fragment');
                  fragmentAdded = true;
                }
              }
            }
            if (fragmentAdded || child.textContent !== previousParent?.[j]?.textContent) {
              if (child.classList?.add) {
                child.classList.add('fragment');
                fragmentAdded = true;
              }
            }
          }
        }
      }

      try {
        deckRef.current.layout();
      } catch (error) {
        console.warn('error on Reveal.layout', error);
      }
      try {
        deckRef.current.sync();
      } catch (error) {
        console.warn('error on Reveal.sync', error);
      }
      if (!isPrinting) {
        const savedState = sessionStorage.getItem(SESSION_STORAGE_KEY);
        let state: RevealState = {
          paused: false,
          overview: false,
          indexf: 0,
          indexh: 0,
          indexv: 0,
        };
        if (isStringJson(savedState)) {
          const parsedState = JSON.parse(savedState);
          state = {
            paused: parsedState.paused ?? false,
            overview: parsedState.overview ?? false,
            indexf: Math.max(parsedState.indexf || 0, 0),
            indexh: Math.max(parsedState.indexh || 0, 0),
            indexv: Math.max(parsedState.indexv || 0, 0),
          };
        }
        try {
          deckRef.current.setState(state);
        } catch (e) {
          console.warn('error on Reveal.setState', e);
        }
      }
    }
    setLoading(false);
  }, [framePending, ready, children, aspectRatio]);
  useInjectTheme(theme);
  useInjectFontSize(fontSize);
  useInjectColorTextHighlight(colorTextHighlight);

  return (
    <>
      <div className="reveal" ref={deckDivRef}>
        <div className="slides">{Children.toArray(children)}</div>
      </div>
      {loading && (
        <div className="jk-loader-layer jk-overlay bc-sf-hi">
          <div className="jk-row ai-be">
            <T className="tt-se">loading</T>&nbsp;
            <div className="dot-flashing" />
          </div>
        </div>
      )}
    </>
  );
}

// biome-ignore lint/style/noDefaultExport: lazy component
export default function SlideDeck({ children, onClose, ...rest }: SlideDeckProps) {
  return (
    <Client>
      <SlideDeckComponent key={JSON.stringify(rest)} {...rest} onClose={onClose}>
        {children}
      </SlideDeckComponent>
    </Client>
  );
}
