import { useState } from 'react';
import { Button, Modal } from '../../atoms';
import { classNames } from '../../helpers/commons';
import { EditIcon } from '../../server';
import { GraphvizViewer } from '../_layz_/GraphvizViewer';
import type { GraphvizEditorModalProps } from '../_layz_/GraphvizViewer/types';
import { GraphvizEditor } from '../GraphvizEditor/GraphvizEditor';

export function GraphvizEditorModal({ value, onChange, className }: GraphvizEditorModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={classNames('jk-row nowrap center jk-graphviz-editor-container', className)}
      style={{ position: 'relative' }}
    >
      {onChange && <Button onClick={() => setOpen(true)} style={{}} icon={<EditIcon />} className="float-top-right pad-t" />}
      <GraphvizViewer dot={value} />
      {onChange && (
        <Modal isOpen={open} onClose={() => setOpen(false)}>
          <GraphvizEditor value={value} onSave={onChange} />
        </Modal>
      )}
    </div>
  );
}
