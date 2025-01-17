import { DataViewMode, Status } from '@juki-team/commons';
import React, {
  Children,
  ElementType,
  memo,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
} from 'react';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { useJukiRouter, useJukiUI, useSessionStorage } from '../../../hooks';
import {
  CalendarViewWeekIcon,
  ContentCopyIcon,
  CopyToClipboard,
  FilterListIcon,
  MenuIcon,
  Popover,
  RefreshIcon,
  SpinIcon,
  ViewModuleIcon,
} from '../../atoms';
import { SetLoaderStatusOnClickType } from '../../molecules/types';
import { FilterDrawer } from './FilterDrawer';
import { Pagination } from './Pagination';
import { DataViewerToolbarProps } from './types';
import { isSomethingFiltered } from './utils';

const buttonFilterStyles = (active: boolean) => classNames(
  {
    'bc-pl cr-pt': active,
    'bc-we': !active,
    active,
  },
  'jk-row jk-data-viewer-tools-filter jk-br-ie cursor-pointer jk-row nowrap',
);

interface ToolbarButtonIconProps {
  Icon: ElementType,
  onClick?: () => void,
  active?: boolean,
  tooltipContent: string,
  className?: string,
  rotate?: number,
}

const ToolbarButtonIcon = ({
                             Icon,
                             active,
                             onClick,
                             tooltipContent,
                             className = '',
                             children,
                             rotate,
                           }: PropsWithChildren<ToolbarButtonIconProps>) => (
  <div
    data-tooltip-id="jk-tooltip"
    data-tooltip-content={tooltipContent}
    className={buttonFilterStyles(!!active) + ' ' + className}
    onClick={onClick}
  >
    <Icon className="jk-br-ie" size="small" rotate={rotate} />{children}
  </div>
);

const DataViewerToolbarCmp = <T, >(props: DataViewerToolbarProps<T>) => {
  
  const {
    extraNodes,
    setViewMode,
    headers,
    setHeaders,
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
    filterKey,
    filters,
  } = props;
  
  const { filtered, values } = isSomethingFiltered(headers);
  
  const { viewPortSize } = useJukiUI();
  
  const { searchParams } = useJukiRouter();
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
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
    <ToolbarButtonIcon
      Icon={loading ? SpinIcon : RefreshIcon}
      tooltipContent={loading ? 'reloading data' : 'reload data'}
      active={loading}
      onClick={onReload}
      key="reload-button-icon"
    />
  );
  
  const url = new URL(window?.location?.href || '');
  url.searchParams.set(filterKey, JSON.stringify(filters));
  
  const firstRow: ReactNode[] = [];
  
  if (onReload && !isMobileViewPort) {
    firstRow.push(<>
        {reloadSection}
        {pagination.withPagination && <div className="jk-divider horizontal" key="reload-button-icon-divider" />}
      </>,
    );
  }
  
  if (pagination.withPagination) {
    firstRow.push(
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
        key="first-row-pagination"
      />,
    );
  }
  
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
        setHeaders={setHeaders}
        onClose={() => setShowFilterDrawer(false)}
        onFilter={values => onAllFilters(values)}
        onResetFilters={() => onAllFilters({})}
      />
      <div className="jk-table-view-extra-nodes jk-row left gap screen md lg hg">
        {Children.toArray(extraNodes.map((extraButton, index) => renderReactNodeOrFunction(extraButton, index)))}
      </div>
      <div
        className={classNames('jk-table-view-tools jk-br-ie bc-hl', {
          'jk-row nowrap': onColumn,
          'jk-col stretch': !onColumn,
          gap: onColumn || isMobileViewPort,
          'center': !(onColumn && !isMobileViewPort),
        })}
      >
        {!!firstRow.length && (
          <div
            className={classNames('jk-row nowrap', {
              gap: onColumn && !isMobileViewPort,
              extend: !(viewFilterButton || viewViews),
            })}
          >
            {Children.toArray(firstRow)}
          </div>
        )}
        <div className={classNames('jk-row nowrap', { gap: onColumn })}>
          {onReload && isMobileViewPort && (
            <>
              {onColumn && <div className="jk-divider horizontal" />}
              {reloadSection}
            </>
          )}
          {viewFilterButton && (
            <>
              {(onReload && isMobileViewPort ? true : (!!firstRow.length && onColumn)) && (
                <div className="jk-divider horizontal" />
              )}
              <ToolbarButtonIcon
                Icon={FilterListIcon}
                tooltipContent="open filters"
                onClick={() => setShowFilterDrawer(true)}
                active={filtered}
              >
                {!!Object.values(values).length && (
                  <>
                    &nbsp;
                    <span className="bc-hl jk-br-ie" style={{ lineHeight: 1, padding: '0 4px' }}>
                      {Object.values(values).length}
                    </span>
                    &nbsp;
                  </>
                )}
              </ToolbarButtonIcon>
              <div>
                {filtered ? (
                  <CopyToClipboard text={url.toString()}>
                    <ToolbarButtonIcon
                      Icon={ContentCopyIcon}
                      tooltipContent="copy the link of the filtered table"
                    />
                  </CopyToClipboard>
                ) : (
                  <ToolbarButtonIcon
                    Icon={ContentCopyIcon}
                    tooltipContent="first filter something so that you can copy the link of the filtered table"
                    active={filtered}
                  />
                )}
              </div>
            </>
          )}
          {viewViews && (rowsView || cardsView) && (
            <>
              <div className="jk-divider horizontal" />
              <div className={classNames('jk-row nowrap jk-table-view-tools-view-mode', { rowsView, cardsView })}>
                {rowsView && (
                  <ToolbarButtonIcon
                    Icon={CalendarViewWeekIcon}
                    tooltipContent="list view"
                    className="rows"
                    active={viewMode === DataViewMode.ROWS}
                    onClick={() => setViewMode(DataViewMode.ROWS, true)}
                    rotate={90}
                  />
                )}
                {cardsView && (
                  <ToolbarButtonIcon
                    Icon={ViewModuleIcon}
                    tooltipContent="cards view"
                    data-tooltip-place="top-end"
                    className="cards"
                    active={viewMode === DataViewMode.CARDS}
                    onClick={() => setViewMode(DataViewMode.CARDS, true)}
                  />
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
                      {Children.toArray(extraNodes.map((extraButton, index) => renderReactNodeOrFunction(extraButton, index)))}
                    </div>
                  }
                  triggerOn="click"
                  placement="bottom"
                  showPopperArrow
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
