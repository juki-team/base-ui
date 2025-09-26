import { CodeLanguage } from '@juki-team/commons';
import { useEffect, useState } from 'react';
import { classNames } from '../../helpers';
import { Button, Input, Modal, T } from '../../atoms';
import { ArrowLeftIcon, ArrowRightIcon, CodeIcon, PlayCircleIcon, ReplyIcon, StopCircleIcon } from '../../atoms/server';
import { CodeViewer, FloatToolbar } from '../../molecules';
import { GraphvizViewer } from '../_layz_/GraphvizViewer';
import type { GraphvizViewerProps } from '../_layz_/GraphvizViewer/types';

interface GraphvizViewersProps extends GraphvizViewerProps {
  viewSourceButton?: boolean,
}

export function GraphvizViewers({ dot, className, viewSourceButton = true }: GraphvizViewersProps) {
  
  const graphs = dot.split('---');
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
          <CodeViewer code={dot} language={CodeLanguage.DOT} />
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
      {graphs[index] && <GraphvizViewer dot={graphs[index]} />}
    </div>
  );
}
