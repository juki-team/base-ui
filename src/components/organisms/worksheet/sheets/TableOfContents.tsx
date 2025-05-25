import { WorksheetsInPages } from '@juki-team/commons';
import React from 'react';
import { LOGO_WORKSHEET_TYPE } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { Collapse } from '../../../atoms/Collapse/Collapse';

interface TableOfContentsProps {
  sheetsInPages: WorksheetsInPages,
  page?: number,
  subPage?: number,
  onClick: ((index: number, subIndex?: { index: number, id: string }) => void) | undefined,
}

export const TableOfContents = ({ sheetsInPages, onClick, page, subPage }: TableOfContentsProps) => {
  
  return (
    <div className="jk-col gap stretch jk-pg-sm wh-100">
      {sheetsInPages.map(({ header, content }, index) => {
        
        const subTitles = content.filter(chunk => !!chunk.title.trim());
        
        return (
          <Collapse
            header={({ toggle, icon }) => (
              <div
                className={classNames('fw-bd jk-row gap nowrap space-between stretch jk-br-ie', {
                  'hoverable': !!onClick,
                  'bc-hl': page === index + 1,
                })}
                style={{ padding: '2px 8px' }}
                key={index}
                onClick={() => onClick?.(index + 1)}
              >
                {header.title}
                {!!subTitles.length && <div onClick={toggle} className="jk-row">{icon}</div>}
              </div>
            )}
            startsShowing
          >
            <div className="jk-pg-l">
              {subTitles.map((chunk, subIndex) => {
                return (
                  <div
                    className={classNames('fw-bd jk-row nowrap gap left stretch jk-br-ie', {
                      'hoverable': !!onClick,
                      'bc-hl': subPage === subIndex + 1,
                    })}
                    style={{ padding: 2 }}
                    key={`${chunk.title}-${subIndex}`}
                    onClick={() => onClick?.(index + 1, { index: subIndex + 1, id: chunk.id })}
                  >
                    {LOGO_WORKSHEET_TYPE()[chunk?.type]?.icon || null}
                    {chunk.title}
                  </div>
                );
              })}
            </div>
          </Collapse>
        );
      })}
    </div>
  );
};
