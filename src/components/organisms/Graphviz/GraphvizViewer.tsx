import { CodeLanguage } from '@juki-team/commons';
import { graphviz, GraphvizOptions } from 'd3-graphviz';
import { memo, useEffect, useRef, useState } from 'react';
import { create } from 'zustand';
import { classNames } from '../../../helpers';
import { Button, Modal } from '../../atoms';
import { Input } from '../../atoms/inputs/Input';
import { ArrowLeftIcon, ArrowRightIcon, CodeIcon, PlayCircleIcon, ReplyIcon, StopCircleIcon } from '../../atoms/server';
import { T } from '../../atoms/T/T';
import { CodeViewer } from '../../molecules/CodeViewer/CodeViewer';
import { FloatToolbar } from '../../molecules/FloatToolbar/FloatToolbar';
import { Graphviz } from './Graphviz/Graphviz';
import { GraphvizViewerProps } from './types';

const defaultOptions: GraphvizOptions = {
  fit: true,
  // height: 500,
  // width: 500,
  zoom: false,
  useWorker: false as any,
};

interface GraphvizState {
  shouldRerender: number;
  triggerRerender: () => void;
}

export const useGraphvizStore = create<GraphvizState>((set) => ({
  shouldRerender: 0,
  triggerRerender: () =>
    set(() => ({ shouldRerender: Date.now() })),
}));

export const GraphvizViewer = memo(({ value, className, width, height }: GraphvizViewerProps) => {
  
  const containerRef = useRef<HTMLDivElement>(null);
  const [ error, setError ] = useState<string>('');
  const shouldRerender = useGraphvizStore((s) => s.shouldRerender);
  
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    
    el.innerHTML = '';
    setError('');
    const options = { width, height };
    
    try {
      graphviz(el, { ...defaultOptions, ...options })
        .fit(false)
        .renderDot(value)
        .onerror?.((e: any) => {
        setError(e?.message || String(e));
      });
    } catch (e: any) {
      setError(e?.message || String(e));
    }
    
    return () => {
      try {
        el.innerHTML = '';
      } catch {
      }
    };
  }, [ value, width, height, shouldRerender ]);
  
  return (
    <div className={classNames('jk-graphviz-viewer-container', className)}>
      {error && <div className="jk-tag bc-er">{error}</div>}
      <Graphviz dot={value} className="jk-graphviz-viewer" options={{ width, height }} ref={containerRef} />
    </div>
  );
});

interface GraphvizViewersProps extends GraphvizViewerProps {
  viewSourceButton?: boolean,
}

export const GraphvizViewers = ({ value, className, width, height, viewSourceButton = true }: GraphvizViewersProps) => {
  
  const graphs = value.split('---');
  const [ index, setIndex ] = useState(0);
  const [ delay, setDelay ] = useState(400);
  const [ isOpen, setIsOpen ] = useState(false);
  const [ isPlaying, setIsPlaying ] = useState(false);
  
  const togglePlay = () => {
    setIsPlaying(prev => !prev);
  };
  
  const next = () => {
    setIndex(prevIndex => (prevIndex + 1) % graphs.length);
  };
  
  const prev = () => {
    setIndex(prevIndex => (prevIndex - 1 + graphs.length) % graphs.length);
  };
  
  const reset = () => {
    setIndex(0);
  };
  
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setIndex(prevIndex => (prevIndex + 1) % graphs.length);
    }, delay);
    return () => {
      clearInterval(interval);
    };
  }, [ delay, graphs.length, isPlaying ]);
  
  return (
    <div className={classNames('jk-graphviz-viewers-container jk-pg-xsm jk-br-ie jk-col gap', className)}>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <div className="jk-pg-md">
          <CodeViewer code={value} language={CodeLanguage.DOT} />
        </div>
      </Modal>
      {viewSourceButton && (
        <FloatToolbar
          actionButtons={[
            {
              icon: <CodeIcon />,
              buttons: [
                {
                  icon: <CodeIcon />,
                  label: <T>view source</T>,
                  onClick: () => setIsOpen(true),
                },
              ],
            },
          ]}
          placement="rightTop"
        />
      )}
      {graphs.length > 1 && (
        <>
          <div className="jk-row tx-s gap">
            <Button
              size="tiny"
              type="light"
              tooltipContent={isPlaying ? 'pause' : 'play'}
              onClick={togglePlay}
              icon={isPlaying ? <PlayCircleIcon /> : <StopCircleIcon />}
            />
            <Button
              size="tiny"
              type="light"
              tooltipContent="prev"
              onClick={prev}
              icon={<ArrowLeftIcon />}
            />
            <div><T className="tt-se">frame</T> {index + 1} / {graphs.length}</div>
            <Button
              size="tiny"
              type="light"
              tooltipContent="next"
              onClick={next}
              icon={<ArrowRightIcon />}
            />
            <Button
              size="tiny"
              type="light"
              tooltipContent="return start"
              onClick={reset}
              icon={<ReplyIcon />}
            />
          </div>
          <Input
            label={<T className="tt-se">delay</T>}
            labelPlacement="left"
            type="range"
            min={200}
            max={5000}
            step={200}
            value={delay}
            onChange={setDelay}
          >
            &nbsp;{delay} ms
          </Input>
        </>
      )}
      {graphs[index] && <GraphvizViewer value={graphs[index]} width={width} height={height} />}
    </div>
  );
};
