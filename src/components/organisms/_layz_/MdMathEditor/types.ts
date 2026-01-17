export interface MdMathEditorProps {
  value: string,
  onChange: (value: string) => void,
  informationButton?: boolean,
  enableTextPlain?: boolean,
  enableImageUpload?: boolean,
  enableDownload?: boolean,
  enableIA?: boolean,
  className?: string,
  onBlur?: () => void,
}
