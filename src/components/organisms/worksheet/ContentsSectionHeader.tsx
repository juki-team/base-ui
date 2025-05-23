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
    <div className="jk-col stretch gap bc-we jk-border-radius cr-pd fw-bd contents-section-card">
      <TableOfContentsModal
        isOpen={isOpen}
        setPage={setPage}
        onClose={() => setIsOpen(false)}
        sheetsInPages={sheetsInPages}
      />
      <div className="jk-row gap center">
        <div
          onClick={page === 0 ? undefined : () => {
            setPage((page - 1 - 1 + totalPages) % totalPages + 1);
          }}
          className={classNames('jk-row gap contents-buttons jk-pg-xsm', { disabled: page === 0 })}
        >
          <ArrowBackIcon />
          <T className="tt-se">previous</T>
        </div>
        <div
          className="jk-row"
          onClick={() => setIsOpen(true)}
        >
          <ViewHeadlineIcon />
          <T className="tt-se">table of contents</T>
        </div>
        <div
          onClick={page === totalPages - 1 ? undefined : () => {
            setPage((page) % totalPages + 1);
          }}
          className={classNames('jk-row gap contents-buttons jk-pg-xsm', { disabled: page === totalPages - 1 })}
        >
          <T className="tt-se">next</T>
          <ArrowForwardIcon />
        </div>
      </div>
    </div>
  );
};
