import { type CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../helpers';
import type { ProgressSlideProps } from './types';

export const ProgressSlide = ({
                                height = 12,
                                progress = 100,
                                className,
                                color = 'var(--t-color-white-light)',
                              }: ProgressSlideProps) => {
  const { ref, width = 0 } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  const fixedWidth = Math.ceil(width / height) * height * Math.sqrt(2);
  
  return (
    <div
      style={{
        width: `${progress}%`,
        height,
        '--width': `${fixedWidth}`,
        '--height': `${height}`,
        '--color': color,
        overflow: 'hidden',
      } as CSSProperties}
      className={classNames('jk-progress-slide jk-br-ie', className)}
      ref={ref}
    >
      <div className="slide" style={{ width: fixedWidth, height }} />
    </div>
  );
};
