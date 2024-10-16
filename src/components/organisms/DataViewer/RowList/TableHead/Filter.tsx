import React, { useState } from 'react';
import { classNames } from '../../../../../helpers';
import { FilterListIcon, Popover } from '../../../../atoms';
import { TableHeaderFilterType } from '../../types';
import { isFilterDate, isFilterDateRange, isFilterSelect, isFilterText } from '../../utils';
import { TableHeadFilterDate } from './TableHeadFilterDate';
import { TableHeadFilterDateRange } from './TableHeadFilterDateRange';
import { TableHeadFilterSelect } from './TableHeadFilterSelect';
import { TableHeadFilterText } from './TableHeadFilterText';

interface FilterProps {
  filter?: TableHeaderFilterType,
  columnIndex: string,
  disabled: boolean,
}

export const Filter = ({ filter, columnIndex, disabled }: FilterProps) => {
  
  const [ visible, setVisible ] = useState(false);
  
  return (
    <Popover
      visible={visible}
      onVisibleChange={(visible) => setVisible(visible)}
      content={({ isOpen }) => {
        const onReset = () => {
          filter?.onReset();
          setVisible(false);
        };
        if (isFilterText(filter)) {
          return (
            <TableHeadFilterText
              columnIndex={columnIndex}
              initialText={filter.getFilter()}
              onFilter={props => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              visible={isOpen}
            />
          );
        } else if (isFilterSelect(filter)) {
          return (
            <TableHeadFilterSelect
              visible={isOpen}
              columnIndex={columnIndex}
              options={filter.options}
              initialSelectedOptions={filter.getFilter()}
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
              visible={isOpen}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialSelectedDate={filter.getFilter()}
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
              visible={isOpen}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialStartSelectedDate={filter.getFilter()[0]}
              initialEndSelectedDate={filter.getFilter()[1]}
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
      triggerOn={[ 'click' ]}
      triggerOff={[ 'click', 'escape' ]}
      showPopperArrow
    >
      <div
        className={classNames('jk-button light only-icon small tool', {
          active: isFilterText(filter) ? !!filter.getFilter()
            : isFilterSelect(filter) ? !!filter.getFilter().length
              : isFilterDate(filter) ? !!filter.getFilter()?.isValidDate()
                : isFilterDateRange(filter) ? !!filter.getFilter()?.[0]?.isValidDate() && !!filter.getFilter()?.[1]?.isValidDate()
                  : false,
          visible,
          // disabled,
        })}
      >
        <FilterListIcon size="small" />
      </div>
    </Popover>
  );
};
