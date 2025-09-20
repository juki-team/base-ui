import React, { useEffect } from 'react';
import { classNames } from '../../../../helpers';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { Select, T } from '../../../atoms';
import { DoubleUpIcon, NavigateBeforeIcon, NavigateNextIcon, SpinIcon } from '../../../server';
import { PaginationProps } from '../types';

const SIZE_PAGES = 3;

export const Pagination = (props: PaginationProps) => {
  
  const {
    dataLength,
    total,
    page,
    pageSize,
    loading,
    initializing,
    pageSizeOptions,
    jumpToPage,
    onPageSizeChange,
    isOnToolbar,
  } = props;
  
  const startPage = 1;
  const endPage = Math.max(Math.ceil(total / pageSize), startPage);
  
  const t = useI18nStore(state => state.i18n.t);
  useEffect(() => {
    if (!initializing && (page < startPage || endPage < page)) {
      jumpToPage(startPage);
    }
  }, [ endPage, initializing, jumpToPage, page ]);
  
  useEffect(() => {
    if (!pageSizeOptions.includes(pageSize) && pageSizeOptions[0]) {
      onPageSizeChange(pageSizeOptions[0]);
      // setSearchParams(
      // { name: pageKey, value: '1', replace: true },
      // { name: pageSizeKey, value: pageSizeOptions[0] + '', replace: true },
      // );
    }
  }, [ pageSizeOptions, pageSize, onPageSizeChange ]);
  
  const pages = [ page ];
  const right = endPage - page;
  if (page > 1) {
    pages.splice(0, 0, page - 1);
  }
  if (page > 2 && SIZE_PAGES >= 5) {
    pages.splice(0, 0, page - 2);
  }
  if (page > 3 && right < 2 && SIZE_PAGES >= 5) {
    pages.splice(0, 0, page - 3);
  }
  if (page > 4 && right < 1 && SIZE_PAGES >= 5) {
    pages.splice(0, 0, page - 4);
  }
  for (let i = 0; i < 4; i++) {
    if (pages.length < SIZE_PAGES && page < endPage - i) {
      pages.push(page + 1 + i);
    }
  }
  
  const prev = page > startPage ? () => jumpToPage(page - 1) : undefined;
  const next = page < endPage ? () => jumpToPage(page + 1) : undefined;
  
  const firstItem = (page - 1) * pageSize + 1;
  
  return (
    <div className={classNames('jk-data-viewer-pagination jk-row gap center', { loading })}>
      <div className="jk-row center nowrap">
        {isOnToolbar ? (
          <div className="jk-row gap nowrap">
            <div className="jk-row nowrap jk-br-ie tx-s ws-np bc-we">
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="previous"
                className={classNames('cr-pr jk-row jk-br-ie jk-input-', { disabled: page === startPage || initializing })}
                onClick={prev}
              >
                <NavigateBeforeIcon />
              </div>
              <div
                style={{
                  // borderRight: '1px solid var(--t-color-highlight-light)',
                  padding: '0 4px',
                }}
                className="ws-np"
              >
                {dataLength ? `${firstItem} - ${firstItem + dataLength - 1}` : '0'}&nbsp;<T>of</T>&nbsp;{total}
              </div>
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="next"
                className={classNames('cr-pr jk-row jk-br-ie jk-input-', { disabled: page === endPage || initializing })}
                onClick={next}
              >
                <NavigateNextIcon />
              </div>
            </div>
            {pageSizeOptions.length > 1 && (
              <Select
                options={pageSizeOptions.map(option => ({
                  value: option,
                  label: <div className="jk-row left nowrap">{option}&nbsp;<T>per page</T></div>,
                }))}
                selectedOption={{ value: pageSize }}
                onChange={initializing ? undefined : ({ value }) => onPageSizeChange(value)}
                optionsPlacement="bottom"
                className="bc-we jk-br-ie"
              />
            )}
          </div>
        ) : (
          <>
            <div
              className={classNames('page-item cr-pr jk-row jk-border-radius screen md lg hg', { disabled: page === startPage })}
              onClick={prev}
            >
              <NavigateBeforeIcon />
            </div>
            <div className="jk-row jk-border-radius center page-items">
              {startPage < (pages[0] ?? 0) && (
                <>
                  <div
                    className={classNames('page-item cr-pr jk-row jk-border-radius cr-g3', { selected: startPage === page })}
                    onClick={() => jumpToPage(startPage)}
                  >
                    {loading && startPage === page ? <SpinIcon /> : startPage}
                  </div>
                  {startPage + 1 < (pages[0] ?? 0) && (
                    <div className="jk-row" onClick={() => jumpToPage(Math.max(page - SIZE_PAGES, startPage))}>
                      <DoubleUpIcon rotate={-90} />
                    </div>
                  )}
                </>
              )}
              {pages.map(index => (
                <div
                  key={index}
                  className={classNames('page-item cr-pr jk-row jk-border-radius fw-bd', {
                    selected: index === page,
                    'fw-br': index === page,
                  })}
                  onClick={() => jumpToPage(index)}
                >
                  {loading && index === page ? <SpinIcon /> : index}
                </div>
              ))}
              {(pages[pages.length - 1] ?? 0) < endPage && (
                <>
                  {endPage - 1 > (pages[pages.length - 1] ?? 0) && (
                    <div className="jk-row" onClick={() => jumpToPage(Math.min(page + SIZE_PAGES, endPage))}>
                      <DoubleUpIcon rotate={90} />
                    </div>
                  )}
                  <div
                    className={classNames('page-item cr-pr jk-row jk-border-radius cr-g3', { selected: endPage === page })}
                    onClick={() => jumpToPage(endPage)}
                  >
                    {loading && endPage === page ? <SpinIcon /> : endPage}
                  </div>
                </>
              )}
            </div>
            <div
              className={classNames('page-item cr-pr jk-row jk-border-radius screen md lg hg', { disabled: page === endPage })}
              onClick={next}
            >
              <NavigateNextIcon />
            </div>
          </>
        )}
      </div>
      {!isOnToolbar && (
        <Select
          options={pageSizeOptions.map(option => ({ value: option, label: option + ' / ' + t('page') }))}
          selectedOption={{ value: pageSize }}
          onChange={initializing ? undefined : ({ value }) => onPageSizeChange(value)}
          optionsPlacement="top"
          disabled={initializing}
        />
      )}
    </div>
  );
};
