import React from 'react';
import { classNames } from '../../../../helpers';
import { MdFloatToolbar } from '../MdFloatToolbar/MdFloatToolbar';
import { MdMathViewerProps } from '../types';
import { MemoMdMath } from './MemoMdMath';

export const MemoMdMathViewer = ({ source, downloadButton, className, style }: MdMathViewerProps) => (
  <div className={classNames('jk-md-math-viewer-layout', className)} style={style}>
    <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />
    <MemoMdMath source={source} />
  </div>
);
