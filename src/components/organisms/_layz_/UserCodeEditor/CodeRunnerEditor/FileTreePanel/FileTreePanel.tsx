import { useState } from 'react';
import { Button, Input, Modal, T } from '../../../../../atoms';
import { AddIcon, ArrowLeftIcon, ArrowRightIcon, DeleteIcon, DraftIcon, EditIcon } from '../../../../../atoms/server';
import { classNames } from '../../../../../helpers';
import { TwoActionModal } from '../../../../../molecules';
import type { FileTreePanelProps } from './types';

export const FileTreePanel = <T,>(props: FileTreePanelProps<T>) => {
  const { fileTreePanelRef, files, currentFileName, onChangeRef, readOnly } = props;

  const [viewFiles, setViewFiles] = useState<boolean>(false);
  const [openFileName, setOpenFileName] = useState('');
  const [fileNameEdit, setFileNameEdit] = useState('');
  const [fileNameDelete, setFileNameDelete] = useState('');

  const onChange = () => {
    onChangeRef.current?.({ fileNameEdited: [openFileName, fileNameEdit] });
    setOpenFileName('');
  };

  return (
    <>
      <TwoActionModal
        primary={{
          label: <T className="tt-se">delete</T>,
          onClick: () => {
            onChangeRef.current?.({ fileNameDeleted: fileNameDelete });
            setFileNameDelete('');
          },
        }}
        title={<T className="tt-se">warning</T>}
        isOpen={!!fileNameDelete}
        onClose={() => setFileNameDelete('')}
      >
        <div className="jk-col gap">
          <T className="tt-se">are you sure you want to delete the file?</T>
          <div className="jk-tag bc-hl">{fileNameDelete}</div>
          <T className="tt-se">{"it can't be undone"}</T>
        </div>
      </TwoActionModal>
      <Modal isOpen={!!openFileName} onClose={() => setOpenFileName('')}>
        <div className="jk-pg jk-col gap stretch">
          <Input
            label={<T className="tt-se">new name</T>}
            labelPlacement="top"
            value={fileNameEdit}
            onChange={setFileNameEdit}
            onEnter={onChange}
            expand
          />
          <div className="jk-row gap right">
            <Button type="secondary" onClick={() => setOpenFileName('')}>
              <T className="tt-se">cancel</T>
            </Button>
            <Button onClick={onChange}>
              <T className="tt-se">change</T>
            </Button>
          </div>
        </div>
      </Modal>
      <div className="jk-col top stretch nowrap" style={{ borderRight: '1px solid var(--cr-ht-lt)' }} ref={fileTreePanelRef}>
        <div
          className="jk-row fw-bd jk-pg-xsm-tb bc-hl left hoverable"
          onClick={() => setViewFiles(!viewFiles)}
          style={{ paddingLeft: 4 }}
        >
          {viewFiles ? <ArrowLeftIcon /> : <ArrowRightIcon />}
          {viewFiles && <T className="tt-se">files</T>}
        </div>
        <div className="jk-divider vertical tiny" style={{ height: 1 }} />
        <div className="jk-col top stretch gap nowrap ow-ao">
          <div className="jk-col stretch">
            {Object.entries(files)
              .sort(([, a], [, b]) => a.index - b.index)
              .map(([name], index) => (
                <div
                  key={name}
                  className={classNames('tx-t jk-pg-xsm jk-col nowrap left stretch', {
                    'bc-al cr-at-it': name === currentFileName,
                    hoverable: name !== currentFileName,
                  })}
                  onClick={name !== currentFileName ? () => onChangeRef.current?.({ fileName: name }) : undefined}
                >
                  {viewFiles ? (
                    <>
                      {name}
                      <div className="jk-row gap space-between">
                        <DraftIcon letter={((index + 1) % 10) + ''} letterSize={12} size="tiny" />
                        <div className="jk-row gap">
                          <EditIcon
                            className={classNames({ 'cr-tx-ht-lt': name !== currentFileName })}
                            size="tiny"
                            filledCircle={name !== currentFileName ? 'var(--cr-we)' : 'var(--cr-tx-ht)'}
                            onClick={() => {
                              setOpenFileName(name);
                              setFileNameEdit(name);
                            }}
                          />
                          <DeleteIcon
                            className={classNames({ 'cr-tx-ht-lt': name !== currentFileName })}
                            size="tiny"
                            filledCircle={name !== currentFileName ? 'var(--cr-we)' : 'var(--cr-tx-ht)'}
                            onClick={() => setFileNameDelete(name)}
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <DraftIcon letter={((index + 1) % 10) + ''} letterSize={12} size="small" />
                  )}
                </div>
              ))}
          </div>
          <div className="jk-row jk-pg-xsm-t border-top-highlight-light">
            <Button
              size="tiny"
              icon={<AddIcon />}
              disabled={readOnly}
              onClick={() => onChangeRef.current?.({ newFileName: true })}
            />
          </div>
        </div>
      </div>
    </>
  );
};
