import { DataViewMode, Status } from '@juki-team/commons';
import React, { Children, memo, useCallback, useEffect, useRef } from 'react';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { useJukiRouter, useJukiUI, useSessionStorage } from '../../../hooks';
import { FilterListIcon, MenuIcon, Popover, RefreshIcon, ViewHeadlineIcon, ViewModuleIcon } from '../../atoms';
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
    initializing,
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
  
  const { searchParams } = useJukiRouter();
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>();
  
  const [ showFilterDrawer, _setShowFilterDrawer ] = useSessionStorage(showFilterDrawerKey, searchParams.get(showFilterDrawerKey) === 'open' ? 'open' : 'close');
  const setShowFilterDrawer = useCallback((show: boolean) => {
    // setSearchParams({ name: showFilterDrawerKey, value: show ? 'open' : 'close' });
    _setShowFilterDrawer(show ? 'open' : 'close');
  }, [ _setShowFilterDrawer ]);
  const isMobileViewPort = viewPortSize === 'sm';
  const viewFilterButton = !!headers.filter(head => head.filter || head.sort).length;
  
  useEffect(() => {
    if (loading) {
      setLoaderRef.current?.(Status.LOADING);
    } else {
      setLoaderRef.current?.(Status.NONE);
    }
  }, [ loading ]);
  
  const reloadSection = onReload && (
    <ButtonLoader
      icon={<RefreshIcon />}
      size="small"
      type="light"
      onClick={onReload}
      setLoaderStatusRef={setLoader => setLoaderRef.current = setLoader}
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={loading ? 'reloading data' : 'reload data'}
      data-tooltip-t-class-name="tt-se ws-np"
    />
  );
  
  return (
    <div
      className={classNames(
        'jk-data-viewer-toolbar jk-row space-between nowrap',
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
              {pagination.withPagination && <div className="jk-divider horizontal" />}
            </>
          )}
          {pagination.withPagination && (
            <Pagination
              dataLength={dataLength}
              loading={loading}
              initializing={initializing}
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
              <div
                data-tooltip-id="jk-tooltip"
                data-tooltip-content="open filters"
                data-tooltip-t-class-name="tt-se ws-np"
                className={classNames({ active: filtered }, 'jk-row jk-data-viewer-tools-filter jk-br-ie')}
                onClick={() => setShowFilterDrawer(true)}
              >
                <FilterListIcon className="jk-br-ie cr-g4" />
              </div>
            </>
          )}
          {viewViews && (rowsView || cardsView) && (
            <>
              <div className="jk-divider horizontal" />
              <div className={classNames('jk-row nowrap jk-table-view-tools-view-mode', { rowsView, cardsView })}>
                {rowsView && (
                  <div
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="list view"
                    data-tooltip-t-class-name="tt-se ws-np"
                    className={classNames({ active: viewMode === DataViewMode.ROWS }, 'jk-row rows jk-br-ie')}
                    onClick={() => setViewMode(DataViewMode.ROWS, true)}
                  >
                    <ViewHeadlineIcon className="jk-br-ie cr-g4" />
                  </div>
                )}
                {cardsView && (
                  <div
                    data-tooltip-id="jk-tooltip"
                    data-tooltip-content="cards view"
                    data-tooltip-t-class-name="tt-se ws-np"
                    className={classNames({ active: viewMode === DataViewMode.CARDS }, 'jk-row cards jk-br-ie')}
                    onClick={() => setViewMode(DataViewMode.CARDS, true)}
                  >
                    <ViewModuleIcon className="jk-br-ie cr-g4" />
                  </div>
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
                    <div className="jk-pg-sm jk-col stretch gap">
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
