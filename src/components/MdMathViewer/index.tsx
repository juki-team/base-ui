import React, { memo } from 'react';
import { MdFloatToolbar } from '../MdMathEditor/MdFloatToolbar';
import { MdMath } from './MdMath';
import { MdMathViewerProps } from './types';

export const MdMathViewer = memo(({ source, downloadButton, sharedButton }: MdMathViewerProps) => (
  <div className="jk-md-math-viewer-layout">
    <MdFloatToolbar source={source} share={sharedButton} download={downloadButton} />
    <MdMath source={source} />
  </div>
));

export * from './types';
