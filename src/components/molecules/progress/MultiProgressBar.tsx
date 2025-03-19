import React from 'react';
import { Popover } from '../../atoms/Popover';
import { MultiProgressBarProps } from './types';

export const MultiProgressBar = ({ progress, label }: MultiProgressBarProps) => {
  const content = (
    <div className="jk-br-ie" style={{ width: '100%' }}>
      <div
        className="jk-row left jk-br-ie"
        style={{ width: '100%', overflow: 'hidden', background: 'var(--t-color-highlight-light)' }}
      >
        {progress.map(({ label, percentage, color }, index) => (
          <div
            key={index}
            data-tooltip-id="jk-tooltip"
            data-tooltip-content={label}
            style={{ width: percentage + '%', background: color, height: 12 }}
          />
        ))}
      </div>
      {/*<div
        className="jk-row left tx-t fw-lr"
        style={{ width: '100%', overflow: 'hidden' }}
      >
        {progress.map(({ label, percentage, color }, index) => (
          <div key={index} className="ta-cr" style={{ width: percentage + '%' }}>{label}</div>
        ))}
      </div>*/}
    </div>
  );
  
  return !!label ? (
    <Popover content={label} placement="bottom" /*showPopperArrow*/>
      {content}
    </Popover>
  ) : content;
};
