export interface MdMathEditorHandle {
  getSelectionMarkdown: () => string;
  highlightSelectionNodes: (className: string) => void;
  clearHighlight: () => void;
  replaceSelectionWithMarkdown: (md: string) => void;
}

export interface MdMathEditorProps {
  value: string;
  onChange: (value: string) => void;
  informationButton?: boolean;
  enableTextPlain?: boolean;
  enableImageUpload?: boolean;
  enableDownload?: boolean;
  enableIA?: boolean;
  className?: string;
  onBlur?: () => void;
}
