import type { WorksheetsInPages } from '@juki-team/commons';
import { QueryParamKey } from '../../../../../enums';
import { Collapse } from '../../../../atoms';
import { classNames } from '../../../../helpers';
import { MdMath } from '../../MdMath';
import { OnPageChange } from '../../WorksheetViewer/types';
import { LOGO_WORKSHEET_TYPE } from './logos';

interface TableOfContentsProps {
  sheetsInPages: WorksheetsInPages,
  page: number,
  subPage: number,
  onPageChange: OnPageChange,
}

export const TableOfContents = ({ sheetsInPages, onPageChange, page, subPage }: TableOfContentsProps) => {
  
  return (
    <div className="jk-col gap stretch jk-pg-xsm wh-100 tx-t">
      {sheetsInPages.map(({ header, content }, index) => {
        
        const subTitles = content.filter(chunk => !!chunk.title.trim());
        
        return (
          <div
            key={index}
            className={classNames('jk-col stretch jk-br-ie br-hl', { 'br-hlaa': page === index + 1 })}
            style={{ border: page === index + 100 ? undefined : '1px solid transparent' }}
          >
            <Collapse
              header={({ toggle, Icon }) => (
                <div
                  className={classNames('jk-row gap nowrap space-between stretch jk-br-ie', {
                    'hoverable': !!onPageChange,
                    'cr-tx-ht fw-br': page === index + 1,
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
                      <Icon size="small" />
                    </div>
                  )}
                </div>
              )}
              startsShowing
            >
              {!!subTitles.length && (
                <div className="jk-col stretch jk-pg-xsm-rb jk-pg-l jk-br-ie">
                  {subTitles.map((chunk, subIndex) => {
                    const subTitleSelected = page === index + 1 && subPage === subIndex + 1;
                    return (
                      <div
                        className={classNames('jk-row nowrap gap left stretch jk-pg-xsm', {
                          'fw-bd': subTitleSelected,
                          'hoverable jk-br-ie': !subTitleSelected && !!onPageChange,
                        })}
                        style={{
                          borderLeft: page === index + 1 && subPage === subIndex + 1 ? '3px solid var(--cr-tx-ht-lt)' : '3px solid transparent',
                        }}
                        key={`${chunk.title}-${subIndex}`}
                        onClick={() => onPageChange?.(index + 1, subIndex + 1, {
                          name: QueryParamKey.PAGE_FOCUS,
                          value: chunk.id,
                        })}
                      >
                        {LOGO_WORKSHEET_TYPE('small')[chunk?.type]?.icon || null}
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
