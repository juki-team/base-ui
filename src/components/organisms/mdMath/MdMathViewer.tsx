import React from 'react';
import { classNames } from '../../../helpers';
import { MdFloatToolbar } from './MdFloatToolbar/MdFloatToolbar';
import { MdMathViewerProps } from './types';
import { MdMath } from './viewer/MdMath';

export const MdMathViewer = ({ source, downloadButton, className }: MdMathViewerProps) => (
  <div className={classNames('jk-md-math-viewer-layout', className)}>
    <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />
    <MdMath source={source} />
  </div>
);
