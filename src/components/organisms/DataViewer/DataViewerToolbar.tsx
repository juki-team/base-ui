import { DataViewMode, Status } from '@juki-team/commons';
import React, { Children, memo, useCallback, useEffect, useRef } from 'react';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { useJukiRouter, useJukiUI } from '../../../hooks';
import {
  FilterListIcon,
  MenuIcon,
  Popover,
  RefreshIcon,
  T,
  Tooltip,
  ViewHeadlineIcon,
  ViewModuleIcon,
} from '../../atoms';
import { ButtonLoader, SetLoaderStatusOnClickType } from '../../molecules';
import { FilterDrawer } from './FilterDrawer';
import { Pagination } from './Pagination';
import { DataViewerToolbarProps } from './types';
import { isSomethingFiltered } from './utils';

const DataViewerToolbarCmp = <T, >(props: DataViewerToolbarProps<T>) => {
  
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
    pagination,
    extraNodesFloating,
    onColumn,
    viewViews,
    showFilterDrawerKey,
  } = props;
  
  const { filtered } = isSomethingFiltered(headers);
  
  const { viewPortSize } = useJukiUI();
  
  const { searchParams, setSearchParams } = useJukiRouter();
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  const showFilterDrawer = searchParams.get(showFilterDrawerKey) === 'open' ? 'open' : 'close';
  const setShowFilterDrawer = useCallback((show: boolean) => {
    setSearchParams({ name: showFilterDrawerKey, value: show ? 'open' : 'close' });
  }, [ setSearchParams, showFilterDrawerKey ]);
  const isMobileViewPort = viewPortSize === 'sm';
  const viewFilterButton = !!headers.filter(head => head.filter || head.sort).length;
  
  useEffect(() => {
    if (loading) {
      setLoaderRef.current?.(Status.LOADING);
    } else {
      setLoaderRef.current?.(Status.NONE);
    }
  }, [ loading ]);
  
  const reloadSection = (
    <>
      <Tooltip
        content={<T className="tt-se ws-np">{loading ? 'reloading data' : 'reload data'}</T>}
        placement="top"
      >
        <ButtonLoader
          icon={<RefreshIcon />}
          size="small"
          type="light"
          onClick={onReload}
          setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
        />
      </Tooltip>
    </>
  );
  
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
          gap: onColumn || isMobileViewPort,
          'center': !(onColumn && !isMobileViewPort),
        })}
      >
        <div
          className={classNames('jk-row nowrap', {
            gap: onColumn && !isMobileViewPort,
            extend: !(viewFilterButton || viewViews),
          })}
        >
          {onReload && !isMobileViewPort && (
            <>
              {reloadSection}
              <div className="jk-divider horizontal" />
            </>
          )}
          <Tooltip
            content={
              dataLength
                ? <div className="jk-row nowrap tt-se ws-np">
                  {dataLength}&nbsp;<T>{dataLength === 1 ? 'record' : 'records'}</T>
                  {pagination.withPagination && (
                    <>&nbsp;<T>of</T>&nbsp;{pagination.total}&nbsp;<T>records</T></>
                  )}
                </div>
                : <T className="tt-se ws-np">no data</T>
            }
            placement="top"
          >
            <div className="no-records tx-s jk-tag white ws-np">
              {dataLength}{pagination.withPagination ? ' / ' + pagination.total : ''}
            </div>
          </Tooltip>
          {pagination.withPagination && (
            <Pagination
              loading={loading}
              pageSizeOptions={isMobileViewPort ? [ 20 ] : pagination.pageSizeOptions}
              total={pagination.total}
              page={pagination.page}
              pageSize={pagination.pageSize}
              jumpToPage={pagination.jumpToPage}
              onPageSizeChange={pagination.onPageSizeChange}
              isOnToolbar
            />
          )}
        </div>
        <div className={classNames('jk-row nowrap', { gap: onColumn })}>
          {onReload && isMobileViewPort && (
            <>
              {onColumn && <div className="jk-divider horizontal" />}
              {reloadSection}
            </>
          )}
          {viewFilterButton && (
            <>
              <div className="jk-divider horizontal" />
              <Tooltip content={<T className="ws-np">open filters</T>} placement="top">
                <div
                  className={classNames({ active: filtered }, 'jk-row jk-data-viewer-tools-filter jk-br-ie')}
                  onClick={() => setShowFilterDrawer(true)}
                >
                  <FilterListIcon className="jk-br-ie cr-g4" />
                </div>
              </Tooltip>
            </>
          )}
          {viewViews && (rowsView || cardsView) && (
            <>
              <div className="jk-divider horizontal" />
              <div className={classNames('jk-row nowrap jk-table-view-tools-view-mode', { rowsView, cardsView })}>
                {rowsView && (
                  <Tooltip content={<T className="tt-se ws-np">list view</T>} placement="top">
                    <div
                      className={classNames({ active: viewMode === DataViewMode.ROWS }, 'jk-row jk-br-ie')}
                      onClick={() => setViewMode(DataViewMode.ROWS, true)}
                    >
                      <ViewHeadlineIcon className="jk-br-ie cr-g4" />
                    </div>
                  </Tooltip>
                )}
                {cardsView && (
                  <Tooltip content={<T className="tt-se ws-np">cards view</T>} placement="top-end">
                    <div
                      className={classNames({ active: viewMode === DataViewMode.CARDS }, 'jk-row jk-br-ie')}
                      onClick={() => setViewMode(DataViewMode.CARDS, true)}
                    >
                      <ViewModuleIcon className="jk-br-ie cr-g4" />
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
                  content={
                    <div className="jk-pad-sm jk-col stretch gap">
                      {Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
                    </div>
                  }
                  triggerOn="click"
                  placement="topRight"
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

export const DataViewerToolbar = memo(DataViewerToolbarCmp) as typeof DataViewerToolbarCmp;
