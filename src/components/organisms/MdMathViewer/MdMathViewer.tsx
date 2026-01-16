import { classNames } from '../../helpers';
import { MdMath } from '../_layz_/MdMath';
import { MdFloatToolbar } from './MdFloatToolbar/MdFloatToolbar';
import type { MdMathViewerProps } from './types';

export function MdMathViewer(props: MdMathViewerProps) {
  
  const { source, downloadButton, className, blur, unBlur, style, flatView, detectRequestAnimationFrame } = props;
  
  return (
    <div className={classNames('jk-md-math-viewer-layout', className)} style={style}>
      {!flatView && <MdFloatToolbar source={source} /*share={sharedButton}*/ download={downloadButton} />}
      <MdMath
        source={source}
        blur={blur}
        unBlur={unBlur}
        flatView={flatView}
        detectRequestAnimationFrame={detectRequestAnimationFrame}
      />
    </div>
  );
}
