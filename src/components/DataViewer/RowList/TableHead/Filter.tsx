import React, { useState } from 'react';
import { FilterIcon, Popover } from '../../../index';
import { classNames } from '../../../../helpers';
import { TableHeaderFilterType } from '../../types';
import { isFilterDate, isFilterDateRange, isFilterSelect, isFilterText } from '../../utils';
import { TableHeadFilterDate } from './TableHeadFilterDate';
import { TableHeadFilterDateRange } from './TableHeadFilterDateRange';
import { TableHeadFilterSelect } from './TableHeadFilterSelect';
import { TableHeadFilterText } from './TableHeadFilterText';

export const Filter = ({ filter, columnIndex }: { filter?: TableHeaderFilterType, columnIndex: string }) => {
  
  const [visible, setVisible] = useState(false);
  
  return (
    <Popover
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      content={(visible) => {
        const onReset = () => {
          filter?.onReset();
          setVisible(false);
        };
        if (isFilterText(filter)) {
          return (
            <TableHeadFilterText
              columnIndex={columnIndex}
              initialText={filter.text}
              onFilter={props => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              visible={visible}
            />
          );
        } else if (isFilterSelect(filter)) {
          return (
            <TableHeadFilterSelect
              visible={visible}
              columnIndex={columnIndex}
              options={filter.options}
              initialSelectedOptions={filter.selectedOptions}
              onFilter={props => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
            />
          );
        } else if (isFilterDate(filter)) {
          return (
            <TableHeadFilterDate
              visible={visible}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialSelectedDate={filter.selectedDate}
              onFilter={props => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              baseDate={filter.baseDate}
            />
          );
        } else if (isFilterDateRange(filter)) {
          return (
            <TableHeadFilterDateRange
              visible={visible}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialStartSelectedDate={filter.startSelectedDate}
              initialEndSelectedDate={filter.endSelectedDate}
              onFilter={props => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              baseStartDate={filter.baseStartDate}
              baseEndDate={filter.baseEndDate}
            />
          );
        } else {
          return <div>FILTER</div>;
        }
      }}
      placement="bottom"
      triggerOn={['click']}
      triggerOff={['click', 'escape']}
      showPopperArrow
    >
      <div
        className={classNames('jk-row tool', {
          active: isFilterText(filter) ? !!filter.text
            : isFilterSelect(filter) ? !!filter.selectedOptions.length
              : isFilterDate(filter) ? !!filter.selectedDate?.isValidDate()
                : isFilterDateRange(filter) ? !!filter.startSelectedDate?.isValidDate() && !!filter.endSelectedDate?.isValidDate()
                  : false,
          visible,
        })}>
        <FilterIcon size="small" />
      </div>
    </Popover>
  );
};