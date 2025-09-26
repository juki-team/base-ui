import { useState } from 'react';
import { classNames } from '../../../helpers';
import { Button, Modal } from '../../atoms';
import { EditIcon } from '../../server';
import type { GraphvizEditorModalProps } from '../_layz_/Graphviz/types';
import { GraphvizViewer } from '../_layz_/GraphvizViewer';
import { GraphvizEditor } from '../GraphvizEditor/GraphvizEditor';

export function GraphvizEditorModal({ value, onChange, className, width, height }: GraphvizEditorModalProps) {
  
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
      {onChange && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <GraphvizEditor value={value} onSave={onChange} />
        </Modal>
      )}
    </div>
  );
}
