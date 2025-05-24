import React, { useState } from 'react';
import { classNames } from '../../../helpers';
import { T } from '../../atoms';
import { ArrowBackIcon, ArrowForwardIcon, ViewHeadlineIcon } from '../../atoms/server';
import { TableOfContentsModal } from './sheets/TableOfContentsModal';
import { ContentsSectionHeaderProps } from './types';

export const ContentsSectionHeader = ({
                                        page,
                                        setPage,
                                        sheetsInPages,
                                        totalPages: initialTotalPages,
                                      }: ContentsSectionHeaderProps) => {
  
  const [ isOpen, setIsOpen ] = useState(false);
  
  const totalPages = initialTotalPages ?? sheetsInPages.length;
  
  return (
    <div className="jk-col stretch gap bc-we jk-br-ie cr-pd fw-bd">
      <TableOfContentsModal
        isOpen={isOpen}
        setPage={setPage}
        onClose={() => setIsOpen(false)}
        sheetsInPages={sheetsInPages}
      />
      <div className="jk-row gap center">
        <div
          onClick={page <= 1 ? undefined : () => setPage(page - 1)}
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
          onClick={page === totalPages ? undefined : () => setPage(page + 1)}
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
};
