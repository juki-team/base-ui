import { ProfileSetting, Theme } from '@juki-team/commons';
import React, { Children, useEffect, useRef, useState } from 'react';
import Reveal from 'reveal.js';
import RevealNotes from 'reveal.js/plugin/notes/notes';
import RevealSearch from 'reveal.js/plugin/search/search';
import RevealZoom from 'reveal.js/plugin/zoom/zoom';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { useUserStore } from '../../../stores/user/useUserStore';
import { Button, Client, T } from '../../atoms';
import { useGraphvizStore } from '../../organisms/Graphviz/GraphvizViewer';
import { PdfExport } from './pdfexport';
import { SlideDeckProps } from './types';
// import 'reveal.js/dist/reveal.css';
// import 'reveal.js/dist/theme/black.css';
// import 'reveal.js/dist/theme/white.css';

function hasScroll(el: HTMLElement) {
  return el?.scrollHeight > el?.clientHeight || el?.scrollWidth > el?.clientWidth;
}

const SlideDeckCmp = (props: SlideDeckProps) => {
  
  const { children, fontSize = 32, theme = Theme.LIGHT, colorTextHighlight, fragmented = false } = props;
  
  const deckDivRef = useRef<HTMLDivElement>(null); // reference to deck container div
  const deckRef = useRef<Reveal.Api | null>(null); // reference to deck reveal instance
  const userPreferredFontSize = useUserStore(state => state.user.settings?.[ProfileSetting.FONT_SIZE]);
  const userPreferredTheme = useUserStore(state => state.user.settings?.[ProfileSetting.THEME]);
  const t = useI18nStore(store => store.i18n.t);
  const [ loading, setLoading ] = useState(false);
  const slidesCount = Children.count(children) || 0;
  
  useEffect(() => {
    const renderGraphviz = () => {
      useGraphvizStore.getState().triggerRerender();
    };
    deckRef.current = new Reveal(deckDivRef.current!, {
      // disableLayout: false,
      // embedded: true,
      // overview: false,
      transition: 'fade',
      // @ts-ignore
      // keyboard: {
      // 27: function () {
      //   onClose?.();
      // },
      // },
    });
    
    // deckRef.current.addKeyBinding(
    //   { keyCode: 72, key: 'H', description: t('open help overlay') },
    //   () => {
    //     deckRef.current?.toggleHelp();
    //   },
    // );
    //
    // deckRef.current.addKeyBinding(
    //   { keyCode: 72, key: 'h', description: t('open help overlay') },
    //   () => {
    //     deckRef.current?.toggleHelp();
    //   },
    // );
    
    deckRef.current?.addKeyBinding(
      {
        keyCode: 191, key: '?', keyDescription: '?',
        shiftKey: true,
        description: t('open help overlay') + ` (?)`,
      } as any,
      () => {
        deckRef.current?.toggleHelp();
      },
    );
    
    deckRef.current.initialize({
      plugins: [ RevealZoom, RevealNotes, RevealSearch, PdfExport ],
    }).then(() => {
      if (typeof document !== 'undefined' && fragmented) {
        const slides = document.querySelector('.slides');
        const parents = Array.from(slides?.getElementsByClassName('jk-md-math') ?? []).map(({ children }) => Array.from(children));
        for (let i = 0; i < parents.length; i++) {
          let fragmentAdded = false;
          for (let j = 0; j < parents[i].length; j++) {
            if (parents[i][j].tagName === 'OL' || parents[i][j].tagName === 'UL') {
              for (const li of Array.from(parents[i][j].children)) {
                li.classList.add('fragment');
                fragmentAdded = true;
              }
            }
            if (fragmentAdded || parents[i][j].textContent !== parents[i - 1]?.[j]?.textContent) {
              parents[i][j].classList.add('fragment');
              fragmentAdded = true;
            }
          }
        }
      }
    }).then(() => {
      deckRef.current?.toggleHelp();
    });
    deckRef.current.on('slidechanged', renderGraphviz);
    deckRef.current.on('ready', renderGraphviz);
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
    
    return () => {
      try {
        document.removeEventListener('pdf-ready', renderGraphviz);
        deckRef.current?.destroy();
        deckRef.current = null;
      } catch (e) {
        console.warn('Reveal.js destroy call failed.');
      }
    };
  }, [ fragmented, t, children ]);
  
  useEffect(() => {
    document.querySelector('body')?.style.removeProperty('--base-text-size');
    document.querySelector('body')?.style.setProperty('--base-text-size', `${fontSize}px`);
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--base-text-size');
      document.querySelector('body')?.style.setProperty('--base-text-size', `${userPreferredFontSize}px`);
    };
  }, [ userPreferredFontSize, fontSize ]);
  
  useEffect(() => {
    document.querySelector('body')?.classList.remove('jk-theme-dark');
    document.querySelector('body')?.classList.remove('jk-theme-light');
    if (theme === Theme.DARK) {
      document.querySelector('body')?.classList.add('jk-theme-dark');
    } else {
      document.querySelector('body')?.classList.add('jk-theme-light');
    }
    return () => {
      document.querySelector('body')?.classList.remove('jk-theme-dark');
      document.querySelector('body')?.classList.remove('jk-theme-light');
      if (userPreferredTheme === Theme.DARK) {
        document.querySelector('body')?.classList.add('jk-theme-dark');
      } else {
        document.querySelector('body')?.classList.add('jk-theme-light');
      }
    };
  }, [ userPreferredTheme, theme ]);
  
  useEffect(() => {
    if (colorTextHighlight) {
      document.querySelector('body')?.style.removeProperty('--t-color-text-highlight');
      document.querySelector('body')?.style.setProperty('--t-color-text-highlight', colorTextHighlight);
    }
    
    return () => {
      document.querySelector('body')?.style.removeProperty('--t-color-text-highlight');
      // document.querySelector('body')?.style.setProperty('--base-text-size', `${userPreferredFontSize}px`);
    };
  }, [ userPreferredFontSize, fontSize ]);
  
  if (!slidesCount) {
    return null;
  }
  
  return (
    <>
      <div className="reveal" ref={deckDivRef}>
        <div className="slides">
          {Children.toArray(children)}
        </div>
      </div>
      {loading && (
        <div className="jk-loader-layer pn-fd bc-we" style={{ top: 0, left: 0, zIndex: 1 }}>
          <Button
            onClick={() => {
              if (deckRef.current) {
                deckRef.current.sync();
                deckRef.current.layout();
                deckRef.current.slide(0, 0);
                setLoading(false);
              }
            }}
          >
            <T className="tt-se">_start</T>
          </Button>
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
