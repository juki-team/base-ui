import { memo, type ReactElement } from 'react';
import { classNames } from '../../../../helpers';
import type { TableHeadersType } from '../types';
import type { CardSections, DataViewerCardProps } from './types';

const SECTIONS = [
  ['top', 'topLeft', 'top', 'topRight'],
  ['upper', 'upperLeft', 'upper', 'upperRight'],
  ['center', 'centerLeft', 'center', 'centerRight'],
  ['lower', 'lowerLeft', 'lower', 'lowerRight'],
  ['bottom', 'bottomLeft', 'bottom', 'bottomRight'],
] as const;

/** Group the columns by card position once per headers change (not once per card render). */
export const getCardSections = <T,>(headers: TableHeadersType<T>[]): CardSections<T> => {
  const sections: CardSections<T> = {};
  for (const head of headers) {
    const key = head.cardPosition || 'center';
    (sections[key] ??= []).push(head);
  }
  return sections;
};

const DataViewerCardCmp = <T,>(props: DataViewerCardProps<T>) => {
  const { cardWidth, index, data, sections, fake, getRecordStyle, getRecordClassName, onRecordClick, onRecordHover } = props;

  if (fake) {
    return <div className="jk-list-card" style={{ width: cardWidth, opacity: 0 }} />;
  }

  const record = data[index];
  const renderField = ({ index: columnIndex, Field }: TableHeadersType<T>) => (
    <div key={columnIndex}>{record && <Field record={record} columnIndex={columnIndex} recordIndex={index} isCard />}</div>
  );

  return (
    <div
      className={classNames(
        'jk-list-card jk-br',
        getRecordClassName?.({ data, index, isCard: true, isStickySection: false }) || '',
      )}
      style={{ ...(getRecordStyle?.({ data, index, isCard: true, isStickySection: false }) || {}), width: cardWidth }}
      onClick={onRecordClick ? () => onRecordClick({ data, index, isCard: true }) : undefined}
      onMouseEnter={onRecordHover ? () => onRecordHover({ data, index, isCard: true }) : undefined}
    >
      {SECTIONS.map(([name, leftKey, middleKey, rightKey]) => {
        const left = sections[leftKey];
        const middle = sections[middleKey];
        const right = sections[rightKey];
        if (!left?.length && !middle?.length && !right?.length) {
          return null;
        }
        // The section height is the tallest of its three parts: the parts share one CSS grid cell
        // (see .jk-list-card in _data-viewer.scss), so no ResizeObserver per part is needed.
        return (
          // the original `topi` typo made the top section always behave as "no-middle"; kept as is
          <div key={name} className={classNames(`${name}-container`, { 'no-middle': name === 'top' || !middle?.length })}>
            <div className={`${leftKey.replace(/([A-Z])/g, '-$1').toLowerCase()} jk-col stretch`}>{left?.map(renderField)}</div>
            <div className={`${name} jk-col stretch`}>{middle?.map(renderField)}</div>
            <div className={`${rightKey.replace(/([A-Z])/g, '-$1').toLowerCase()} jk-col stretch`}>
              {right?.map(renderField)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

// Memoized: while scrolling only the cards entering the viewport render.
export const DataViewerCard = memo(DataViewerCardCmp) as <T>(props: DataViewerCardProps<T>) => ReactElement;
