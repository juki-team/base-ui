import type { WorksheetsInPages } from '@juki-team/commons/types';
import { QueryParamKey } from '../../../../../enums';
import { Collapse, Div } from '../../../../atoms';
import { classNames } from '../../../../helpers';
import { MdMath } from '../../MdMath';
import type { OnPageChange } from '../../WorksheetViewer/types';
import { LOGO_WORKSHEET_TYPE } from './logos';

interface TableOfContentsProps {
  sheetsInPages: WorksheetsInPages;
  page: number;
  subPage: number;
  onPageChange: OnPageChange;
}

export const TableOfContents = ({ sheetsInPages, onPageChange, page, subPage }: TableOfContentsProps) => {
  return (
    <div className="jk-col gap stretch jk-pg-xsm wh-100 tx-t">
      {sheetsInPages.map(({ header, content }, index) => {
        const subTitles = content.filter((chunk) => !!chunk.title.trim());
        const isHeaderSelected = !(page !== index + 1 || subPage !== 1);

        return (
          <div
            key={header.id}
            className={classNames('jk-col stretch', { 'bc-ht-lt': page === index + 1 })}
            style={{
              borderLeft: page === index + 1 ? '3px solid var(--cr-tx-ht-lt)' : '3px solid transparent',
              borderTopRightRadius: 'var(--border-radius-inline)',
              borderBottomRightRadius: 'var(--border-radius-inline)',
            }}
          >
            <Collapse
              header={({ toggle, Icon }) => (
                <Div
                  className={classNames('jk-row gap nowrap space-between stretch jk-br-ie ', {
                    hoverable: !!onPageChange && page !== index + 1,
                    'cr-pr': !isHeaderSelected,
                  })}
                  style={{ padding: '2px 8px' }}
                  onClick={
                    !isHeaderSelected
                      ? () =>
                          onPageChange?.(index + 1, 1, {
                            name: QueryParamKey.PAGE_FOCUS,
                            value: 'jk-worksheet-viewer-container',
                          })
                      : undefined
                  }
                  onKeyDownClick
                >
                  <MdMath source={header.title} flatView className="jk-col" />
                  {!!subTitles.length && (
                    // biome-ignore lint/a11y/noStaticElementInteractions: collapse toggle inside a clickable header; keyboard handled by parent
                    // biome-ignore lint/a11y/useKeyWithClickEvents: handler stops propagation; outer Div handles keyboard
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
                </Div>
              )}
              startsShowing
            >
              {!!subTitles.length && (
                <div className="jk-col stretch jk-pg-xsm-rb jk-pg-l jk-br-ie">
                  {subTitles.map((chunk, subIndex) => {
                    const subTitleSelected = page === index + 1 && subPage === subIndex + 1;
                    return (
                      <Div
                        className={classNames('jk-row nowrap gap left stretch jk-pg-xsm', {
                          'fw-bd': subTitleSelected,
                          'hoverable jk-br-ie': !subTitleSelected && !!onPageChange,
                        })}
                        style={{
                          borderLeft:
                            page === index + 1 && subPage === subIndex + 1
                              ? '3px solid var(--cr-tx-ht-lt)'
                              : '3px solid transparent',
                        }}
                        key={chunk.id}
                        onClick={() =>
                          onPageChange?.(index + 1, subIndex + 1, {
                            name: QueryParamKey.PAGE_FOCUS,
                            value: chunk.id,
                          })
                        }
                        onKeyDownClick
                      >
                        {LOGO_WORKSHEET_TYPE('small')[chunk?.type]?.icon || null}
                        <MdMath source={chunk.title} flatView />
                      </Div>
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
