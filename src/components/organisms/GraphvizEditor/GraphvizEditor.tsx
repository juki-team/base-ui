import { read } from 'graphlib-dot';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { BasicModalProps, Button, EditIcon, Modal, SpinIcon, T, TextArea } from '../../atoms';
import { SplitPane } from '../../molecules';
import { GraphvizEditorProps } from './types';

const Graphviz = lazy(() => import('graphviz-react'));


interface GraphvizEditorModalProps extends BasicModalProps {
  value: string,
  onSave: (newValue: string) => void,
  onClose: () => void,
}

const useDotValue = (value: string) => {
  const [ error, setError ] = useState('');
  const [ dot, setDot ] = useState('graph {}');
  useEffect(() => {
    try {
      read(value);
      setDot(value);
      setError('');
    } catch (err: any) {
      setError(`Parse Error: ${err.message}`);
    }
  }, [ value ]);
  
  return {
    dot,
    error,
  }
}

const GraphvizEditorModal = ({ value, onSave, ...props }: GraphvizEditorModalProps) => {
  
  const [ input, setInput ] = useState(value);
  const { ref, width = 0 } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  useEffect(() => setInput(value), [ value ]);
  
  const { dot, error } = useDotValue(input);
  
  return (
    <Modal {...props}>
      <div className="jk-graph-editor jk-pad-sm jk-col gap stretch">
        <SplitPane>
          <div>
            <div className="bc-eras jk-tag error">{error}</div>
            <TextArea value={input} onChange={setInput} />
          </div>
          <div className="jk-row" style={{ overflow: 'auto' }} ref={ref}>
            <Suspense fallback={<SpinIcon />}>
              <Graphviz dot={dot} className="jk-graph" options={{ width: width - 20 }} />
            </Suspense>
          </div>
        </SplitPane>
        <div className="jk-row gap right">
          <Button type="light" onClick={props.onClose}><T>cancel</T></Button>
          <Button
            disabled={!!error}
            onClick={() => {
              onSave(dot);
              props.onClose();
            }}
          >
            <T>save</T>
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export const GraphvizEditor = ({ value, onChange, className, width, height }: GraphvizEditorProps) => {
  
  const [ open, setOpen ] = useState(false);
  const { dot, error } = useDotValue(value);
  
  return (
    <div className={classNames('jk-row nowrap center', className)} style={{ position: 'relative' }}>
      {onChange && (
        <Button onClick={() => setOpen(true)} style={{}} icon={<EditIcon />} className="float-top-right pad-t" />
      )}
      <Suspense fallback={<SpinIcon />}>
        {error
          ? <div className="bc-eras jk-tag error">{error}</div>
          : <Graphviz dot={dot} className="jk-graph" options={{ width, height }} />}
      </Suspense>
      {onChange && <GraphvizEditorModal value={value} onSave={onChange} isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};
