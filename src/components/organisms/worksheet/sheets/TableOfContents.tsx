import type { WorksheetsInPages } from '@juki-team/commons';
import { QueryParamKey } from '../../../../enums';
import { classNames } from '../../../../helpers';
import { Collapse } from '../../../atoms';
import { MdMath } from '../../_layz_/MdMath';
import type { OnPageChange } from '../types';
import { LOGO_WORKSHEET_TYPE } from './logos';

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
          <div
            className={classNames('jk-col stretch jk-br-ie', { 'br-hl': page === index + 1 })}
            style={{ border: page === index + 1 ? undefined : '1px solid transparent' }}
          >
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
                  <MdMath source={header.title} />
                  {!!subTitles.length && (
                    <div
                      onClick={(event) => {
                        event.stopPropagation();
                        toggle();
                      }}
                      className="jk-row"
                    >
                      {icon}
                    </div>
                  )}
                </div>
              )}
              startsShowing
            >
              {!!subTitles.length && (
                <div className="jk-col stretch gap jk-pg-xsm-trb jk-pg-l jk-br-ie">
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
                        <MdMath source={chunk.title} />
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
