import React, { useEffect, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { classNames } from '../../../helpers';
import { Button, Modal, T, TextArea } from '../../atoms';
import { BasicModalProps } from '../../atoms/types';
import { SplitPane } from '../../molecules';
import { EditIcon } from '../../server';
import { Graphviz } from './Graphviz/Graphviz';
import { GraphvizViewer } from './GraphvizViewer';
import { GraphvizEditorProps } from './types';
import { useDotValue } from './useDotValue';

interface GraphvizEditorModalProps extends BasicModalProps {
  value: string,
  onSave: (newValue: string) => void,
  onClose: () => void,
}

const GraphvizEditorModal = ({ value, onSave, ...props }: GraphvizEditorModalProps) => {
  
  const [ input, setInput ] = useState(value);
  const { ref, width = 0 } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  useEffect(() => setInput(value), [ value ]);
  
  const { dot, error } = useDotValue(input);
  
  return (
    <Modal {...props}>
      <div className="jk-graph-editor-modal jk-pg-sm jk-col gap stretch">
        <SplitPane>
          <div>
            <div className="bc-eras jk-tag error">{error}</div>
            <TextArea value={input} onChange={setInput} />
          </div>
          <div className="jk-row" style={{ overflow: 'auto' }} ref={ref}>
            <Graphviz dot={dot} className="jk-graph" options={{ width: width - 20 }} />
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
  );
};

export const GraphvizEditor = ({ value, onChange, className, width, height }: GraphvizEditorProps) => {
  
  const [ open, setOpen ] = useState(false);
  
  return (
    <div
      className={classNames('jk-row nowrap center jk-graphviz-editor-container', className)}
      style={{ position: 'relative' }}
    >
      {onChange && (
        <Button onClick={() => setOpen(true)} style={{}} icon={<EditIcon />} className="float-top-right pad-t" />
      )}
      <GraphvizViewer value={value} width={width} height={height} />
      {onChange && <GraphvizEditorModal value={value} onSave={onChange} isOpen={open} onClose={() => setOpen(false)} />}
    </div>
  );
};
