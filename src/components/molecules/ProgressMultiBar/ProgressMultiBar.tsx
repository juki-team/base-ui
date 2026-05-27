import type { CSSProperties } from 'react';
import { Popover } from '../../atoms/_lazy_/Popover';
import type { MultiProgressBarProps } from './types';

export function ProgressMultiBar({ progress, points, label, height = 12, tooltipPlacement = 'top' }: MultiProgressBarProps) {
  const content = (
    <div className="jk-br-ie pn-re" style={{ width: '100%' }}>
      <div className="jk-row left jk-br-ie" style={{ width: '100%', background: 'var(--cr-ht-lt)' }}>
        {progress.map(({ label, percentage, color }, index) =>
          typeof label === 'string' ? (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: progress segments are ordered and stable; key changes would re-trigger CSS transitions
              key={index}
              data-tooltip-id="jk-tooltip"
              data-tooltip-place={tooltipPlacement}
              data-tooltip-content={label}
              style={
                {
                  width: `${percentage}%`,
                  background: color,
                  height,
                  '--color': color,
                  ...(index === progress.length - 1
                    ? {
                        borderTopRightRadius: 'var(--border-radius-inline)',
                        borderBottomRightRadius: 'var(--border-radius-inline)',
                      }
                    : {}),
                  ...(index === 0
                    ? {
                        borderTopLeftRadius: 'var(--border-radius-inline)',
                        borderBottomLeftRadius: 'var(--border-radius-inline)',
                      }
                    : {}),
                } as CSSProperties
              }
              className="outline-hover"
            />
          ) : (
            <Popover
              // biome-ignore lint/suspicious/noArrayIndexKey: progress segments are ordered and stable
              key={index}
              content={label}
              popoverClassName="bc-sf-hi jk-br-ie elevation-1"
              offset={4}
              placement={tooltipPlacement}
            >
              <div
                style={
                  {
                    width: `${percentage}%`,
                    background: color,
                    height,
                    '--color': color,
                    ...(index === progress.length - 1
                      ? { borderRadius: '0 var(--border-radius-inline) var(--border-radius-inline) 0' }
                      : {}),
                  } as CSSProperties
                }
                className="outline-hover jk-br-ie"
              />
            </Popover>
          ),
        )}
      </div>
      {points && (
        <div className="jk-row left jk-br-ie" style={{ width: '100%', top: 0, left: 0 }}>
          {points.map(({ label, percentage, color }, index) =>
            typeof label === 'string' ? (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: point markers are ordered and stable
                key={index}
                data-tooltip-id="jk-tooltip"
                data-tooltip-place={tooltipPlacement}
                data-tooltip-content={label}
                className="br-50-pc pn-ae outline-hover br-we elevation-1"
                style={
                  {
                    top: -1,
                    left: `calc(${percentage}% - ${height / 2}px)`,
                    width: height,
                    height,
                    background: color,
                    '--color': color,
                    zIndex: 1,
                  } as CSSProperties
                }
              />
            ) : (
              <Popover
                // biome-ignore lint/suspicious/noArrayIndexKey: point markers are ordered and stable
                key={index}
                content={label}
                popoverClassName="bc-sf-hi jk-br-ie elevation-1"
                offset={6}
                placement={tooltipPlacement}
              >
                <div
                  className="br-50-pc pn-ae outline-hover br-we elevation-1"
                  style={
                    {
                      top: -1,
                      left: `calc(${percentage}% - ${height / 2}px)`,
                      width: height,
                      height,
                      background: color,
                      '--color': color,
                      zIndex: 1,
                    } as CSSProperties
                  }
                />
              </Popover>
            ),
          )}
        </div>
      )}
    </div>
  );

  return label ? (
    <Popover content={label} placement={tooltipPlacement}>
      {content}
    </Popover>
  ) : (
    content
  );
}
