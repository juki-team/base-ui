import { TextArea } from '../../atoms';
import { SplitPane } from '../../molecules';
import { GraphvizViewer } from '../_layz_/GraphvizViewer';
import type { GraphvizEditorProps } from '../_layz_/GraphvizViewer/types';

export function GraphvizEditor({ value, onSave }: GraphvizEditorProps) {
  
  return (
    <div className="jk-graph-editor-modal jk-col nowrap gap stretch wh-100">
      <SplitPane style={{ height: `calc(${24 * (value?.split('\n').length || 1)}px + var(--pad-sm) * 3 + 24px + 8px)` }}>
        <div className="jk-col jk-pg-xsm ht-100">
          <TextArea
            value={value}
            onChange={onSave}
            className="ws-np flex-1"
          />
        </div>
        <div className="jk-row" style={{ overflow: 'auto' }}>
          <GraphvizViewer dot={value} className="jk-graph" />
        </div>
      </SplitPane>
    </div>
  );
}
