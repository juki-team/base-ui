import domToImage from 'dom-to-image-more';
import { type MouseEvent, type MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';
import { Button, CopyToClipboard, T } from '../../../../../atoms';
import { ContentCopyIcon, DownloadIcon, LoadingIcon, PlayArrowIcon, WarningIcon } from '../../../../../atoms/server';
import { downloadBlobAsFile } from '../../../../../helpers';
import { GraphicToolbar } from './GraphicToolbar';
import { MermaidTheme } from './types';

const DEFAULT_CONFIG = `{
  "logLevel": "error",
  "securityLevel": "loose",
  "startOnLoad": false
}`;

function ErrorPanel({ error }: { error: string }) {
  return (
    <div
      style={{
        background: 'var(--t-color-error-light, #fee2e2)',
        color: 'var(--t-color-error, #dc2626)',
        borderTop: '2px solid var(--t-color-error, #dc2626)',
        padding: '8px 12px',
        flexShrink: 0,
        overflow: 'auto',
        maxHeight: '140px',
        display: 'flex',
        gap: '8px',
        alignItems: 'flex-start',
      }}
    >
      <WarningIcon size="small" style={{ flexShrink: 0, marginTop: '2px' }} />
      <pre style={{ fontSize: '0.75rem', margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word', fontFamily: 'monospace' }}>
        {error}
      </pre>
    </div>
  );
}

export const MermaidViewer = ({
  value: code,
  mermaidTheme = 'default',
  configJson = DEFAULT_CONFIG,
  fileName = 'diagram',
}: {
  value: string;
  mermaidTheme?: MermaidTheme;
  configJson?: string;
  fileName?: string;
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dragStartRef = useRef({ x: 0, y: 0 });
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const wheelContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleChange);
    return () => document.removeEventListener('fullscreenchange', handleChange);
  }, []);

  const handleZoom = useCallback((delta: number) => {
    setZoom((z) => Math.max(0.1, Math.min(8, parseFloat((z + delta).toFixed(2)))));
  }, []);

  const handleResetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleMouseDown: MouseEventHandler = useCallback(
    (e) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    },
    [pan],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      setPan({ x: e.clientX - dragStartRef.current.x, y: e.clientY - dragStartRef.current.y });
    },
    [isDragging],
  );

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  useEffect(() => {
    const el = wheelContainerRef.current;
    if (!el) return;
    const onWheel = (e: globalThis.WheelEvent) => {
      e.preventDefault();
      const delta = -e.deltaY * 0.001;
      setZoom((z) => Math.max(0.1, Math.min(8, parseFloat((z + delta).toFixed(3)))));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const [renderedSvg, setRenderedSvg] = useState('');
  const [error, setError] = useState<string>('');
  const [isRendering, setIsRendering] = useState(false);
  const svgContainerRef = useRef<HTMLDivElement>(null);

  const renderIdRef = useRef(0);

  useEffect(() => {
    const renderId = ++renderIdRef.current;
    setIsRendering(true);

    const timeout = setTimeout(async () => {
      try {
        const { default: mermaid } = await import('mermaid');

        let extraConfig: Record<string, unknown> = {};
        try {
          extraConfig = JSON.parse(configJson);
        } catch (error) {
          console.warn('Error on parsing configJson', error);
        }

        mermaid.initialize({
          startOnLoad: false,
          theme: mermaidTheme,
          securityLevel: 'loose',
          ...extraConfig,
        });

        const { svg } = await mermaid.render(`mermaid-render-${renderId}`, code);

        // Mermaid v11 resolves with an error SVG instead of throwing
        if (svg.includes('aria-roledescription="error"')) {
          const match = svg.match(/<text class="error-text"[^>]*>([^<]*)<\/text>/);
          throw new Error(match?.[1] ?? 'Syntax error');
        }

        if (renderId === renderIdRef.current) {
          setRenderedSvg(svg);
          setError('');
          setIsRendering(false);
        }
      } catch (err: unknown) {
        // Clean up the ghost div Mermaid injects into the DOM on error
        document.getElementById(`dmermaid-render-${renderId}`)?.remove();
        if (renderId === renderIdRef.current) {
          const message = err instanceof Error ? err.message : String(err);
          setError(message.replace(/^Error:\s*/i, ''));
          setRenderedSvg('');
          setIsRendering(false);
        }
      }
    }, 400);

    return () => {
      clearTimeout(timeout);
    };
  }, [code, mermaidTheme, configJson]);

  const getPngBlob = useCallback((): Promise<Blob> => {
    const el = svgContainerRef.current;
    if (!el) return Promise.reject(new Error('No SVG'));
    return domToImage.toBlob(el, { bgcolor: mermaidTheme === 'dark' ? '#1e1e2e' : '#ffffff' });
  }, [mermaidTheme]);

  const handleExportSVG = useCallback(() => {
    if (!renderedSvg) return;
    const blob = new Blob([renderedSvg], { type: 'image/svg+xml' });
    downloadBlobAsFile(blob, `${fileName}.svg`);
  }, [renderedSvg, fileName]);

  const handleExportPNG = useCallback(async () => {
    try {
      const blob = await getPngBlob();
      downloadBlobAsFile(blob, `${fileName}.png`);
    } catch (err) {
      console.error('PNG export failed', err);
    }
  }, [getPngBlob, fileName]);

  const handleCopyPNG = useCallback(async () => {
    try {
      const blob = await getPngBlob();
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    } catch (err) {
      console.error('PNG copy failed', err);
    }
  }, [getPngBlob]);

  const handleToggleFullscreen = useCallback(async () => {
    if (!previewContainerRef.current) return;
    if (!document.fullscreenElement) {
      await previewContainerRef.current.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  }, []);

  return (
    <div className="ht-100 jk-col ow-hn flex-1 wh-100" ref={previewContainerRef}>
      {error ? (
        <ErrorPanel error={error} />
      ) : (
        <>
          <GraphicToolbar
            zoom={zoom}
            isRendering={isRendering}
            isFullscreen={isFullscreen}
            onZoom={handleZoom}
            onReset={handleResetView}
            onToggleFullscreen={handleToggleFullscreen}
            renderedSvg={renderedSvg}
            mermaidTheme={mermaidTheme}
          />
          <div className="jk-row gap">
            <CopyToClipboard key="copy-svg" disabled={!renderedSvg} size="tiny" text={renderedSvg}>
              SVG
            </CopyToClipboard>
            <Button onClick={handleCopyPNG} disabled={!renderedSvg} icon={<ContentCopyIcon size="small" />} size="tiny">
              PNG
            </Button>
            <Button onClick={handleExportSVG} disabled={!renderedSvg} icon={<DownloadIcon size="small" />} size="tiny">
              SVG
            </Button>
            <Button onClick={handleExportPNG} disabled={!renderedSvg} icon={<DownloadIcon size="small" />} size="tiny">
              PNG
            </Button>
          </div>
          <div
            ref={wheelContainerRef}
            className="wh-100"
            style={{
              flex: 1,
              overflow: 'hidden',
              cursor: isDragging ? 'grabbing' : 'grab',
              position: 'relative',
              userSelect: 'none',
              background: mermaidTheme === ('dark' as MermaidTheme) ? '#1e1e2e' : 'var(--t-color-bg-1, #f8fafc)',
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${pan.x}px), calc(-50% + ${pan.y}px)) scale(${zoom})`,
                transformOrigin: 'center center',
              }}
            >
              {renderedSvg ? (
                <div
                  ref={svgContainerRef}
                  dangerouslySetInnerHTML={{ __html: renderedSvg }}
                  style={{ maxWidth: '100%', lineHeight: 0 }}
                />
              ) : !isRendering && !error ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '12px',
                    color: 'var(--t-color-gray-5)',
                    padding: '3rem',
                    userSelect: 'none',
                  }}
                >
                  <PlayArrowIcon size="huge" />
                  <T className="tt-se">start typing to see your diagram</T>
                </div>
              ) : null}
            </div>

            {isRendering && !renderedSvg && (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.05)',
                }}
              >
                <LoadingIcon size="large" />
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                bottom: '8px',
                right: '8px',
                fontSize: '0.7rem',
                color: 'var(--t-color-gray-5)',
                background: 'var(--t-color-bg)',
                padding: '3px 7px',
                borderRadius: '4px',
                border: '1px solid var(--t-color-gray-3)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              scroll to zoom · drag to pan
            </div>
          </div>
        </>
      )}
    </div>
  );
};
