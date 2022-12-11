import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../helpers';
import { TableHeadersWithWidthType } from '../types';
import { renderField } from '../utils';
import { DataViewerCardProps } from './types';

export const DataViewerCard = <T, >({ cardWidth, index, data, headers, fake }: DataViewerCardProps<T>) => {
  
  const { height: topLeftHeight, ref: topLeftRef } = useResizeDetector();
  const { height: topHeight, ref: topRef } = useResizeDetector();
  const { height: topRightHeight, ref: topRightRef } = useResizeDetector();
  const topContainerHeight = Math.max(topLeftHeight || 0, topHeight || 0, topRightHeight || 0);
  const { height: centerLeftHeight, ref: centerLeftRef } = useResizeDetector();
  const { height: centerHeight, ref: centerRef } = useResizeDetector();
  const { height: centerRightHeight, ref: centerRightRef } = useResizeDetector();
  const centerContainerHeight = Math.max(centerLeftHeight || 0, centerHeight || 0, centerRightHeight || 0);
  const { height: bottomLeftHeight, ref: bottomLeftRef } = useResizeDetector();
  const { height: bottomHeight, ref: bottomRef } = useResizeDetector();
  const { height: bottomRightHeight, ref: bottomRightRef } = useResizeDetector();
  const bottomContainerHeight = Math.max(bottomLeftHeight || 0, bottomHeight || 0, bottomRightHeight || 0);
  
  if (fake) {
    return <div className="jk-list-card" style={{ width: cardWidth, opacity: 0 }} />;
  }
  const positionsList: { [key: string]: TableHeadersWithWidthType<T>[] } = {};
  for (const head of headers) {
    if (!positionsList[head.cardPosition || 'center']) {
      positionsList[head.cardPosition || 'center'] = [];
    }
    positionsList[head.cardPosition || 'center'].push(head);
  }
  
  return (
    <div className="jk-list-card jk-border-radius" style={{ width: cardWidth }}>
      <div
        className={classNames('top-container', { 'no-middle': !positionsList.top?.length })}
        style={{ height: topContainerHeight }}
      >
        <div className="top-left jk-col" ref={topLeftRef}>
          {positionsList.topLeft?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="top jk-col" ref={topRef}>
          {positionsList.top?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="top-right jk-col" ref={topRightRef}>
          {positionsList.topRight?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
      </div>
      <div
        className={classNames('center-container', { 'no-middle': !positionsList.center?.length })}
        style={{ height: centerContainerHeight }}
      >
        <div className="center-left jk-col" ref={centerLeftRef}>
          {positionsList.centerLeft?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="center jk-col" ref={centerRef}>
          {positionsList.center?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="center-right jk-col" ref={centerRightRef}>
          {positionsList.centerRight?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
      </div>
      <div
        className={classNames('bottom-container', { 'no-middle': !positionsList.bottom?.length })}
        style={{ height: bottomContainerHeight }}
      >
        <div className="bottom-left jk-col" ref={bottomLeftRef}>
          {positionsList.bottomLeft?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="bottom jk-col" ref={bottomRef}>
          {positionsList.bottom?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
        <div className="bottom-right jk-col" ref={bottomRightRef}>
          {positionsList.bottomRight?.map(head => <div key={head.index}>{renderField(data, index, true)(head)}</div>)}
        </div>
      </div>
    </div>
  );
};
