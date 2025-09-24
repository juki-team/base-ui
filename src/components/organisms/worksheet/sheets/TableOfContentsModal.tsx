import { WorksheetsInPages } from '@juki-team/commons';
import { Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { OnPageChange } from '../types';
import { TableOfContents } from './TableOfContents';

interface TableOfContentsModalProps extends BasicModalProps {
  page: number,
  subPage: number,
  sheetsInPages: WorksheetsInPages,
  onPageChange: OnPageChange,
}

export const TableOfContentsModal = (props: TableOfContentsModalProps) => {
  
  const { sheetsInPages, isOpen, onClose, page, subPage, onPageChange } = props;
  
  return (
    <Modal isOpen={isOpen} onClose={onClose} closeIcon={false}>
      <div className="jk-col stretch">
        <div className="jk-row bc-py jk-pg-sm">
          <T className="tt-se fw-bd cr-we">table of content</T>
        </div>
        <TableOfContents
          page={page}
          subPage={subPage}
          sheetsInPages={sheetsInPages}
          onPageChange={onPageChange}
        />
      </div>
    </Modal>
  );
};
