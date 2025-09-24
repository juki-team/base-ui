import { useResizeDetector } from 'react-resize-detector';
import { classNames } from '../../../../helpers';
import { TableHeadersType } from '../types';
import { DataViewerCardProps } from './types';

export const DataViewerCard = <T, >(props: DataViewerCardProps<T>) => {
  
  const {
    cardWidth,
    index,
    data,
    headers,
    fake,
    cardStyle,
    cardClassName,
    onCardClick,
    onCardHover,
  } = props;
  
  const { height: topLeftHeight, ref: topLeftRef } = useResizeDetector();
  const { height: topHeight, ref: topRef } = useResizeDetector();
  const { height: topRightHeight, ref: topRightRef } = useResizeDetector();
  const topContainerHeight = Math.max(topLeftHeight || 0, topHeight || 0, topRightHeight || 0);
  const { height: upperLeftHeight, ref: upperLeftRef } = useResizeDetector();
  const { height: upperHeight, ref: upperRef } = useResizeDetector();
  const { height: upperRightHeight, ref: upperRightRef } = useResizeDetector();
  const upperContainerHeight = Math.max(upperLeftHeight || 0, upperHeight || 0, upperRightHeight || 0);
  const { height: centerLeftHeight, ref: centerLeftRef } = useResizeDetector();
  const { height: centerHeight, ref: centerRef } = useResizeDetector();
  const { height: centerRightHeight, ref: centerRightRef } = useResizeDetector();
  const centerContainerHeight = Math.max(centerLeftHeight || 0, centerHeight || 0, centerRightHeight || 0);
  const { height: lowerLeftHeight, ref: lowerLeftRef } = useResizeDetector();
  const { height: lowerHeight, ref: lowerRef } = useResizeDetector();
  const { height: lowerRightHeight, ref: lowerRightRef } = useResizeDetector();
  const lowerContainerHeight = Math.max(lowerLeftHeight || 0, lowerHeight || 0, lowerRightHeight || 0);
  const { height: bottomLeftHeight, ref: bottomLeftRef } = useResizeDetector();
  const { height: bottomHeight, ref: bottomRef } = useResizeDetector();
  const { height: bottomRightHeight, ref: bottomRightRef } = useResizeDetector();
  const bottomContainerHeight = Math.max(bottomLeftHeight || 0, bottomHeight || 0, bottomRightHeight || 0);
  
  if (fake) {
    return <div className="jk-list-card" style={{ width: cardWidth, opacity: 0 }} />;
  }
  const positionsList: { [key: string]: TableHeadersType<T>[] } = {};
  for (const head of headers) {
    const key = head.cardPosition || 'center';
    if (!positionsList[key]) {
      positionsList[key] = [];
    }
    positionsList[key].push(head);
  }
  
  const renderField = ({ index: columnIndex, Field }: TableHeadersType<T>) => (
    <div key={columnIndex}>
      {data[index] && <Field record={data[index]} columnIndex={columnIndex} recordIndex={index} isCard />}
    </div>
  );
  
  return (
    <div
      className={classNames('jk-list-card jk-br', cardClassName)}
      style={{ ...cardStyle, width: cardWidth }}
      onClick={onCardClick}
      onMouseEnter={onCardHover}
    >
      {(!!positionsList.topLeft?.length || !!positionsList.top?.length || !!positionsList.topRight?.length) && (
        <div
          className={classNames('top-container', { 'no-middle': !positionsList.topi?.length })}
          style={{ height: topContainerHeight }}
        >
          <div className="top-left jk-col stretch" ref={topLeftRef}>
            {positionsList.topLeft?.map(renderField)}
          </div>
          <div className="top jk-col stretch" ref={topRef}>
            {positionsList.top?.map(renderField)}
          </div>
          <div className="top-right jk-col stretch" ref={topRightRef}>
            {positionsList.topRight?.map(renderField)}
          </div>
        </div>
      )}
      {(!!positionsList.upperLeft?.length || !!positionsList.upper?.length || !!positionsList.upperRight?.length) && (
        <div
          className={classNames('upper-container', { 'no-middle': !positionsList.upper?.length })}
          style={{ height: upperContainerHeight }}
        >
          <div className="upper-left jk-col stretch" ref={upperLeftRef}>
            {positionsList.upperLeft?.map(renderField)}
          </div>
          <div className="upper jk-col stretch" ref={upperRef}>
            {positionsList.upper?.map(renderField)}
          </div>
          <div className="upper-right jk-col stretch" ref={upperRightRef}>
            {positionsList.upperRight?.map(renderField)}
          </div>
        </div>
      )}
      {(!!positionsList.centerLeft?.length || !!positionsList.center?.length || !!positionsList.centerRight?.length) && (
        <div
          className={classNames('center-container', { 'no-middle': !positionsList.center?.length })}
          style={{ height: centerContainerHeight }}
        >
          <div className="center-left jk-col stretch" ref={centerLeftRef}>
            {positionsList.centerLeft?.map(renderField)}
          </div>
          <div className="center jk-col stretch" ref={centerRef}>
            {positionsList.center?.map(renderField)}
          </div>
          <div className="center-right jk-col stretch" ref={centerRightRef}>
            {positionsList.centerRight?.map(renderField)}
          </div>
        </div>
      )}
      {(!!positionsList.lowerLeft?.length || !!positionsList.lower?.length || !!positionsList.lowerRight?.length) && (
        <div
          className={classNames('lower-container', { 'no-middle': !positionsList.lower?.length })}
          style={{ height: lowerContainerHeight }}
        >
          <div className="lower-left jk-col stretch" ref={lowerLeftRef}>
            {positionsList.lowerLeft?.map(renderField)}
          </div>
          <div className="lower jk-col stretch" ref={lowerRef}>
            {positionsList.lower?.map(renderField)}
          </div>
          <div className="lower-right jk-col stretch" ref={lowerRightRef}>
            {positionsList.lowerRight?.map(renderField)}
          </div>
        </div>
      )}
      {(!!positionsList.bottomLeft?.length || !!positionsList.bottom?.length || !!positionsList.bottomRight?.length) && (
        <div
          className={classNames('bottom-container', { 'no-middle': !positionsList.bottom?.length })}
          style={{ height: bottomContainerHeight }}
        >
          <div className="bottom-left jk-col stretch" ref={bottomLeftRef}>
            {positionsList.bottomLeft?.map(renderField)}
          </div>
          <div className="bottom jk-col stretch" ref={bottomRef}>
            {positionsList.bottom?.map(renderField)}
          </div>
          <div className="bottom-right jk-col stretch" ref={bottomRightRef}>
            {positionsList.bottomRight?.map(renderField)}
          </div>
        </div>
      )}
    </div>
  );
};
