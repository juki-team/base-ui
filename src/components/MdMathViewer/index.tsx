import React, { memo } from 'react';
import { classNames } from '../../helpers';
import { MdFloatToolbar } from '../MdMathEditor/MdFloatToolbar';
import { MdMath } from './MdMath';
import { MdMathViewerProps } from './types';

export const MdMathViewer = memo(({ source, downloadButton, sharedButton, className }: MdMathViewerProps) => (
  <div className={classNames('jk-md-math-viewer-layout', className)}>
    <MdFloatToolbar source={source} share={sharedButton} download={downloadButton} />
    <MdMath source={source} />
  </div>
));

export * from './types';
