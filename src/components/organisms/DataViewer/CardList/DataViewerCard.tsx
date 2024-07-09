import React from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../../helpers';
import { TableHeadersWithWidthType } from '../types';
import { DataViewerCardProps } from './types';

export const DataViewerCard = <T, >(props: DataViewerCardProps<T>) => {
  
  const {
    cardWidth,
    index,
    data,
    headers,
    fake,
    recordHoveredIndex,
    setRecordHoveredIndex,
    cardStyle,
    cardClassName,
    onCardClick,
  } = props;
  
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
    <div
      className={classNames('jk-list-card jk-border-radius', cardClassName, { 'elevation-1': recordHoveredIndex === index })}
      style={{ ...cardStyle, width: cardWidth }}
      onMouseEnter={() => setRecordHoveredIndex(index)}
      onMouseLeave={() => setRecordHoveredIndex(null)}
      onClick={onCardClick}
    >
      <div
        className={classNames('top-container', { 'no-middle': !positionsList.top?.length })}
        style={{ height: topContainerHeight }}
      >
        <div className="top-left jk-col stretch" ref={topLeftRef}>
          {positionsList.topLeft?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="top jk-col stretch" ref={topRef}>
          {positionsList.top?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="top-right jk-col stretch" ref={topRightRef}>
          {positionsList.topRight?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames('center-container', { 'no-middle': !positionsList.center?.length })}
        style={{ height: centerContainerHeight }}
      >
        <div className="center-left jk-col stretch" ref={centerLeftRef}>
          {positionsList.centerLeft?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="center jk-col stretch" ref={centerRef}>
          {positionsList.center?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="center-right jk-col stretch" ref={centerRightRef}>
          {positionsList.centerRight?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
      </div>
      <div
        className={classNames('bottom-container', { 'no-middle': !positionsList.bottom?.length })}
        style={{ height: bottomContainerHeight }}
      >
        <div className="bottom-left jk-col stretch" ref={bottomLeftRef}>
          {positionsList.bottomLeft?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="bottom jk-col stretch" ref={bottomRef}>
          {positionsList.bottom?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
        <div className="bottom-right jk-col stretch" ref={bottomRightRef}>
          {positionsList.bottomRight?.map(({ index: columnIndex, Field }) => (
            <div key={columnIndex}>
              <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
