import { DataViewMode } from '@juki-team/commons';
import React, { Children, CSSProperties } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { SCROLL_WIDTH } from '../../../constants';
import { classNames, renderReactNodeOrFunction } from '../../../helpers';
import { LineLoader } from '../../atoms';
import { JukiLoadingLayout } from '../../molecules';
import { CardRowVirtualizerFixed } from './CardList';
import { DataViewerToolbar } from './DataViewerToolbar';
import { ViewContainerRows } from './RowList/ViewContainerRows';
import { DisplayDataViewerProps } from './types';

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
    extraNodesFloating = false,
    showFilterDrawerKey,
    filterKey,
    filters,
  } = props;
  
  const { width: viewContainerWidth, ref: viewContainerRef } = useResizeDetector();
  const { height = 0, ref: headerRef } = useResizeDetector();
  
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
        '--jk-data-viewer-header-table-height': height + 1 + 'px',
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
          {Children.toArray(extraNodes.map(extraButton => renderReactNodeOrFunction(extraButton)))}
        </div>
      )}
      <div
        className={classNames('jk-view-container', viewMode.toLowerCase())}
        ref={viewContainerRef}
      >
        {data.length > 0 && loading && <LineLoader />}
        {viewMode === DataViewMode.ROWS ? (
          <ViewContainerRows
            headers={headers}
            setHeaders={setHeaders}
            viewContainerWidth={viewContainerWidth || 0}
            headerRef={headerRef}
            rowHeight={rowHeight}
            data={data}
            loading={loading}
            viewMode={viewMode}
            getRecordKey={getRecordKey}
            getRecordStyle={getRecordStyle}
            getRecordClassName={getRecordClassName}
            onRecordClick={onRecordClick}
          />
        ) : (
          <div
            className={classNames('jk-data-viewer-body', viewMode.toLowerCase())}
            style={{ width: (viewContainerWidth || 0) }}
          >
            {data.length === 0 && loading && <JukiLoadingLayout />}
            <CardRowVirtualizerFixed
              headers={headers}
              data={data}
              cardHeight={cardHeight}
              cardWidth={cardWidth}
              rowWidth={(viewContainerWidth || 0) - SCROLL_WIDTH}
              getRecordClassName={getRecordClassName}
              getRecordStyle={getRecordStyle}
              onRecordClick={onRecordClick}
              expandedCards={cardExpanded}
            />
          </div>
        )}
      </div>
    </div>
  );
};
