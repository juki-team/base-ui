import { CSSProperties } from 'react';
import { Popover } from '../../atoms';
import type { MultiProgressBarProps } from './types';

export function MultiProgressBar({ progress, points, label }: MultiProgressBarProps) {
  const content = (
    <div className="jk-br-ie pn-re" style={{ width: '100%' }}>
      <div
        className="jk-row left jk-br-ie"
        style={{ width: '100%', overflow: 'hidden', background: 'var(--t-color-highlight-light)' }}
      >
        {progress.map(({ label, percentage, color }, index) => (
          typeof label === 'string'
            ? (
              <div
                key={index}
                data-tooltip-id="jk-tooltip"
                data-tooltip-content={label}
                style={{ width: percentage + '%', background: color, height: 12 }}
              />
            ) : (
              <Popover content={label} key={index} popoverClassName="bc-we jk-br-ie elevation-1">
                <div
                  style={{ width: percentage + '%', background: color, height: 12 }}
                />
              </Popover>
            )
        ))}
      </div>
      {points && (
        <div
          className="jk-row left jk-br-ie"
          style={{ width: '100%', top: 0, left: 0 }}
        >
          {points.map(({ label, percentage, color }, index) => (
            typeof label === 'string'
              ? (
                <div
                  key={index}
                  data-tooltip-id="jk-tooltip"
                  data-tooltip-content={label}
                  className="br-50-pc pn-ae outline-hover br-we elevation-1"
                  style={{
                    top: -1,
                    left: `calc(${percentage}% - 6px)`,
                    width: 12,
                    height: 12,
                    background: color,
                    '--color': color,
                  } as CSSProperties}
                />
              ) : (
                <Popover content={label} key={index} popoverClassName="bc-we jk-br-ie elevation-1">
                  <div
                    className="br-50-pc pn-ae outline-hover br-we elevation-1"
                    style={{
                      top: -1,
                      left: `calc(${percentage}% - 6px)`,
                      width: 12,
                      height: 12,
                      background: color,
                      '--color': color,
                    } as CSSProperties}
                  />
                </Popover>
              )
          ))}
        </div>
      )}
    </div>
  );
  
  return label
    ? (
      <Popover content={label} placement="bottom" /*showPopperArrow*/>
        {content}
      </Popover>
    ) : content;
}
