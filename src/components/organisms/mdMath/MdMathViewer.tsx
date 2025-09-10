import React from 'react';
import { classNames } from '../../../helpers';
import { MdFloatToolbar } from './MdFloatToolbar/MdFloatToolbar';
import { MdMathViewerProps } from './types';
import { MdMath } from './viewer/MdMath';

export const MdMathViewer = ({
                               source,
                               downloadButton,
                               className,
                               blur,
                               unBlur,
                               style,
                               slideView,
                             }: MdMathViewerProps) => (
  slideView
    ? <MdMath source={source} blur={blur} unBlur={unBlur} slideView={slideView} />
    :
    <div className={classNames('jk-md-math-viewer-layout', className)} style={style}>
      <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />
      <MdMath source={source} blur={blur} unBlur={unBlur} slideView={slideView} />
    </div>
);
