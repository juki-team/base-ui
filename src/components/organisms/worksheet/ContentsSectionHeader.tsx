import { useState } from 'react';
import { QueryParamKey } from '../../../enums';
import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { ArrowBackIcon, ArrowForwardIcon, ViewHeadlineIcon } from '../../atoms/server';
import { TableOfContentsModal } from './sheets/TableOfContentsModal';
import type { ContentsSectionHeaderProps } from './types';

export function ContentsSectionHeader(props: ContentsSectionHeaderProps) {
  
  const { page, subPage, onPageChange, sheetsInPages } = props;
  
  const [ isOpen, setIsOpen ] = useState(false);
  
  const totalPages = sheetsInPages.length;
  
  return (
    <div className="jk-col stretch gap bc-we jk-br-ie cr-pd fw-bd">
      <TableOfContentsModal
        page={page}
        subPage={subPage}
        isOpen={isOpen}
        onPageChange={onPageChange}
        onClose={() => setIsOpen(false)}
        sheetsInPages={sheetsInPages}
      />
      <div className="jk-row gap center">
        <div
          onClick={page <= 1 ? undefined : () => onPageChange(page - 1, 1, {
            name: QueryParamKey.PAGE_FOCUS,
            value: 'jk-worksheet-viewer-container',
          })}
          className={classNames('jk-row gap jk-pg-xsm jk-br-ie', {
            'cr-g6': page <= 1,
            'cr-pr hoverable': !(page <= 1),
          })}
        >
          <ArrowBackIcon />
          <T className="tt-se">previous</T>
        </div>
        <div
          className="jk-row cr-pr hoverable jk-br-ie jk-pg-xsm"
          onClick={() => setIsOpen(true)}
        >
          <ViewHeadlineIcon />
          <T className="tt-se">table of contents</T>
        </div>
        <div
          onClick={page === totalPages ? undefined : () => onPageChange(page + 1, 1, {
            name: QueryParamKey.PAGE_FOCUS,
            value: 'jk-worksheet-viewer-container',
          })}
          className={classNames('jk-row gap jk-pg-xsm jk-br-ie', {
            'cr-g6': page === totalPages,
            'cr-pr hoverable': !(page === totalPages),
          })}
        >
          <T className="tt-se">next</T>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  );
}
