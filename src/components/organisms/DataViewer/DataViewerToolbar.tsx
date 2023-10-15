import { DataViewMode } from '@juki-team/commons';
import React, { Children, useCallback } from 'react';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { useJukiUI } from '../../../hooks';
import {
  FilterListIcon,
  LoadingIcon,
  MenuIcon,
  Popover,
  ReloadIcon,
  T,
  Tooltip,
  ViewHeadlineIcon,
  ViewModuleIcon,
} from '../../atoms';
import { FilterDrawer } from './FilterDrawer';
import { Pagination } from './Pagination';
import { DataViewerToolbarProps } from './types';
import { isSomethingFiltered } from './utils';

export const DataViewerToolbar = <T, >(props: DataViewerToolbarProps<T>) => {
  
  const {
    extraNodes,
    setViewMode,
    headers,
    viewMode,
    dataLength,
    rowsView,
    cardsView,
    loading,
    onReload,
    onAllFilters,
    paginationData,
    extraNodesFloating,
    onColumn,
    viewViews,
    showFilterDrawerKey,
  } = props;
  
  const { filtered } = isSomethingFiltered(headers);
  const { viewPortSize, router: { searchParams, setSearchParams } } = useJukiUI();
  
  const showFilterDrawer = searchParams.get(showFilterDrawerKey) === 'open' ? 'open' : 'close';
  const setShowFilterDrawer = useCallback((show: boolean) => {
    setSearchParams({ name: showFilterDrawerKey, value: show ? 'open' : 'close' });
  }, [ setSearchParams, showFilterDrawerKey ]);
  const isMobileViewPort = viewPortSize === 'sm';
  const viewFilterButton = !!headers.filter(head => head.filter || head.sort).length;
  
  return (
    <div
      className={classNames(
        'jk-data-viewer-toolbar jk-row space-between nowrap',
        //{ 'jk-br-ie elevation-1': viewMode === DataViewMode.CARDS },
        viewMode.toLowerCase(),
      )}
    >
      <FilterDrawer
        isOpen={showFilterDrawer === 'open'}
        headers={headers}
        onClose={() => setShowFilterDrawer(false)}
        onFilter={values => onAllFilters(values)}
        onResetFilters={() => onAllFilters({})}
      />
      <div className="jk-table-view-extra-nodes jk-row left gap screen md lg hg">
        {Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
      </div>
      <div
        className={classNames('jk-table-view-tools', {
          'jk-row nowrap': onColumn,
          'jk-col stretch': !onColumn,
          gap: onColumn && !isMobileViewPort,
          'center': !(onColumn && !isMobileViewPort),
        })}
      >
        <div
          className={classNames('jk-row nowrap', {
            gap: onColumn && !isMobileViewPort,
            extend: !(viewFilterButton || viewViews),
          })}
        >
          
          {onReload && (
            <>
              <Tooltip
                content={<T className="tt-se ws-np">{loading ? 'reloading data' : 'reload data'}</T>}
              >
                <div
                  className={classNames({ active: loading, loading }, 'jk-row')}
                  onClick={!loading ? onReload : undefined}
                >
                  {loading ? <LoadingIcon /> : <ReloadIcon className="jk-br-ie clickable" />}
                </div>
              </Tooltip>
              <div className="jk-divider horizontal" />
            </>
          )}
          <Tooltip
            content={
              dataLength
                ? <div className="jk-row nowrap tt-se ws-np">{dataLength}&nbsp;
                  <T>{dataLength > 1 ? 'records' : 'record'}</T>{paginationData.pagination?.total && <>&nbsp;
                          <T>of</T>&nbsp;{paginationData.pagination.total}&nbsp;<T>records</T></>}</div>
                : <T className="tt-se ws-np">no data</T>
            }
          >
            <div className="no-records tx-t fw-bd jk-tag gray-6" style={{ marginLeft: '4px' }}>
              {dataLength}{paginationData.pagination?.total ? '/' + paginationData.pagination.total : ''}
            </div>
          </Tooltip>
          {paginationData.pagination && (
            <>
              <Pagination
                loading={loading}
                pageSizeOptions={isMobileViewPort ? [ 16 ] : paginationData.pageSizeOptions}
                total={paginationData.pagination.total}
                page={paginationData.page}
                pageSize={paginationData.pageSize}
                jumpToPage={paginationData.jumpToPage}
                onPageSizeChange={paginationData.onPageSizeChange}
                isOnToolbar
              />
            </>
          )}
        </div>
        <div className={classNames('jk-row nowrap', { gap: onColumn })}>
          {viewFilterButton && (
            <>
              {onColumn && <div className="jk-divider horizontal" />}
              <Tooltip content={<T className="ws-np">open filters</T>}>
                <div
                  className={classNames({ active: filtered }, 'jk-row')}
                  onClick={() => setShowFilterDrawer(true)}
                >
                  <FilterListIcon className="jk-br-ie clickable" />
                </div>
              </Tooltip>
            </>
          )}
          {viewViews && (
            <>
              <div className="jk-divider horizontal" />
              <div className={classNames('jk-row nowrap jk-table-view-tools-view-mode', { rowsView, cardsView })}>
                {rowsView && (
                  <Tooltip content={<T className="tt-se ws-np">list view</T>}>
                    <div
                      className={classNames({ active: viewMode === DataViewMode.ROWS }, 'jk-row')}
                      onClick={() => setViewMode(DataViewMode.ROWS)}
                    >
                      <ViewHeadlineIcon
                        className={classNames(
                          'jk-br-ie',
                          { clickable: viewMode === DataViewMode.CARDS },
                        )}
                      />
                    </div>
                  </Tooltip>
                )}
                {cardsView && (
                  <Tooltip content={<T className="tt-se ws-np">cards view</T>}>
                    <div
                      className={classNames({ active: viewMode === DataViewMode.CARDS }, 'jk-row')}
                      onClick={() => setViewMode(DataViewMode.CARDS)}
                    >
                      <ViewModuleIcon
                        className={classNames(
                          'jk-br-ie',
                          { clickable: viewMode === DataViewMode.ROWS },
                        )}
                      />
                    </div>
                  </Tooltip>
                )}
              </div>
            </>
          )}
          {!!extraNodes.length && isMobileViewPort && !extraNodesFloating && (
            <>
              <div className="jk-divider horizontal" />
              <div>
                <Popover
                  content={Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
                  triggerOn="click"
                  placement="bottomRight"
                >
                  <div className="jk-row"><MenuIcon /></div>
                </Popover>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
