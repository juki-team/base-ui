import { DataViewMode, Status } from '@juki-team/commons';
import React, { Children, useCallback, useEffect, useRef } from 'react';
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
                ? <div className="jk-row nowrap tt-se ws-np">{dataLength}&nbsp;
                  <T>{dataLength === 1 ? 'record' : 'records'}</T>{paginationData.pagination?.total && <>&nbsp;
                    <T>of</T>&nbsp;{paginationData.pagination.total}&nbsp;<T>records</T></>}</div>
                : <T className="tt-se ws-np">no data</T>
            }
          >
            <div className="no-records tx-t fw-bd jk-tag gray-6 ws-np" style={{ marginLeft: '4px' }}>
              {dataLength}{paginationData.pagination?.total ? ' / ' + paginationData.pagination.total : ''}
            </div>
          </Tooltip>
          {paginationData.pagination && (
            <>
              <Pagination
                loading={loading}
                pageSizeOptions={isMobileViewPort ? [ 20 ] : paginationData.pageSizeOptions}
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
          {onReload && isMobileViewPort && (
            <>
              {onColumn && <div className="jk-divider horizontal" />}
              {reloadSection}
            </>
          )}
          {viewFilterButton && (
            <>
              <div className="jk-divider horizontal" />
              <Tooltip content={<T className="ws-np">open filters</T>}>
                <div
                  className={classNames({ active: filtered }, 'jk-row')}
                  onClick={() => setShowFilterDrawer(true)}
                >
                  <FilterListIcon className={classNames('jk-br-ie cr-g4 clickable')} />
                </div>
              </Tooltip>
            </>
          )}
          {viewViews && (rowsView || cardsView) && (
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
                          'cr-g4',
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
                          'cr-g4',
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
                  content={
                    <div className="jk-pad-sm jk-col stretch gap">
                      {Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
                    </div>
                  }
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
