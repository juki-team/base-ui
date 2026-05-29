import type { Status } from '@juki-team/commons/enums';
import type { CSSProperties, Dispatch, SetStateAction } from 'react';

export type TextPlainEditorContentProps = {
  value: string;
  onChange: (value: string) => void;
  setLoader: Dispatch<SetStateAction<Status>>;
  enableImageUpload: boolean;
};

export interface MdMathViewerProps {
  source: string;
  dark?: boolean;
  // sharedButton?: boolean,
  downloadButton?: boolean;
  className?: string;
  blur?: boolean;
  unBlur?: boolean;
  style?: CSSProperties;
  flatView?: boolean;
  detectRequestAnimationFrame?: boolean;
}
