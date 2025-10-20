import { Excalidraw, MainMenu } from '@excalidraw/excalidraw';
import type { OrderedExcalidrawElement } from '@excalidraw/excalidraw/element/types';
import type { AppState, ExcalidrawImperativeAPI } from '@excalidraw/excalidraw/types';
import { useEffect, useState } from 'react';
import { Button, InputToggle, Portal, T } from '../../../atoms';
import { EditIcon } from '../../../atoms/server';
import { ButtonAction } from '../../../molecules';

const LOCAL_STORAGE_KEY = 'jk-excalidraw-data';

const getSafeBgColor = () => {
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      return parsed?.viewBackgroundColor || 'transparent';
    } catch (err) {
      console.error('Failed to parse Excalidraw data:', err);
    }
  }
  return 'transparent';
};

export default function ExcalidrawButton() {
  
  const [ isActive, setIsActive ] = useState(false);
  const [ viewBackgroundColor, setViewBackgroundColor ] = useState(getSafeBgColor());
  const [ excalidrawData, setExcalidrawData ] = useState({
    elements: [] as readonly OrderedExcalidrawElement[],
    appState: { viewBackgroundColor: 'transparent' } as AppState,
  });
  const [ excalidrawAPI, setExcalidrawAPI ] = useState<ExcalidrawImperativeAPI | null>(null);
  
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setExcalidrawData({
          appState: {
            ...parsed?.appState,
            collaborators: undefined,
          } as AppState,
          elements: (parsed?.elements) ?? [],
        });
      } catch (err) {
        console.error('Failed to parse Excalidraw data:', err);
      }
    }
  }, [ isActive ]);
  
  useEffect(() => {
    excalidrawAPI?.updateScene({
      appState: {
        viewBackgroundColor,
      },
    });
  }, [ viewBackgroundColor ]);
  
  return (
    <>
      {isActive ? (
        <ButtonAction
          placement="rightTop"
          className="opacity-hover"
          icon={<EditIcon />}
          type="secondary"
          size="tiny"
          buttons={[
            {
              icon: <EditIcon />,
              label: <T className="tt-se">exit</T>,
              size: 'tiny',
              type: 'secondary',
              onClick: () => setIsActive(false),
              // children: (
              //   <div className="jk-row right opacity-hover">
              //     <Button
              //       tooltipContent="desactive excalidraw"
              //       type="secondary"
              //       size="tiny"
              //       icon={<EditIcon />}
              //       onClick={() => setIsActive(false)}
              //     />
              //   </div>
              // ),
            },
            {
              children: (
                <div className="jk-col gap bc-we elevation-1 jk-pg-xsm jk-br-ie">
                  <T className="tt-se tx-t">background</T>
                  <InputToggle
                    // data-tooltip-id="jk-tooltip"
                    // data-tooltip-content={viewBackgroundColor === 'transparent' ? 'change to white background' : 'change to transparent background'}
                    // data-tooltip-place="bottom-end"
                    size="tiny"
                    leftLabel={
                      <div
                        data-tooltip-id="jk-tooltip"
                        data-tooltip-content="white"
                        data-tooltip-place="bottom-end"
                        className="br-50-pc br-g1"
                        style={{ background: 'white', width: 12, height: 12 }}
                      />
                    }
                    rightLabel={
                      <div
                        data-tooltip-id="jk-tooltip"
                        data-tooltip-content="transparent"
                        data-tooltip-place="bottom-end"
                        className="br-50-pc br-g1"
                        style={{
                          background: 'white',
                          width: 12,
                          height: 12,
                          backgroundImage:
                            'linear-gradient(45deg, #ccc 25%, transparent 25%),' +
                            'linear-gradient(-45deg, #ccc 25%, transparent 25%),' +
                            'linear-gradient(45deg, transparent 75%, #ccc 75%),' +
                            'linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                          backgroundSize: '6px 6px',
                          backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px',
                        }}
                      />
                    }
                    checked={viewBackgroundColor === 'transparent'}
                    onChange={() => {
                      setViewBackgroundColor(viewBackgroundColor === 'transparent' ? '#FFFFFF' : 'transparent');
                    }}
                  />
                </div>
              ),
            },
          ]}
        />
      ) : (
        <div className="jk-row right opacity-hover">
          <Button
            tooltipContent="active excalidraw"
            type="light"
            size="tiny"
            icon={<EditIcon />}
            onClick={() => setIsActive(true)}
          />
        </div>
      )}
      <Portal>
        {isActive && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              pointerEvents: isActive ? undefined : 'none',
              opacity: isActive ? 1 : 0,
              zIndex: 'var(--z-index-excalidraw)',
            }}
          >
            <Excalidraw
              excalidrawAPI={(api) => setExcalidrawAPI(api)}
              initialData={excalidrawData}
              onChange={(elements, appState) => {
                const data = { elements, appState, viewBackgroundColor };
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
              }}
            >
              <MainMenu>
                <MainMenu.DefaultItems.Export />
                <MainMenu.DefaultItems.SaveAsImage />
                <MainMenu.DefaultItems.ToggleTheme />
              </MainMenu>
            </Excalidraw>
          </div>
        )}
      </Portal>
    </>
  );
}
