import { Status } from '@juki-team/commons';
import { CSSProperties, Dispatch, SetStateAction } from 'react';

export type TextPlainEditorContentProps = {
  value: string,
  onChange: (value: string) => void,
  setLoader: Dispatch<SetStateAction<Status>>,
  enableImageUpload: boolean,
}

export type MdMathEditorDeprecatedProps = {
  initialMd: string,
  onChange?: (value: string) => void,
  informationButton?: boolean,
  uploadImageButton?: boolean,
  downloadButton?: boolean,
  // sharedButton?: boolean,
  initEditMode?: boolean,
  // onPickImageUrl?: onPickImageUrlType,
  // online?: boolean,
}

export interface MdMathEditorProps {
  value: string,
  onChange: (value: string) => void,
  informationButton?: boolean,
  enableTextPlain?: boolean,
  enableImageUpload?: boolean,
  enableDownload?: boolean,
  enableIA?: boolean,
  className?: string,
}

export interface MdMathViewerProps {
  source: string,
  dark?: boolean,
  // sharedButton?: boolean,
  downloadButton?: boolean,
  className?: string,
  blur?: boolean,
  unBlur?: boolean,
  style?: CSSProperties,
  slideView?: boolean,
}
