import React, { useEffect, useRef, useState } from 'react';
import { T, UpIcon } from '../../index';
import { classNames } from '../../helpers';
import { SplitPaneProps } from './types';

export const SplitPane = ({
  children,
  direction = 'row',
  className = '',
  minSize = 64,
  onlyFirstPane = false,
  onlySecondPane = false,
  closablePane,
}: SplitPaneProps) => {
  const clientSizeRef = useRef(0);
  const [dragging, setDragging] = useState(false);
  const dividerPositionRef = useRef(0);
  const firstChildRef = useRef<HTMLDivElement>(null);
  const firstChildSizeRef = useRef<string>('');
  const paneRef = useRef<HTMLDivElement>(null);
  const [displaySecondPane, setDisplaySecondPane] = useState(true);
  
  const onMouseHoldDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    dividerPositionRef.current = event[direction === 'row' ? 'clientX' : 'clientY'];
  };
  
  const onMouseHoldUp = () => {
    setDragging(false);
    dividerPositionRef.current = 0;
  };
  
  const onMouseHoldMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!dividerPositionRef.current) {
      return;
    }
    if (firstChildRef.current?.style) {
      const clientDirection = direction === 'row' ? 'clientWidth' : 'clientHeight';
      clientSizeRef.current = Math.min(Math.max(clientSizeRef.current + (event[direction === 'row' ? 'clientX' : 'clientY'] - (dividerPositionRef.current || 0)), minSize), (paneRef.current?.[clientDirection] || 0) - minSize - 10);
      const size = (clientSizeRef.current * 100 / (paneRef.current?.[clientDirection] || 1)) + '%';
      firstChildSizeRef.current = size;
      firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = size;
      firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = size;
      dividerPositionRef.current = event[direction === 'row' ? 'clientX' : 'clientY'];
    }
  };
  
  useEffect(() => {
    clientSizeRef.current = (direction === 'row' ? firstChildRef.current?.clientWidth : firstChildRef.current?.clientHeight) || 0;
  }, [direction]);
  useEffect(() => {
    if (firstChildRef.current?.style) {
      if (!displaySecondPane || onlyFirstPane) {
        firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = '100%';
        firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = '100%';
      } else {
        firstChildRef.current.style[direction === 'row' ? 'minWidth' : 'minHeight'] = firstChildSizeRef.current;
        firstChildRef.current.style[direction === 'row' ? 'maxWidth' : 'maxHeight'] = firstChildSizeRef.current;
      }
    }
  }, [direction, displaySecondPane, onlyFirstPane]);
  return (
    <div
      className={classNames('jk-split-pane', className, direction, { dragging })}
      onMouseMove={onMouseHoldMove}
      onMouseUp={onMouseHoldUp}
      onMouseLeave={onMouseHoldUp}
      ref={paneRef}
    >
      <div
        className="jk-split-first-pane"
        style={onlySecondPane ? { display: 'none' } : undefined}
        ref={firstChildRef}
      >
        {children?.[0]}
        {closablePane?.pane === 'second' && (
          <div
            className={classNames('closable-tab jk-button-primarya jk-row', closablePane.align)}
            onClick={() => setDisplaySecondPane(prevState => !prevState)}
          >
            <UpIcon rotate={displaySecondPane ? 180 : 0} />
            {displaySecondPane ? (closablePane.hideLabel || <T>hide</T>) : (closablePane.expandLabel || <T>expand</T>)}
          </div>
        )}
      </div>
      <div
        className="jk-split-pane-divider"
        style={onlyFirstPane || onlySecondPane || !displaySecondPane ? { display: 'none' } : undefined}
        onMouseDown={onMouseHoldDown}
      />
      <div className="jk-split-second-pane"
           style={onlyFirstPane || !displaySecondPane ? { display: 'none' } : undefined}>{children?.[1]}</div>
    </div>
  );
};
