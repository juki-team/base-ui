import React, { useEffect } from 'react';
import { DoubleUpIcon, LoadingIcon, PaginationProps, Select, UpIcon, useT } from '../index';
import { classNames } from '../../helpers';

export const Pagination = ({ total, page, pageSize, loading, pageSizeOptions, jumpToPage, onPageSizeChange }: PaginationProps) => {
  
  const startPage = 1;
  const endPage = Math.max(Math.ceil(total / pageSize), startPage);
  
  const { t } = useT();
  useEffect(() => {
    if (page < startPage || endPage < page) {
      jumpToPage(startPage);
    }
  }, [endPage, jumpToPage, page]);
  const pages = [page];
  const right = endPage - page;
  if (page > 1) {
    pages.splice(0, 0, page - 1);
  }
  if (page > 2) {
    pages.splice(0, 0, page - 2);
  }
  if (page > 3 && right < 2) {
    pages.splice(0, 0, page - 3);
  }
  if (page > 4 && right < 1) {
    pages.splice(0, 0, page - 4);
  }
  for (let i = 0; i < 4; i++) {
    if (pages.length < 5 && page < endPage - i) {
      pages.push(page + 1 + i);
    }
  }
  
  return (
    <div className={classNames('jk-data-viewer-pagination jk-row center', { loading })}>
      <div className="jk-row center">
        <div
          className={classNames('page-item jk-row jk-border-radius', { disabled: page === startPage })}
          onClick={page > startPage ? () => jumpToPage(page - 1) : undefined}
        >
          <UpIcon rotate={-90} />
        </div>
        <div className="jk-row jk-border-radius center page-items">
          {startPage < pages[0] && (
            <>
              <div
                className={classNames('page-item jk-row jk-border-radius', { selected: startPage === page })}
                onClick={() => jumpToPage(startPage)}
              >
                {loading && startPage === page ? <LoadingIcon /> : startPage}
              </div>
              {startPage + 1 < pages[0] && (
                <div className="jk-row" onClick={() => jumpToPage(Math.max(page - 5, startPage))}>
                  <DoubleUpIcon rotate={-90} />
                </div>
              )}
            </>
          )}
          {pages.map(index => (
            <div
              key={index}
              className={classNames('page-item jk-row jk-border-radius', { selected: index === page, 'fw-br': index === page })}
              onClick={() => jumpToPage(index)}
            >
              {loading && index === page ? <LoadingIcon /> : index}
            </div>
          ))}
          {pages[pages.length - 1] < endPage && (
            <>
              {endPage - 1 > pages[pages.length - 1] && (
                <div className="jk-row" onClick={() => jumpToPage(Math.min(page + 5, endPage))}>
                  <DoubleUpIcon rotate={90} />
                </div>
              )}
              <div
                className={classNames('page-item jk-row jk-border-radius', { selected: endPage === page })}
                onClick={() => jumpToPage(endPage)}
              >
                {loading && endPage === page ? <LoadingIcon /> : endPage}
              </div>
            </>
          )}
        </div>
        <div
          className={classNames('page-item jk-row jk-border-radius', { disabled: page === endPage })}
          onClick={page < endPage ? () => jumpToPage(page + 1) : undefined}
        >
          <UpIcon rotate={90} />
        </div>
      </div>
      <Select
        options={pageSizeOptions.map(option => ({ value: option, label: option + ' / ' + t('page') }))}
        selectedOption={{ value: pageSize }}
        onChange={({ value }) => onPageSizeChange(value)}
        optionsPlacement="top"
      />
    </div>
  );
};