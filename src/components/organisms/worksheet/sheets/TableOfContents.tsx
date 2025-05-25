import { WorksheetsInPages } from '@juki-team/commons';
import React from 'react';
import { LOGO_WORKSHEET_TYPE } from '../../../../constants';
import { classNames } from '../../../../helpers';
import { OnPageChange, QueryParamKey } from '../../../../types';
import { Collapse } from '../../../atoms/Collapse/Collapse';

interface TableOfContentsProps {
  sheetsInPages: WorksheetsInPages,
  page: number,
  subPage: number,
  onPageChange: OnPageChange,
}

export const TableOfContents = ({ sheetsInPages, onPageChange, page, subPage }: TableOfContentsProps) => {
  
  return (
    <div className="jk-col gap stretch jk-pg-sm wh-100">
      {sheetsInPages.map(({ header, content }, index) => {
        
        const subTitles = content.filter(chunk => !!chunk.title.trim());
        
        return (
          <div className={classNames('jk-col stretch jk-br-ie', { 'bc-hl': page === index + 1 })}>
            <Collapse
              header={({ toggle, icon }) => (
                <div
                  className={classNames('fw-bd jk-row gap nowrap space-between stretch jk-br-ie', {
                    'hoverable': !!onPageChange,
                    'bc-hl cr-th': page === index + 1,
                  })}
                  style={{ padding: '2px 8px' }}
                  key={index}
                  onClick={() => onPageChange?.(index + 1, 1, {
                    name: QueryParamKey.PAGE_FOCUS,
                    value: 'jk-worksheet-viewer-container',
                  })}
                >
                  {header.title}
                  {!!subTitles.length && <div onClick={toggle} className="jk-row">{icon}</div>}
                </div>
              )}
              startsShowing
            >
              {!!subTitles.length && (
                <div className="jk-pg-sm jk-br-ie">
                  {subTitles.map((chunk, subIndex) => {
                    return (
                      <div
                        className={classNames('fw-bd jk-row nowrap gap left stretch jk-br-ie', {
                          'hoverable': !!onPageChange,
                          'bc-hl cr-th': page === index + 1 && subPage === subIndex + 1,
                        })}
                        style={{ padding: 2 }}
                        key={`${chunk.title}-${subIndex}`}
                        onClick={() => onPageChange?.(index + 1, subIndex + 1, {
                          name: QueryParamKey.PAGE_FOCUS,
                          value: chunk.id,
                        })}
                      >
                        {LOGO_WORKSHEET_TYPE()[chunk?.type]?.icon || null}
                        {chunk.title}
                      </div>
                    );
                  })}
                </div>
              )}
            </Collapse>
          </div>
        );
      })}
    </div>
  );
};
