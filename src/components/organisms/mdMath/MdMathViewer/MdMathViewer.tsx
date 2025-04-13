import React from 'react';
import { classNames } from '../../../../helpers';
import { MdFloatToolbar } from '../MdFloatToolbar';
import { MdMath, MemoMdMath } from './MdMath';
import { MdMathViewerProps } from './types';

export const MdMathViewer = ({ source, downloadButton, className }: MdMathViewerProps) => (
  <div className={classNames('jk-md-math-viewer-layout', className)}>
    <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />
    <MdMath source={source} />
  </div>
);

export const MemoMdMathViewer = ({ source, downloadButton, className }: MdMathViewerProps) => (
  <div className={classNames('jk-md-math-viewer-layout', className)}>
    <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />
    <MemoMdMath source={source} />
  </div>
);
