import { ONE_MINUTE } from '@juki-team/commons';
import { useEffect, useMemo, useState } from 'react';
import { useSoundStore } from '../../../../stores/sound/useSoundStore';
import { Button, InputToggle, Portal, T } from '../../../atoms';
import {
  AlarmIcon,
  FullscreenExitIcon,
  FullscreenIcon,
  PauseCircleIcon,
  PlayCircleIcon,
  TimerIcon,
  UndoIcon,
} from '../../../atoms/server';
import { classNames } from '../../../helpers';
import { ButtonAction, Timer } from '../../../molecules';

export function FullscreenTimerButton() {
  
  const [ isActive, setIsActive ] = useState(false);
  const [ fullscreen, setFullscreen ] = useState(true);
  const [ times, setTimes ] = useState<{ state: 0 | 1 | 2, startTimestamp: number, currentTimestamp: number }>({
    state: 0,
    startTimestamp: 0,
    currentTimestamp: 0,
  });
  const [ type, setType ] = useState<'timer' | 'countdown'>('timer');
  const playBell = useSoundStore(store => store.playBell);
  useEffect(() => {
    let time = null;
    if (times.currentTimestamp > 0) {
      time = setTimeout(() => {
        playBell();
        for (let i = 1; i <= 3; i++) {
          setTimeout(() => {
            playBell();
          }, i * 1000);
        }
      }, times.currentTimestamp);
    } else {
      setTimes({ state: 0, startTimestamp: 0, currentTimestamp: 0 });
    }
    return () => {
      if (time) {
        clearTimeout(time);
      }
    };
  }, [ playBell, times.currentTimestamp ]);
  
  const timer = useMemo(() => (
    <Timer
      interval={times.state === 0 ? 0 : type === 'timer' ? 100 : -100}
      pause={times.state === 0 ? undefined : times.state === 2}
      currentTimestamp={times.currentTimestamp}
      type="hours-minutes-seconds"
      inline
    />
  ), [ times.currentTimestamp, times.state, type ]);
  
  return (
    <>
      {isActive ? (
        <ButtonAction
          placement="rightTop"
          className={classNames({ 'opacity-hover': times.state === 0 })}
          icon={<TimerIcon />}
          
          type="secondary"
          size="tiny"
          buttons={[
            {
              icon: <TimerIcon />,
              label: <T className="tt-se">exit</T>,
              size: 'tiny',
              type: 'secondary',
              onClick: () => {
                setIsActive(false);
                setTimes({ state: 0, startTimestamp: 0, currentTimestamp: 0 });
              },
              // children: (
              //   <div className="jk-row right opacity-hover">
              //     <Button
              //       tooltipContent="desactive timer / countdown"
              //       type="secondary"
              //       size="tiny"
              //       icon={<TimerIcon />}
              //       onClick={() => {
              //         setIsActive(false);
              //         setTimes({ state: 0, startTimestamp: 0, currentTimestamp: 0 });
              //       }}
              //     >
              //       <T>exit</T>
              //     </Button>
              //   </div>
              // ),
            },
            {
              children: (
                <div className="jk-col gap bc-we elevation-1 jk-pg-xsm jk-br-ie">
                  <T className="tt-se">{type}</T>
                  {timer}
                  {type === 'countdown' && (
                    <div className="jk-row gap">
                      <Button
                        size="tiny"
                        icon={<div>+1</div>}
                        onClick={() => {
                          const now = Date.now();
                          setTimes(prevState => ({
                            ...prevState,
                            currentTimestamp: Math.max(prevState.currentTimestamp - (now - prevState.startTimestamp), 0) + ONE_MINUTE,
                            startTimestamp: now,
                          }));
                        }}
                      />
                      <Button
                        size="tiny"
                        icon={<div>+5</div>}
                        onClick={() => {
                          const now = Date.now();
                          setTimes(prevState => ({
                            ...prevState,
                            currentTimestamp: Math.max(prevState.currentTimestamp - (now - prevState.startTimestamp), 0) + (ONE_MINUTE * 5),
                            startTimestamp: now,
                          }));
                        }}
                      />
                      <Button
                        size="tiny"
                        icon={<div>-1</div>}
                        onClick={() => {
                          const now = Date.now();
                          setTimes(prevState => ({
                            ...prevState,
                            currentTimestamp: Math.max(prevState.currentTimestamp - (now - prevState.startTimestamp), 0) - ONE_MINUTE,
                            startTimestamp: now,
                          }));
                        }}
                      />
                      <Button
                        size="tiny"
                        icon={<div>-5</div>}
                        onClick={() => {
                          const now = Date.now();
                          setTimes(prevState => ({
                            ...prevState,
                            currentTimestamp: Math.max(prevState.currentTimestamp - (now - prevState.startTimestamp), 0) - ONE_MINUTE * 5,
                            startTimestamp: now,
                          }));
                        }}
                      />
                    </div>
                  )}
                  <div className="jk-row gap block">
                    <Button
                      size="tiny"
                      icon={times.state === 1
                        ? <PauseCircleIcon />
                        : times.state === 2
                          ? <PlayCircleIcon />
                          : <PlayCircleIcon />}
                      onClick={() => {
                        const now = Date.now();
                        if (times.state === 1) {
                          if (type === 'timer') {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 2,
                              currentTimestamp: now - times.startTimestamp,
                            }));
                          } else {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 2,
                              currentTimestamp: prevState.currentTimestamp - (now - prevState.startTimestamp),
                              startTimestamp: now,
                            }));
                          }
                        }
                        if (times.state === 2) {
                          if (type === 'timer') {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 1,
                              startTimestamp: now - times.currentTimestamp,
                            }));
                          } else {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 1,
                              startTimestamp: now,
                            }));
                          }
                        }
                        if (times.state === 0) {
                          if (type === 'timer') {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 1,
                              startTimestamp: now,
                              currentTimestamp: 0,
                            }));
                          } else {
                            setTimes(prevState => ({
                              ...prevState,
                              state: 1,
                              startTimestamp: now,
                            }));
                          }
                        }
                      }}
                      type={times.state === 1 ? 'light' : 'primary'}
                      className={times.state === 1 ? '' : 'bc-ss cr-we'}
                    />
                    <Button
                      size="tiny"
                      icon={<UndoIcon />}
                      disabled={times.state === 0}
                      className="bc-er cr-we"
                      onClick={() => setTimes({ state: 0, startTimestamp: 0, currentTimestamp: 0 })}
                    />
                  </div>
                  <div className="jk-row">
                    <T className="tt-se tx-t">fullscreen</T>
                    <InputToggle
                      size="tiny"
                      className="ht-ao"
                      leftLabel={
                        <div
                          data-tooltip-id="jk-tooltip"
                          data-tooltip-content="no fullscreen"
                          data-tooltip-place="bottom-end"
                          className="jk-row"
                        >
                          <FullscreenExitIcon />
                        </div>
                      }
                      rightLabel={
                        <div
                          data-tooltip-id="jk-tooltip"
                          data-tooltip-content="fullscreen"
                          data-tooltip-place="bottom-end"
                          className="jk-row"
                        >
                          <FullscreenIcon />
                        </div>
                      }
                      checked={fullscreen}
                      onChange={() => {
                        setFullscreen(!fullscreen);
                        const now = Date.now();
                        if (times.state === 1) {
                          if (type === 'timer') {
                            setTimes(prevState => ({
                              ...prevState,
                              currentTimestamp: now - times.startTimestamp,
                            }));
                          } else {
                            setTimes(prevState => ({
                              ...prevState,
                              currentTimestamp: prevState.currentTimestamp - (now - prevState.startTimestamp),
                              startTimestamp: now,
                            }));
                          }
                        }
                      }}
                    />
                  </div>
                  <div className="jk-row">
                    <T className="tt-se tx-t">type</T>
                    <InputToggle
                      size="tiny"
                      className="ht-ao"
                      leftLabel={
                        <div
                          data-tooltip-id="jk-tooltip"
                          data-tooltip-content="timer"
                          data-tooltip-place="bottom-end"
                          className="jk-row"
                        >
                          <TimerIcon />
                        </div>
                      }
                      rightLabel={
                        <div
                          data-tooltip-id="jk-tooltip"
                          data-tooltip-content="countdown"
                          data-tooltip-place="bottom-end"
                          className="jk-row"
                        >
                          <AlarmIcon />
                        </div>
                      }
                      checked={type === 'countdown'}
                      onChange={() => {
                        setType(type === 'countdown' ? 'timer' : 'countdown');
                        setTimes({ state: 0, startTimestamp: 0, currentTimestamp: 0 });
                      }}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        >
          {isActive && !fullscreen ? (
            <div className={classNames({ 'jk-overlay-backdrop jk-br-ie cr-sl jk-pg-xsm-rl': times.state !== 0 && !fullscreen })}>
              {timer}
            </div>
          ) : undefined}
        </ButtonAction>
      ) : (
        <div className="jk-row right opacity-hover">
          <Button
            tooltipContent="active timer / countdown"
            type="light"
            size="tiny"
            icon={<TimerIcon />}
            onClick={() => setIsActive(true)}
          />
        </div>
      )}
      {fullscreen && (
        <Portal>
          <div
            style={{
              pointerEvents: isActive ? undefined : 'none',
              opacity: isActive ? 1 : 0,
              backgroundColor: 'var(--t-color-highlight-light)',
            }}
            className="bc-we jk-col stretch jk-overlay-backdrop jk-overlay"
          >
            <div className="jk-col gap huge-text">
              {timer}
              {/*<div className="jk-row gap block">*/}
              {/*  <Button*/}
              {/*    onClick={() => {*/}
              {/*      if (isRunning === 1) {*/}
              {/*        setIsRunning(2);*/}
              {/*      }*/}
              {/*      if (isRunning === 2) {*/}
              {/*        setIsRunning(1);*/}
              {/*      }*/}
              {/*      if (isRunning === 0) {*/}
              {/*        setIsRunning(1);*/}
              {/*      }*/}
              {/*    }}*/}
              {/*    type={isRunning ? 'light' : 'primary'}*/}
              {/*    className={isRunning ? '' : 'bc-ss cr-we'}*/}
              {/*  >*/}
              {/*    <T className="tt-se">{isRunning === 1 ? 'pause' : isRunning === 2 ? 'resume' : 'start'}</T>*/}
              {/*  </Button>*/}
              {/*  <Button*/}
              {/*    disabled={isRunning === 0}*/}
              {/*    className="bc-er cr-we"*/}
              {/*    onClick={() => {*/}
              {/*      setIsRunning(0);*/}
              {/*      setResetTrigger(Date.now());*/}
              {/*    }}*/}
              {/*  >*/}
              {/*    <T className="tt-se">restart</T>*/}
              {/*  </Button>*/}
              {/*</div>*/}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
