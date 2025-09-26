import { cleanRequest, type ContentResponseType, DataViewMode, Status } from '@juki-team/commons';
import {
  type ElementType,
  memo,
  type MouseEventHandler,
  type PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { TriggerAction } from '../../../../../enums';
import { classNames, downloadUrlAsFile, getAuthorizedRequest, renderReactNodeOrFunction } from '../../../../helpers';
import { useRouterStore } from '../../../../../stores/router/useRouterStore';
import { MultiSelect, Popover, Select } from '../../../../atoms';
import { TableEyeIcon } from '../../../../atoms/server';
import { useJukiNotification } from '../../../../hooks/useJukiNotification';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { useSessionStorage } from '../../../../hooks/useSessionStorage';
import {
  CalendarViewWeekIcon,
  DownloadIcon,
  FilterListIcon,
  MenuIcon,
  RefreshIcon,
  SpinIcon,
  ViewModuleIcon,
} from '../../../../server';
import type { SetLoaderStatusOnClickType } from '../../../../types';
import { FilterDrawer } from '../FilterDrawer';
import type { DataViewerToolbarProps } from '../types';
import { Pagination } from './Pagination';
import { isSomethingFiltered, renderHead } from './utils';

const buttonFilterStyles = (active: boolean) => classNames(
  {
    'bc-pl cr-pt': active,
    'bc-we': !active,
    active,
  },
  'jk-row jk-data-viewer-tools-filter jk-br-ie cr-pr jk-row nowrap',
);

interface ToolbarButtonIconProps {
  Icon: ElementType,
  onClick?: MouseEventHandler<HTMLDivElement>,
  active?: boolean,
  tooltipContent: string,
  className?: string,
  rotate?: number,
  disabled?: boolean,
}

const ToolbarButtonIcon = ({
                             Icon,
                             active,
                             onClick,
                             tooltipContent,
                             className = '',
                             children,
                             rotate,
                             disabled = false,
                           }: PropsWithChildren<ToolbarButtonIconProps>) => (
  <div
    data-tooltip-id="jk-tooltip"
    data-tooltip-content={tooltipContent}
    className={classNames(buttonFilterStyles(!!active), className, { disabled })}
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
    toolbarRef,
    // setHeaders,
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
    showFilterDrawerKey,
    filterKey,
    filters,
    downloads,
    requestProps,
    // withVerticalScroll,
  } = props;
  
  const { filtered, values } = isSomethingFiltered(headers);
  const [ downloading, setDownloading ] = useState(false);
  const { viewPortSize } = useJukiUI();
  const { notifyResponse } = useJukiNotification();
  
  const searchParams = useRouterStore(state => state.searchParams);
  
  const setLoaderRef = useRef<SetLoaderStatusOnClickType>(undefined);
  
  const [ showFilterDrawer, _setShowFilterDrawer ] = useSessionStorage(showFilterDrawerKey, searchParams.get(showFilterDrawerKey) === 'open' ? 'open' : 'close');
  const setShowFilterDrawer = useCallback((show: boolean) => {
    // setSearchParams({ name: showFilterDrawerKey, value: show ? 'open' : 'close' });
    _setShowFilterDrawer(show ? 'open' : 'close');
  }, [ _setShowFilterDrawer ]);
  const isMobileViewPort = viewPortSize === 'sm';
  const viewViews = !(isMobileViewPort && (!rowsView || !cardsView));
  const viewFilterButton = !!headers.filter(head => head.filter || head.sort).length;
  
  useEffect(() => {
    if (loading) {
      setLoaderRef.current?.(Status.LOADING);
    } else {
      setLoaderRef.current?.(Status.NONE);
    }
  }, [ loading ]);
  
  const url = new URL(window?.location?.href || '');
  url.searchParams.set(filterKey, JSON.stringify(filters));
  
  const visibles = headers.filter(filter => filter.visible?.getVisible()).length;
  
  return (
    <div
      className={classNames(
        'jk-data-viewer-toolbar with-vertical-scroll pn-re jk-row space-between nowrap jk-br-ie jk-pg-xsm-rl',
        viewMode.toLowerCase(),
        // { 'with-vertical-scroll': withVerticalScroll },
      )}
      ref={toolbarRef}
      // style={withVerticalScroll && viewMode === DataViewMode.ROWS ? { marginRight: SCROLL_WIDTH } : {}}
    >
      <FilterDrawer
        isOpen={showFilterDrawer === 'open'}
        headers={headers}
        // setHeaders={setHeaders}
        onClose={() => setShowFilterDrawer(false)}
        onFilter={values => onAllFilters(values)}
        onResetFilters={() => onAllFilters({})}
      />
      {!isMobileViewPort && (
        <div className="jk-table-view-extra-nodes jk-row left gap">
          {extraNodes.map(renderReactNodeOrFunction)}
        </div>
      )}
      <div className="jk-table-view-tools jk-br-ie jk-pg-xsm-tb jk-row-col gap stretch">
        <div className="jk-row nowrap gap">
          {onReload && (
            <ToolbarButtonIcon
              Icon={loading ? SpinIcon : RefreshIcon}
              tooltipContent={loading ? 'reloading data' : 'reload data'}
              active={loading}
              onClick={onReload}
              className="jk-input-select"
              key="reload-button-icon"
            />
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
              key="first-row-pagination"
            />
          )}
        </div>
        <div className={classNames('jk-row nowrap gap')}>
          {viewFilterButton && (
            <ToolbarButtonIcon
              Icon={FilterListIcon}
              tooltipContent="open filters"
              onClick={() => setShowFilterDrawer(true)}
              active={filtered}
              className="jk-input-select"
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
          )}
          {!!downloads.length && (
            <Select
              options={downloads}
              onChange={async ({ value }) => {
                setDownloading(true);
                const downloadItem = downloads.find(download => value === download.value);
                const url = downloadItem?.getUrl(requestProps) ?? '';
                const filename = downloadItem?.getFilename(requestProps) ?? '';
                const result = cleanRequest<ContentResponseType<{ urlExportedFile: string }>>(
                  await getAuthorizedRequest(url),
                );
                if (result.success) {
                  await downloadUrlAsFile(result.content.urlExportedFile, filename);
                  notifyResponse(result);
                }
                setDownloading(false);
              }}
              selectedOption={{ value: '' }}
              containerWidth="child"
            >
              <ToolbarButtonIcon
                Icon={downloading ? SpinIcon : DownloadIcon}
                tooltipContent={downloading ? 'downloading' : 'download'}
                className="jk-input-select"
                onClick={downloading
                  ? ((event) => event.stopPropagation())
                  : undefined}
              />
            </Select>
          )}
          <MultiSelect
            options={headers.map((header) => ({
              label: renderHead({ header, columnIndex: header.index }),
              value: header.index,
            }))}
            selectedOptions={headers.filter(({ visible }) => visible?.getVisible?.()).map(({ index }) => ({ value: index }))}
            containerWidth="child"
            onChange={(_, lastOptionChanged) => {
              const header = headers.find(head => head.index === lastOptionChanged?.value);
              header?.visible.onToggle();
            }}
          >
            <ToolbarButtonIcon
              Icon={TableEyeIcon}
              tooltipContent="visibility of columns"
              className="jk-input-select"
              active={visibles !== headers.length}
            >
              <>
                &nbsp;
                <span className="bc-hl jk-br-ie ws-np" style={{ lineHeight: 1, padding: '0 4px' }}>
                      {visibles} / {headers.length}
                    </span>
                &nbsp;
              </>
            </ToolbarButtonIcon>
          </MultiSelect>
          {/*<div>*/}
          {/*  {filtered ? (*/}
          {/*    <CopyToClipboard text={url.toString()}>*/}
          {/*      <ToolbarButtonIcon*/}
          {/*        Icon={ContentCopyIcon}*/}
          {/*        tooltipContent="copy the link of the filtered table"*/}
          {/*      />*/}
          {/*    </CopyToClipboard>*/}
          {/*  ) : (*/}
          {/*    <ToolbarButtonIcon*/}
          {/*      Icon={ContentCopyIcon}*/}
          {/*      tooltipContent="first filter something so that you can copy the link of the filtered table"*/}
          {/*      active={filtered}*/}
          {/*    />*/}
          {/*  )}*/}
          {/*</div>*/}
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
                  popoverClassName="bc-we jk-br-ie elevation-1"
                  content={
                    <div className="jk-pg-sm jk-col stretch gap">
                      {extraNodes.map(renderReactNodeOrFunction)}
                    </div>
                  }
                  triggerOn={TriggerAction.CLICK}
                  placement="bottom"
                  // showPopperArrow
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
