import React, { useState } from 'react';
import { classNames, renderReactNodeOrFunction } from '../../helpers';
import { FilterIcon, LoadingIcon, ReloadIcon, UnorderedListIcon, ViewModuleIcon } from '../graphics';
import { Popover } from '../Popover';
import { T } from '../Translate';
import { FilterDrawer } from './FilterDrawer';
import { DataViewerToolbarProps } from './types';
import { isSomethingFiltered } from './utils';

export const DataViewerToolbar = <T, >(props: DataViewerToolbarProps<T>) => {
  
  const {
    extraButtons,
    setViewMode,
    headers,
    viewMode,
    dataLength,
    rowsView,
    cardsView,
    loading,
    onReload,
    onAllFilters,
  } = props;
  
  const [filterDrawer, setFilterDrawer] = useState(false);
  const { filtered } = isSomethingFiltered(headers);
  
  return (
    <div className={classNames('jk-data-viewer-toolbar jk-border-radius-inline jk-row space-between', { 'jk-shadow': viewMode === 'cards' }, viewMode)}>
      <FilterDrawer
        isOpen={filterDrawer}
        headers={headers}
        onClose={() => setFilterDrawer(false)}
        onFilter={values => onAllFilters(values)}
        onResetFilters={() => onAllFilters({})}
      />
      <div>
        {renderReactNodeOrFunction(extraButtons)}
      </div>
      <div className="jk-row gap jk-table-view-tools">
        <Popover content={<T className="ws-np">open filters</T>} showPopperArrow>
          <div
            className={classNames({ active: filtered }, 'jk-row')}
            onClick={() => setFilterDrawer(true)}
          >
            <FilterIcon />
          </div>
        </Popover>
        <div className="jk-divider horizontal" />
        <Popover
          content={
            dataLength ? <div className="tt-se ws-np">{dataLength} <T>{dataLength > 1 ? 'records' : 'record'}</T></div> :
              <T className="tt-se ws-np">no data</T>
          }
          showPopperArrow
        >
          <div className="no-records tx-xs fw-bd jk-tag gray-6">
            {dataLength}
          </div>
        </Popover>
        {onReload && (
          <Popover
            content={<T className="tt-se ws-np">{loading ? 'reloading data' : 'reload data'}</T>}
            showPopperArrow
          >
            <div className={classNames({ active: loading, loading }, 'jk-row')} onClick={!loading ? onReload : undefined}>
              {loading ? <LoadingIcon /> : <ReloadIcon />}
            </div>
          </Popover>
        )}
        <div className="jk-divider horizontal" />
        {rowsView && (
          <Popover content={<T className="tt-se ws-np">list view</T>} showPopperArrow>
            <div className={classNames({ active: viewMode === 'rows' }, 'jk-row')} onClick={() => setViewMode('rows')}>
              <UnorderedListIcon />
            </div>
          </Popover>
        )}
        {cardsView && (
          <Popover content={<T className="tt-se ws-np">cards view</T>} showPopperArrow>
            <div className={classNames({ active: viewMode === 'cards' }, 'jk-row')} onClick={() => setViewMode('cards')}>
              <ViewModuleIcon />
            </div>
          </Popover>
        )}
      </div>
    </div>
  );
};