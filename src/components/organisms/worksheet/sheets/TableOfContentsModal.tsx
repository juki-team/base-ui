import { WorksheetsInPages } from '@juki-team/commons';
import React from 'react';
import { Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { TableOfContents } from './TableOfContents';

interface TableOfContentsModalProps extends BasicModalProps {
  onClose: () => void,
  sheetsInPages: WorksheetsInPages,
  setPage?: (page: number) => void,
}

export const TableOfContentsModal = ({ sheetsInPages, isOpen, onClose, setPage }: TableOfContentsModalProps) => {
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeIcon={false}>
      <div className="jk-col stretch">
        <div className="jk-row bc-py jk-pg-sm">
          <T className="tt-se fw-bd cr-we">table of content</T>
        </div>
        <TableOfContents
          sheetsInPages={sheetsInPages}
          onClick={setPage ? (index) => {
            if (setPage) {
              setPage(index);
              onClose();
            }
          } : undefined}
        />
      </div>
    </Modal>
  );
};
