import { DataViewMode } from '@juki-team/commons';
import React, { Children, CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { SCROLL_WIDTH } from '../../../../constants';
import { classNames, renderReactNodeOrFunction } from '../../../../helpers';
import { T } from '../../../atoms';
import { LineLoader } from '../../../server';
import { CardRowVirtualizerFixed } from '../CardList';
import { ViewContainerRows } from '../RowList/ViewContainerRows';
import { DisplayDataViewerProps } from '../types';
import { DataViewerToolbar } from './DataViewerToolbar';

export const DisplayDataViewer = <T, >(props: DisplayDataViewerProps<T>) => {
  
  const {
    viewPortSize,
    cards: { height: cardHeight = 300, width: cardWidth = 256, expanded: cardExpanded = false } = {
      height: 300,
      width: 256,
      expanded: false,
    },
    cardsView,
    data,
    extraNodes,
    headers,
    setHeaders,
    loading,
    initializing,
    onAllFilters,
    onReload,
    rows: { height: rowHeight = 56 } = { height: 56 },
    rowsView,
    viewMode,
    setViewMode,
    getRecordKey,
    pagination,
    getRecordStyle,
    getRecordClassName,
    onRecordClick,
    onRecordHover,
    onRecordRender,
    extraNodesFloating = false,
    showFilterDrawerKey,
    filterKey,
    filters,
    groups,
  } = props;
  
  const { width: viewContainerWidth, ref: viewContainerRef } = useResizeDetector();
  
  const isMobileViewPort = viewPortSize === 'sm';
  const viewViews = !(isMobileViewPort && (!rowsView || !cardsView));
  const onColumn = !isMobileViewPort
    || (isMobileViewPort && (extraNodes.length === 0 ? true : extraNodesFloating) && !viewViews)
    || (isMobileViewPort && (!(onReload && !isMobileViewPort) && !(pagination.withPagination)));
  
  return (
    <div
      className="jk-data-viewer-content jk-br-ie"
      style={{
        '--jk-table-toolbar-height': (onColumn ? 50 : 82) + 'px',
        position: 'relative',
        // '--jk-data-viewer-header-table-height': height + 1 + 'px',
      } as CSSProperties}
    >
      <DataViewerToolbar<T>
        setViewMode={setViewMode}
        extraNodes={extraNodes}
        headers={headers}
        setHeaders={setHeaders}
        dataLength={data.length}
        viewMode={viewMode}
        rowsView={rowsView}
        cardsView={cardsView}
        loading={loading}
        initializing={initializing}
        onReload={onReload}
        onAllFilters={onAllFilters}
        pagination={pagination}
        extraNodesFloating={extraNodesFloating}
        onColumn={onColumn}
        viewViews={viewViews}
        showFilterDrawerKey={showFilterDrawerKey}
        filterKey={filterKey}
        filters={filters}
      />
      {extraNodesFloating && isMobileViewPort && (
        <div
          className="jk-col gap nowrap"
          style={{ position: 'absolute', bottom: 'var(--pad-t)', right: 'var(--pad-t)', zIndex: 1 }}
        >
          {Children.toArray(extraNodes.map((extraButton, index) => renderReactNodeOrFunction(extraButton, index)))}
        </div>
      )}
      <div
        className={classNames('jk-view-container', viewMode.toLowerCase())}
        ref={viewContainerRef}
      >
        {data.length > 0 && loading && <LineLoader />}
        <div
          className={classNames('jk-data-viewer-body', viewMode.toLowerCase())}
          style={{ width: (viewContainerWidth || 0) }}
        >
          {data.length === 0 && loading && (
            <div className="jk-row center expand-absolute" style={{ height: '100%' }}>
              <div className="jk-row" style={{ alignItems: 'baseline' }}>
                <T className="tt-se">loading data</T>
                &nbsp;
                <div className="dot-flashing" />
              </div>
            </div>
          )}
          {viewMode === DataViewMode.ROWS ? (
            <ViewContainerRows
              headers={headers}
              setHeaders={setHeaders}
              viewContainerWidth={viewContainerWidth || 0}
              rowHeight={rowHeight}
              data={data}
              loading={loading}
              getRecordKey={getRecordKey}
              getRecordStyle={getRecordStyle}
              getRecordClassName={getRecordClassName}
              onRecordClick={onRecordClick}
              onRecordHover={onRecordHover}
              onRecordRender={onRecordRender}
              groups={groups}
            />
          ) : (
            <CardRowVirtualizerFixed
              headers={headers}
              data={data}
              cardHeight={cardHeight}
              cardWidth={cardWidth}
              rowWidth={(viewContainerWidth || 0) - SCROLL_WIDTH}
              getRecordClassName={getRecordClassName}
              getRecordStyle={getRecordStyle}
              onRecordClick={onRecordClick}
              onRecordHover={onRecordHover}
              onRecordRender={onRecordRender}
              expandedCards={cardExpanded}
            />
          )}
        </div>
      </div>
    </div>
  );
};
