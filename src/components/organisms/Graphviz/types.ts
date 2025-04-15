import { GraphvizOptions } from 'd3-graphviz';

export interface GraphvizEditorProps {
  value: string,
  onChange?: (newValue: string) => void,
  className?: string,
  width?: number,
  height?: number,
}

export interface IGraphvizProps {
  /**
   * A string containing a graph representation using the Graphviz DOT language.
   * @see https://graphviz.org/doc/info/lang.html
   */
  dot: string;
  /**
   * Options to pass to the Graphviz renderer.
   */
  options?: GraphvizOptions;
  /**
   * The classname to attach to this component for styling purposes.
   */
  className?: string;
}

export type GraphvizViewerProps = Omit<GraphvizEditorProps, 'onChange'>;
