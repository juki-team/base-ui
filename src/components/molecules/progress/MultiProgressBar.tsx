import React from 'react';
import { Tooltip } from '../../atoms/Tooltip';

export interface MultiProgressBarProps {
  label?: string,
  progress: { label?: string, percentage: number, color?: string }[];
}

export const MultiProgressBar = ({ progress, label }: MultiProgressBarProps) => {
  const content = (
    <div className="jk-br-ie" style={{ width: '100%' }}>
      <div
        className="jk-row left jk-br-ie"
        style={{ width: '100%', overflow: 'hidden', background: 'var(--t-color-highlight-light)' }}
      >
        {progress.map(({ label, percentage, color }, index) => (
          <Tooltip content={label} key={index}>
            <div key={index} style={{ width: percentage + '%', background: color, height: 12 }} />
          </Tooltip>
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
    <Tooltip content={label} placement="top">
      {content}
    </Tooltip>
  ) : content;
};
