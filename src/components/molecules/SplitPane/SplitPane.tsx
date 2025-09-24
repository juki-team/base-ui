import { memo, MouseEvent, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { useHandleState } from '../../../hooks';
import { T } from '../../atoms';
import {
  ExpandLessIcon,
  ExpandMoreIcon,
  NavigateBeforeIcon,
  NavigateNextIcon,
  SideNavigationIcon,
} from '../../server';
import { SplitPaneProps } from './types';

export const SplitPane = memo((props: SplitPaneProps) => {
  
  const {
    children,
    direction: initialDirection,
    onChangeDirection,
    className = '',
    minSize = 64,
    onlyFirstPane = false,
    onlySecondPane = false,
    closableFirstPane,
    closableSecondPane,
    toggleable = false,
    onePanelAtATime = false,
    style,
  } = props;
  
  const clientSizeRef = useRef(0);
  const [ dragging, setDragging ] = useState(false);
  const dividerPositionRef = useRef(0);
  const dividerRef = useRef<HTMLDivElement>(null);
  const firstChildRef = useRef<HTMLDivElement>(null);
  const firstChildSizeRef = useRef<string>('');
  const { height = 0, width = 0, ref: paneRef } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const [ displaySecondPane, setDisplaySecondPane ] = useState(true);
  const [ displayFirstPane, setDisplayFirstPane ] = useState(true);
  const [ direction, setDirection ] = useHandleState('row', initialDirection, onChangeDirection);
  useEffect(() => {
    if (onePanelAtATime) {
      if (onlyFirstPane) {
        setDisplayFirstPane(true);
        setDisplaySecondPane(false);
      } else if (onlySecondPane) {
        setDisplayFirstPane(false);
        setDisplaySecondPane(true);
      } else {
        setDisplayFirstPane(true);
        setDisplaySecondPane(false);
      }
    } else {
      setDisplayFirstPane(true);
      setDisplaySecondPane(true);
    }
  }, [ onePanelAtATime, onlyFirstPane, onlySecondPane ]);
  const onMouseHoldDown = (event: MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dividerPositionRef.current = event[direction === 'row' ? 'clientX' : 'clientY'];
  };
  
  const onMouseHoldUp = () => {
    setDragging(false);
    dividerPositionRef.current = 0;
  };
  
  const clientDirection = direction === 'row' ? 'clientWidth' : 'clientHeight';
  
  const onMouseHoldMove = (event: MouseEvent<HTMLDivElement>) => {
    if (!dividerPositionRef.current) {
      return;
    }
    if (firstChildRef.current?.style) {
      clientSizeRef.current = Math.min(
        Math.max(
          clientSizeRef.current
          + (event[direction === 'row' ? 'clientX' : 'clientY'] - (dividerPositionRef.current || 0)),
          minSize,
        ),
        (paneRef.current?.[clientDirection] || 0) - minSize - 10,
      );
      const size = (clientSizeRef.current * 100 / (paneRef.current?.[clientDirection] || 1)) + '%';
      firstChildSizeRef.current = size;
      firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = size;
      firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = size;
      dividerPositionRef.current = event[direction === 'row' ? 'clientX' : 'clientY'];
    }
  };
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      clientSizeRef.current = firstChildRef.current?.[clientDirection] || 0;
    }, 400);
    return () => {
      clearTimeout(timeout);
    };
  }, [ clientDirection, direction, onlyFirstPane, onlySecondPane, displaySecondPane, height, width ]);
  
  useEffect(() => {
    if (firstChildRef.current?.style) {
      if (!displaySecondPane || onlyFirstPane) {
        firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = '100%';
        firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = '100%';
      } else if (!displayFirstPane || onlySecondPane) {
        firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = '0%';
        firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = '0%';
      } else {
        firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = firstChildSizeRef.current;
        firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = firstChildSizeRef.current;
        firstChildRef.current.style[direction !== 'row' ? 'minWidth' : 'minHeight'] = '100%';
        firstChildRef.current.style[direction !== 'row' ? 'maxWidth' : 'maxHeight'] = '100%';
      }
    }
  }, [ direction, displaySecondPane, displayFirstPane, onlyFirstPane, onlySecondPane ]);
  
  return (
    <div
      className={classNames('jk-split-pane', className, direction, { dragging })}
      onMouseMove={onMouseHoldMove}
      onMouseUp={onMouseHoldUp}
      onMouseLeave={onMouseHoldUp}
      style={style}
      ref={paneRef}
    >
      <div
        className="jk-split-first-pane"
        style={onlySecondPane ? { display: 'none' } : undefined}
        ref={firstChildRef}
      >
        {children?.[0]}
        {(!!closableSecondPane || onePanelAtATime) && (
          <div
            className={classNames('closable-tab', {
              'jk-row': direction === 'column',
              'jk-col': direction === 'row',
              'top': direction === 'row' && closableSecondPane?.align === 'right',
              'bottom': direction === 'row' && closableSecondPane?.align === 'left',
              'right': direction === 'column' && closableSecondPane?.align === 'right',
              'left': direction === 'column' && closableSecondPane?.align === 'left',
            })}
          >
            <div
              className={classNames('notch cr-we bc-pl', {
                'jk-row': direction === 'column',
                'jk-col': direction === 'row',
              })}
              onClick={() => {
                if (onePanelAtATime) {
                  if (displaySecondPane) {
                    setDisplaySecondPane(false);
                    setDisplayFirstPane(true);
                  } else {
                    setDisplaySecondPane(true);
                    setDisplayFirstPane(false);
                  }
                } else {
                  setDisplaySecondPane(prevState => !prevState);
                }
              }}
            >
              {displaySecondPane
                ? (direction === 'row' ? <NavigateBeforeIcon size="tiny" /> : <ExpandMoreIcon size="tiny" />)
                : (direction === 'row' ? <NavigateNextIcon size="tiny" /> : <ExpandLessIcon size="tiny" />)}
              <span className="label tx-t">&nbsp;</span>
              {displaySecondPane
                ? (closableSecondPane?.hideLabel ?? <T className="label tx-t">hide</T>)
                : (closableSecondPane?.expandLabel ?? <T className="label tx-t">expand</T>)}
            </div>
          </div>
        )}
      </div>
      <div
        className="jk-split-pane-divider"
        style={onlyFirstPane
        || onlySecondPane
        || !displaySecondPane
        || !displayFirstPane ? { display: 'none' } : undefined}
        onMouseDown={onMouseHoldDown}
        ref={dividerRef}
      >
        <div className="jk-split-pane-divider-line">
          {toggleable && (
            <div className={classNames('extend', { 'jk-row': direction === 'column', 'jk-col': direction === 'row' })}>
              <div
                className={classNames(
                  'notch cr-we bc-pl toggle-button nowrap',
                  { 'jk-row': direction === 'column', 'jk-col': direction === 'row' },
                )}
                onClick={() => {
                  setDirection(prevState => prevState === 'row' ? 'column' : 'row');
                }}
              >
                <SideNavigationIcon size="tiny" rotate={direction === 'column' ? 90 : 0} />
                <span className="label tx-t">&nbsp;</span>
                <T className="label tx-t">rotate</T>
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className="jk-split-second-pane"
        style={onlyFirstPane || !displaySecondPane ? { display: 'none' } : undefined}
      >
        {children?.[1]}
        {(!!closableFirstPane || onePanelAtATime) && (
          <div
            className={classNames('closable-tab', {
              'jk-row': direction === 'column',
              'jk-col': direction === 'row',
              'top': direction === 'row' && closableFirstPane?.align === 'right',
              'bottom': direction === 'row' && closableFirstPane?.align === 'left',
              'right': direction === 'column' && closableFirstPane?.align === 'right',
              'left': direction === 'column' && closableFirstPane?.align === 'left',
            })}
          >
            <div
              className={classNames('notch cr-we bc-pl', {
                'jk-row': direction === 'column',
                'jk-col': direction === 'row',
              })}
              onClick={() => {
                if (onePanelAtATime) {
                  if (displayFirstPane) {
                    setDisplayFirstPane(false);
                    setDisplaySecondPane(true);
                  } else {
                    setDisplayFirstPane(true);
                    setDisplaySecondPane(false);
                  }
                } else {
                  setDisplayFirstPane(prevState => !prevState);
                }
              }}
            >
              {displaySecondPane
                ? (direction === 'row' ? <NavigateBeforeIcon size="tiny" /> : <ExpandLessIcon size="tiny" />)
                : (direction === 'row' ? <NavigateNextIcon size="tiny" /> : <ExpandMoreIcon size="tiny" />)}
              <span className="label tx-t">&nbsp;</span>
              {displayFirstPane
                ? (closableFirstPane?.hideLabel ?? <T className="label tx-t">hide</T>)
                : (closableFirstPane?.expandLabel ?? <T className="label tx-t">expand</T>)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
