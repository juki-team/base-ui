import { BodyWorksheetType, WorksheetsInPages } from '@juki-team/commons';
import React, { Dispatch } from 'react';
import { LOGO_WORKSHEET_TYPE } from '../../../../constants';
import { classNames } from '../../../../helpers';

interface TableOfContentsProps {
  sheetsInPages: WorksheetsInPages,
  setSheets?: Dispatch<BodyWorksheetType[]>,
  page?: number,
  onClick: ((index: number) => void) | undefined,
}

export const TableOfContents = ({ sheetsInPages, onClick, page, setSheets }: TableOfContentsProps) => {
  return (
    <div className="jk-col gap stretch jk-pg-sm wh-100">
      {sheetsInPages.map(({ header, content }, index) => {
        return (
          <div
            className={classNames('fw-bd jk-row space-between stretch jk-br-ie', {
              'hoverable': !!onClick,
              'bc-hl': page === index + 1,
            })}
            key={index}
            onClick={() => onClick?.(index + 1)}
          >
            <div
              style={{ padding: 2 }}
              key={`${header.title}-${index}`}
              className="jk-row gap nowrap flex-1 left"
            >
              {LOGO_WORKSHEET_TYPE()[content[0]?.type] || null}
              {header.title}
            </div>
          </div>
        );
      })}
    </div>
  );
};
