export type MermaidTheme = 'default' | 'dark' | 'forest' | 'neutral' | 'base';

export interface GraphicToolbarProps {
  zoom: number;
  isRendering: boolean;
  isFullscreen: boolean;
  onZoom: (delta: number) => void;
  onReset: () => void;
  onToggleFullscreen: () => void;
  renderedSvg: string;
  mermaidTheme: MermaidTheme;
}
