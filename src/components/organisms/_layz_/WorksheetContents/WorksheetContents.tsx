import { useState } from 'react';
import { QueryParamKey } from '../../../../enums';
import { Div, T } from '../../../atoms';
import { ArrowBackIcon, ArrowForwardIcon, ViewHeadlineIcon } from '../../../atoms/server';
import { classNames } from '../../../helpers';
import { TableOfContentsModal } from '../WorksheetEditor/sheets/TableOfContentsModal';
import type { WorksheetContentsProps } from './types';

// biome-ignore lint/style/noDefaultExport: lazy component
export default function WorksheetContents(props: WorksheetContentsProps) {
  const { page, subPage, onPageChange, sheetsInPages } = props;

  const [isOpen, setIsOpen] = useState(false);

  const totalPages = sheetsInPages.length;

  return (
    <div className="jk-col stretch gap bc-sf-md jk-br-ie cr-tx-ht-dk fw-bd">
      <TableOfContentsModal
        page={page}
        subPage={subPage}
        isOpen={isOpen}
        onPageChange={onPageChange}
        onClose={() => setIsOpen(false)}
        sheetsInPages={sheetsInPages}
      />
      <div className="jk-row gap center">
        <Div
          onClick={
            page <= 1
              ? undefined
              : () =>
                  onPageChange(page - 1, 1, {
                    name: QueryParamKey.PAGE_FOCUS,
                    value: 'jk-worksheet-viewer-container',
                  })
          }
          className={classNames('jk-row gap jk-pg-xsm jk-br-ie', {
            'cr-tx-ds': page <= 1,
            'cr-pr hoverable': !(page <= 1),
          })}
          onKeyDownClick
        >
          <ArrowBackIcon />
          <T className="tt-se">previous</T>
        </Div>
        <Div className="jk-row cr-pr hoverable jk-br-ie jk-pg-xsm" onClick={() => setIsOpen(true)} onKeyDownClick>
          <ViewHeadlineIcon />
          <T className="tt-se">table of contents</T>
        </Div>
        <Div
          onClick={
            page === totalPages
              ? undefined
              : () =>
                  onPageChange(page + 1, 1, {
                    name: QueryParamKey.PAGE_FOCUS,
                    value: 'jk-worksheet-viewer-container',
                  })
          }
          className={classNames('jk-row gap jk-pg-xsm jk-br-ie', {
            'cr-tx-ds': page === totalPages,
            'cr-pr hoverable': !(page === totalPages),
          })}
          onKeyDownClick
        >
          <T className="tt-se">next</T>
          <ArrowForwardIcon />
        </Div>
      </div>
    </div>
  );
}
