export type MdMathEditorProps = {
  source: string,
  onChange?: (value: string) => void,
  informationButton?: boolean,
  uploadImageButton?: boolean,
  downloadButton?: boolean,
  // sharedButton?: boolean,
  initEditMode?: boolean,
  // onPickImageUrl?: onPickImageUrlType,
  // online?: boolean,
}

export interface MdMathViewerProps {
  source: string,
  dark?: boolean,
  // sharedButton?: boolean,
  downloadButton?: boolean,
  className?: string,
  blur?: boolean,
  unBlur?: boolean,
}
