import React, { useEffect } from 'react';
import { classNames } from '../../../helpers';
import { useT } from '../../../hooks/useT';
import { DoubleUpIcon, NavigateBeforeIcon, NavigateNextIcon, Select, SpinIcon, T, Tooltip } from '../../atoms';
import { PaginationProps } from './types';

const SIZE_PAGES = 3;

export const Pagination = (props: PaginationProps) => {
  
  const {
    total,
    page,
    pageSize,
    loading,
    pageSizeOptions,
    jumpToPage,
    onPageSizeChange,
    isOnToolbar,
  } = props;
  
  const startPage = 1;
  const endPage = Math.max(Math.ceil(total / pageSize), startPage);
  
  const { t } = useT();
  
  useEffect(() => {
    if (page < startPage || endPage < page) {
      jumpToPage(startPage);
    }
  }, [ endPage, jumpToPage, page ]);
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
  
  return (
    <div className={classNames('jk-data-viewer-pagination jk-row gap center', { loading })}>
      <div className="jk-row center nowrap">
        {isOnToolbar ? (
          <div className="jk-row gap nowrap">
            <div className="jk-row nowrap">
              <Tooltip content={<T>previous</T>}>
                <div
                  className={classNames('page-item jk-row jk-border-radius', { disabled: page === startPage })}
                  onClick={prev}
                >
                  <NavigateBeforeIcon className="jk-br-ie clickable" />
                </div>
              </Tooltip>
              &nbsp;
              <Tooltip
                content={(
                  <div className="jk-row nowrap">
                    {page}&nbsp;<T>page</T>&nbsp;<T>of</T>&nbsp;{endPage}&nbsp;<T>pages</T>
                  </div>
                )}
              >
                <div className="jk-row nowrap">{page}&nbsp;<T>of</T>&nbsp;{endPage}</div>
              </Tooltip>
              &nbsp;
              <Tooltip content={<T>next</T>}>
                <div
                  className={classNames('page-item jk-row jk-border-radius', { disabled: page === endPage })}
                  onClick={next}
                >
                  <NavigateNextIcon className="jk-br-ie clickable" />
                </div>
              </Tooltip>
            </div>
            {pageSizeOptions.length > 1 && (
              <Tooltip content={<T className="tt-se ws-np">records per page</T>}>
                <div>
                  <Select
                    options={pageSizeOptions.map(option => ({ value: option, label: option }))}
                    selectedOption={{ value: pageSize }}
                    onChange={({ value }) => onPageSizeChange(value)}
                    optionsPlacement="bottom"
                  />
                </div>
              </Tooltip>
            )}
          </div>
        ) : (
          <>
            <div
              className={classNames('page-item jk-row jk-border-radius screen md lg hg', { disabled: page === startPage })}
              onClick={prev}
            >
              <NavigateBeforeIcon />
            </div>
            <div className="jk-row jk-border-radius center page-items">
              {startPage < pages[0] && (
                <>
                  <div
                    className={classNames('page-item jk-row jk-border-radius cr-g3', { selected: startPage === page })}
                    onClick={() => jumpToPage(startPage)}
                  >
                    {loading && startPage === page ? <SpinIcon /> : startPage}
                  </div>
                  {startPage + 1 < pages[0] && (
                    <div className="jk-row" onClick={() => jumpToPage(Math.max(page - SIZE_PAGES, startPage))}>
                      <DoubleUpIcon rotate={-90} />
                    </div>
                  )}
                </>
              )}
              {pages.map(index => (
                <div
                  key={index}
                  className={classNames('page-item jk-row jk-border-radius fw-bd', {
                    selected: index === page,
                    'fw-br': index === page,
                  })}
                  onClick={() => jumpToPage(index)}
                >
                  {loading && index === page ? <SpinIcon /> : index}
                </div>
              ))}
              {pages[pages.length - 1] < endPage && (
                <>
                  {endPage - 1 > pages[pages.length - 1] && (
                    <div className="jk-row" onClick={() => jumpToPage(Math.min(page + SIZE_PAGES, endPage))}>
                      <DoubleUpIcon rotate={90} />
                    </div>
                  )}
                  <div
                    className={classNames('page-item jk-row jk-border-radius cr-g3', { selected: endPage === page })}
                    onClick={() => jumpToPage(endPage)}
                  >
                    {loading && endPage === page ? <SpinIcon /> : endPage}
                  </div>
                </>
              )}
            </div>
            <div
              className={classNames('page-item jk-row jk-border-radius screen md lg hg', { disabled: page === endPage })}
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
          onChange={({ value }) => onPageSizeChange(value)}
          optionsPlacement="top"
        />
      )}
    </div>
  );
};
