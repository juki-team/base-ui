import { useResizeDetector } from 'react-resize-detector';
import { RESIZE_DETECTOR_PROPS } from '../../../constants';
import { Popover, TextArea } from '../../atoms';
import { CheckIcon, ErrorIcon } from '../../atoms/server';
import { SplitPane } from '../../molecules';
import { Graphviz } from './Graphviz/Graphviz';
import { GraphvizEditorProps } from './types';
import { useDotValue } from './useDotValue';

export const GraphvizEditor = ({ value, onSave }: GraphvizEditorProps) => {
  
  const { ref, width = 0 } = useResizeDetector(RESIZE_DETECTOR_PROPS);
  
  const { dot, error } = useDotValue(value);
  
  return (
    <div className="jk-graph-editor-modal jk-col nowrap gap stretch wh-100">
      <SplitPane style={{ height: `calc(${24 * (value?.split('\n').length || 1)}px + var(--pad-sm) * 3 + 24px + 8px)` }}>
        <div className="jk-col jk-pg-xsm ht-100">
          {!!error
            ? <Popover content={<div className="jk-tag bc-er" style={{ maxWidth: 128 }}>{error}</div>}>
              <div className="jk-row">
                <ErrorIcon className="cr-er" />
              </div>
            </Popover>
            : <div className="jk-row">
              <CheckIcon className="cr-ss" />
            </div>}
          <TextArea
            value={value}
            onChange={onSave}
            className="ws-np flex-1"
          />
        </div>
        <div className="jk-row" style={{ overflow: 'auto' }} ref={ref}>
          <Graphviz dot={dot} className="jk-graph" options={{ width: width - 20 }} />
        </div>
      </SplitPane>
    </div>
  );
};
