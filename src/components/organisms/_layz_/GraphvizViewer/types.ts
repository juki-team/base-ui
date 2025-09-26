export interface GraphvizEditorModalProps {
  value: string,
  onChange?: (newValue: string) => void,
  className?: string,
  width?: number,
  height?: number,
}

export interface GraphvizEditorProps {
  value: string,
  onSave: (newValue: string) => void,
}

export interface GraphvizViewerProps {
  /**
   * A string containing a graph representation using the Graphviz DOT language.
   * @see https://graphviz.org/doc/info/lang.html
   */
  dot: string;
  /**
   * The classname to attach to this component for styling purposes.
   */
  className?: string;
}
