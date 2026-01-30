import { ONE_MINUTE } from '@juki-team/commons';
import { CSSProperties, useCallback, useState } from 'react';
import { useSoundStore } from '../../../../stores/sound/useSoundStore';
import { useTimer } from '../../../../stores/timer/useTimer';
import { Button, InputToggle, Portal, T } from '../../../atoms';
import { ButtonProps } from '../../../atoms/Button/Button';
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
import { ButtonAction } from '../../../molecules';
import { TimerDisplay } from '../../../molecules/Timer/TimerDisplay';

export function FullscreenTimerButton() {
  
  const playBell = useSoundStore(store => store.playBell);
  const [ isActive, setIsActive ] = useState(false);
  const [ fullscreen, setFullscreen ] = useState(true);
  const [ type, setType ] = useState<'timer' | 'countdown'>('timer');
  
  const timeout = useCallback(() => {
    if (type === 'countdown') {
      playBell();
      for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
          playBell();
        }, i * 1000);
      }
    }
  }, [ playBell, type ]);
  const countdown = useTimer('tool-buttons-countdown', -1000, timeout);
  const timer = useTimer('tool-buttons-timer', 1000);
  
  const timerCountdown = type === 'timer' ? timer : countdown;
  
  const typeToggle = (size: ButtonProps['size']) => (
    <InputToggle
      size={size}
      className="ht-ao"
      leftLabel={
        <div className={classNames(`jk-row tx-${(size || '').at(0)} fw-bd`, { '--cr-tx-ht': type === 'timer' })}>
          <T className="tt-se">timer</T>
          &nbsp;
          <TimerIcon
            size={size}
            filledCircle={type === 'timer' ? true : 'var(--cr-tx-ht)'}
            className={classNames({ 'cr-tx-ht': type === 'timer', 'cr-we': type !== 'timer' })}
          />
        </div>
      }
      rightLabel={
        <div className={classNames(`jk-row tx-${(size || '').at(0)} fw-bd`, { '--cr-tx-ht': type === 'timer' })}>
          <AlarmIcon
            size={size}
            filledCircle={type === 'countdown' ? true : 'var(--cr-tx-ht)'}
            className={classNames({ 'cr-tx-ht': type === 'countdown', 'cr-we': type !== 'countdown' })}
          />
          &nbsp;
          <T className="tt-se">countdown</T>
        </div>
      }
      checked={type === 'countdown'}
      onChange={() => {
        setType(type === 'countdown' ? 'timer' : 'countdown');
        timer.clear();
        countdown.clear();
      }}
    />
  );
  
  const timerDisplay = (
    <TimerDisplay
      inline
      type="hours-minutes-seconds"
      counter={timerCountdown.counter}
    />
  );
  
  const timerButtons = (size: ButtonProps['size']) => (
    <>
      {type === 'countdown' && (
        <div className="jk-row gap">
          <Button
            size={size}
            icon={<div>+1</div>}
            onClick={() => countdown.setCountdownFrom(countdown.countdownFrom + ONE_MINUTE)}
          />
          <Button
            size={size}
            icon={<div>+5</div>}
            onClick={() => countdown.setCountdownFrom(countdown.countdownFrom + (ONE_MINUTE * 5))}
          />
          <Button
            size={size}
            icon={<div>-1</div>}
            onClick={() => countdown.setCountdownFrom(Math.max(countdown.countdownFrom - ONE_MINUTE, 0))}
          />
          <Button
            size={size}
            icon={<div>-5</div>}
            onClick={() => countdown.setCountdownFrom(Math.max(countdown.countdownFrom - (ONE_MINUTE * 5), 0))}
          />
        </div>
      )}
      <div className="jk-row gap block">
        <Button
          size={size}
          icon={timerCountdown.isRunning ? <PauseCircleIcon /> : <PlayCircleIcon />}
          onClick={() => {
            if (timerCountdown.isRunning) {
              timerCountdown.pause();
            } else {
              timerCountdown.start();
            }
          }}
          type={timerCountdown.isRunning ? 'light' : 'accent'}
          className={timerCountdown.isRunning ? '' : 'bc-ss cr-we'}
        />
        <Button
          size={size}
          icon={<UndoIcon />}
          disabled={timerCountdown.isStopped}
          className="bc-er cr-we"
          onClick={() => {
            timer.clear();
            countdown.clear();
          }}
        />
      </div>
    </>
  );
  
  return (
    <>
      {isActive ? (
        <ButtonAction
          offset={8}
          className={classNames('is-active right', {})}
          icon={<TimerIcon />}
          size="tiny"
          buttons={[
            {
              icon: <TimerIcon />,
              label: <T className="tt-se">exit</T>,
              size: 'tiny',
              onClick: () => {
                setIsActive(false);
                timer.clear();
                countdown.clear();
              },
            },
            {
              children: (
                <div className="jk-col gap bc-we elevation-1 jk-pg-xsm jk-br-ie">
                  {typeToggle('tiny')}
                  {timerDisplay}
                  {timerButtons('tiny')}
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
                      onChange={() => setFullscreen(!fullscreen)}
                    />
                  </div>
                </div>
              ),
            },
          ]}
        >
          {isActive && !fullscreen ? (
            <div className={classNames({ 'jk-overlay-backdrop jk-br-ie cr-sl jk-pg-xsm-rl': !timerCountdown.isStopped && !fullscreen })}>
              {timerDisplay}
            </div>
          ) : undefined}
        </ButtonAction>
      ) : (
        <div className="jk-row right">
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
              backgroundColor: 'var(--cr-ht-lt)',
            }}
            className="bc-we jk-col stretch jk-overlay-backdrop jk-overlay"
          >
            <div className="jk-col gap huge-text">
              <div className="jk-col gap display-on-hover-1 bf-4 jk-pg-sm jk-br">
                {typeToggle('huge')}
              </div>
              <div
                className="jk-col jk-pg-sm bc-we wh-100"
                style={{ '--background-color': '#FAFBFC44' } as CSSProperties}
              >
                {timerDisplay}
              </div>
              <div className="jk-col gap display-on-hover-2 bf-4 jk-pg-sm jk-br">
                {timerButtons('huge')}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
