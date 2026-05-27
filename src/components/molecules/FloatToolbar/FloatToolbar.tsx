import { type CSSProperties, memo } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import type { PopoverProps } from '../../atoms/_lazy_/Popover/types';
import { classNames } from '../../helpers/commons';
import { ButtonAction } from '../ButtonAction/ButtonAction';
import type { FloatToolbarProps } from './types';

function FloatToolbarCmp(props: FloatToolbarProps) {
  const { actionButtons, placement = 'left-top' as PopoverProps['placement'], className, offset, outer = false } = props;

  const { ref, width = 0, height = 0 } = useResizeDetector();

  if (actionButtons.length) {
    const styles = {
      '--jk-float-toolbar-container-width': `${width}px`,
      '--jk-float-toolbar-container-height': `${height}px`,
    } as CSSProperties;

    return (
      <div
        className={classNames('jk-float-toolbar-layout', placement, className, { outer })}
        style={offset ? ({ ...styles, '--offset': `${offset}px` } as CSSProperties) : styles}
      >
        <div className="jk-float-toolbar-container jk-col gap stretch right" ref={ref}>
          {actionButtons.map((props, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: action buttons list is fixed per toolbar instance
            <ButtonAction key={index} {...props} />
          ))}
        </div>
      </div>
    );
  }

  return null;
}

export const FloatToolbar = memo(FloatToolbarCmp);
