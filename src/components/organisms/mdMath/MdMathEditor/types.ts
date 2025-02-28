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
