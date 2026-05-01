import { useEffect, useMemo } from 'react';
import { useI18nStore } from '../../../stores/i18n/useI18nStore';
import { usePageStore } from '../../../stores/page/usePageStore';
import { Div, Select, T } from '../../atoms';
import { classNames } from '../../helpers';
import { DoubleUpIcon, NavigateBeforeIcon, NavigateNextIcon, SpinIcon } from '../../server';
import type { PaginationProps } from './types';

const SIZE_PAGES = 3;

const buildVisiblePages = (page: number, endPage: number): number[] => {
  const pages = [page];
  const right = endPage - page;
  if (page > 1) pages.unshift(page - 1);
  if (page > 2 && SIZE_PAGES >= 5) pages.unshift(page - 2);
  if (page > 3 && right < 2 && SIZE_PAGES >= 5) pages.unshift(page - 3);
  if (page > 4 && right < 1 && SIZE_PAGES >= 5) pages.unshift(page - 4);
  for (let i = 0; i < 4 && pages.length < SIZE_PAGES && page < endPage - i; i++) {
    pages.push(page + 1 + i);
  }
  return pages;
};

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
  const isSmallScreen = usePageStore((store) => store.viewPort.isSmallScreen);

  const t = useI18nStore((state) => state.i18n.t);
  useEffect(() => {
    if (!initializing && (page < startPage || endPage < page)) {
      jumpToPage(startPage);
    }
  }, [endPage, initializing, jumpToPage, page]);

  useEffect(() => {
    if (!pageSizeOptions.includes(pageSize) && pageSizeOptions[0]) {
      onPageSizeChange(pageSizeOptions[0]);
      // setSearchParams(
      // { name: pageKey, value: '1', replace: true },
      // { name: pageSizeKey, value: pageSizeOptions[0] + '', replace: true },
      // );
    }
  }, [pageSizeOptions, pageSize, onPageSizeChange]);

  const pages = useMemo(() => buildVisiblePages(page, endPage), [page, endPage]);

  const prev = page > startPage ? () => jumpToPage(page - 1) : undefined;
  const next = page < endPage ? () => jumpToPage(page + 1) : undefined;

  const firstItem = (page - 1) * pageSize + 1;
  const lastItem = firstItem + dataLength - 1;

  return (
    <div className={classNames('jk-data-viewer-pagination jk-row gap center', { loading })}>
      <div className="jk-row center nowrap">
        {isOnToolbar ? (
          <div className="jk-row gap nowrap">
            <div className="jk-row nowrap jk-br-ie tx-s ws-np bc-sf-md">
              <Div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="previous"
                className={classNames('cr-pr jk-row jk-br-ie jk-input-', { disabled: page === startPage || initializing })}
                onClick={prev}
                onKeyDownClick
              >
                <NavigateBeforeIcon />
              </Div>
              <div
                style={{
                  // borderRight: '1px solid var(--cr-ht-lt)',
                  padding: '0 4px',
                }}
                className="ws-np"
              >
                {dataLength ? (firstItem === lastItem ? firstItem : `${firstItem} - ${lastItem}`) : '0'}
                &nbsp;<T>of</T>&nbsp;{total}
              </div>
              <Div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="next"
                className={classNames('cr-pr jk-row jk-br-ie jk-input-', { disabled: page === endPage || initializing })}
                onClick={next}
                onKeyDownClick
              >
                <NavigateNextIcon />
              </Div>
            </div>
            {pageSizeOptions.length > 1 && (
              <Select
                options={pageSizeOptions.map((option) => ({
                  value: option,
                  label: (
                    <div className="jk-row left nowrap tx-s">
                      {option}&nbsp;<T className="">per page</T>
                    </div>
                  ),
                }))}
                selectedOption={{ value: pageSize }}
                onChange={initializing ? undefined : ({ value }) => onPageSizeChange(value)}
                optionsPlacement="bottom"
                className="bc-sf-md jk-br-ie"
              />
            )}
          </div>
        ) : (
          <>
            {!isSmallScreen && (
              <Div
                className={classNames('page-item cr-pr jk-row jk-br', { disabled: page === startPage })}
                onClick={prev}
                onKeyDownClick
              >
                <NavigateBeforeIcon />
              </Div>
            )}
            <div className="jk-row jk-br center page-items">
              {startPage < (pages[0] ?? 0) && (
                <>
                  <Div
                    className={classNames('page-item cr-pr jk-row jk-br cr-tx-sc', { selected: startPage === page })}
                    onClick={() => jumpToPage(startPage)}
                    onKeyDownClick
                  >
                    {loading && startPage === page ? <SpinIcon /> : startPage}
                  </Div>
                  {startPage + 1 < (pages[0] ?? 0) && (
                    <Div className="jk-row" onClick={() => jumpToPage(Math.max(page - SIZE_PAGES, startPage))} onKeyDownClick>
                      <DoubleUpIcon rotate={-90} />
                    </Div>
                  )}
                </>
              )}
              {pages.map((index) => (
                <Div
                  key={index}
                  className={classNames('page-item cr-pr jk-row jk-br fw-bd', {
                    selected: index === page,
                    'fw-br': index === page,
                  })}
                  onClick={() => jumpToPage(index)}
                  onKeyDownClick
                >
                  {loading && index === page ? <SpinIcon /> : index}
                </Div>
              ))}
              {(pages[pages.length - 1] ?? 0) < endPage && (
                <>
                  {endPage - 1 > (pages[pages.length - 1] ?? 0) && (
                    <Div className="jk-row" onClick={() => jumpToPage(Math.min(page + SIZE_PAGES, endPage))} onKeyDownClick>
                      <DoubleUpIcon rotate={90} />
                    </Div>
                  )}
                  <Div
                    className={classNames('page-item cr-pr jk-row jk-br-ie cr-tx-sc', { selected: endPage === page })}
                    onClick={() => jumpToPage(endPage)}
                    onKeyDownClick
                  >
                    {loading && endPage === page ? <SpinIcon /> : endPage}
                  </Div>
                </>
              )}
            </div>
            {!isSmallScreen && (
              <Div
                className={classNames('page-item cr-pr jk-row jk-br-ie', { disabled: page === endPage })}
                onClick={next}
                onKeyDownClick
              >
                <NavigateNextIcon />
              </Div>
            )}
          </>
        )}
      </div>
      {!isOnToolbar && (
        <Select
          options={pageSizeOptions.map((option) => ({ value: option, label: `${option} / ${t('page')}` }))}
          selectedOption={{ value: pageSize }}
          onChange={initializing ? undefined : ({ value }) => onPageSizeChange(value)}
          optionsPlacement="top"
          disabled={initializing}
        />
      )}
    </div>
  );
};
