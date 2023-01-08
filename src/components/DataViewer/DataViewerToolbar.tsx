import React, { useState } from 'react';
import { classNames, renderReactNodeOrFunction } from '../../helpers';
import { FilterListIcon, LoadingIcon, MenuIcon, ReloadIcon, ViewHeadlineIcon, ViewModuleIcon } from '../graphics';
import { Popover } from '../Popover';
import { useJukiBase } from '../Provider';
import { T } from '../Translate';
import { FilterDrawer } from './FilterDrawer';
import { Pagination } from './Pagination';
import { DataViewerToolbarProps } from './types';
import { isSomethingFiltered } from './utils';

export const DataViewerToolbar = <T, >(props: DataViewerToolbarProps<T>) => {
  
  const {
    extraNodes: _extraNodes,
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
  } = props;
  
  const extraNodes = (_extraNodes || []).filter(action => !!action);
  
  const [filterDrawer, setFilterDrawer] = useState(false);
  const { filtered } = isSomethingFiltered(headers);
  const { viewPortSize } = useJukiBase();
  const onColumn = viewPortSize !== 'sm';
  
  return (
    <div
      className={classNames('jk-data-viewer-toolbar jk-border-radius-inline jk-row space-between nowrap', { 'elevation-1': viewMode === 'cards' }, viewMode)}
    >
      <FilterDrawer
        isOpen={filterDrawer}
        headers={headers}
        onClose={() => setFilterDrawer(false)}
        onFilter={values => onAllFilters(values)}
        onResetFilters={() => onAllFilters({})}
      />
      <div className="jk-table-view-extra-nodes jk-row left gap screen md lg hg">
        {extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton))}
      </div>
      <div className={classNames('jk-table-view-tools', { 'jk-row nowrap gap': onColumn, 'jk-col stretch': !onColumn })}>
        <div className={classNames('jk-row nowrap', { gap: onColumn })}>
          {onReload && (
            <Popover
              content={<T className="tt-se ws-np">{loading ? 'reloading data' : 'reload data'}</T>}
              showPopperArrow
            >
              <div className={classNames({ active: loading, loading }, 'jk-row')} onClick={!loading ? onReload : undefined}>
                {loading ? <LoadingIcon /> : <ReloadIcon className="jk-br-ie clickable" />}
              </div>
            </Popover>
          )}
          <div className="jk-divider horizontal" />
          <Popover
            content={
              dataLength
                ? <div className="jk-row nowrap tt-se ws-np">{dataLength}&nbsp;
                  <T>{dataLength > 1 ? 'records' : 'record'}</T>{paginationData.pagination?.total && <>&nbsp;
                    <T>of</T>&nbsp;{paginationData.pagination.total}&nbsp;<T>records</T></>}</div>
                : <T className="tt-se ws-np">no data</T>
            }
            showPopperArrow
          >
            <div className="no-records tx-t fw-bd jk-tag gray-6">
              {dataLength}{paginationData.pagination?.total ? '/' + paginationData.pagination.total : ''}
            </div>
          </Popover>
          {paginationData.pagination && (
            <>
              <Pagination
                loading={loading}
                pageSizeOptions={paginationData.pageSizeOptions}
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
        {onColumn && <div className="jk-divider horizontal" />}
        <div className={classNames('jk-row nowrap', { gap: onColumn })}>
          <Popover content={<T className="ws-np">open filters</T>} showPopperArrow>
            <div
              className={classNames({ active: filtered }, 'jk-row')}
              onClick={() => setFilterDrawer(true)}
            >
              <FilterListIcon className="jk-br-ie clickable" />
            </div>
          </Popover>
          <div className="jk-divider horizontal" />
          <div className={classNames('jk-row nowrap jk-table-view-tools-view-mode', { rowsView, cardsView })}>
            {rowsView && (
              <Popover content={<T className="tt-se ws-np">list view</T>} showPopperArrow>
                <div className={classNames({ active: viewMode === 'rows' }, 'jk-row')} onClick={() => setViewMode('rows')}>
                  <ViewHeadlineIcon className={classNames('jk-br-ie', { clickable: viewMode === 'cards' })} />
                </div>
              </Popover>
            )}
            {cardsView && (
              <Popover content={<T className="tt-se ws-np">cards view</T>} showPopperArrow>
                <div className={classNames({ active: viewMode === 'cards' }, 'jk-row')} onClick={() => setViewMode('cards')}>
                  <ViewModuleIcon className={classNames('jk-br-ie', { clickable: viewMode === 'rows' })} />
                </div>
              </Popover>
            )}
          </div>
          {!!extraNodes.length && (
            <>
              <div className="jk-divider horizontal screen sm" />
              <div className="screen sm">
                <Popover
                  content={extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton))}
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
