import { isValidDate } from '@juki-team/commons/helpers';
import { useState } from 'react';
import { TriggerAction } from '../../../../../../enums';
import { Popover } from '../../../../../atoms';
import { classNames } from '../../../../../helpers/commons';
import { FilterListIcon } from '../../../../../server';
import { isFilterDate, isFilterDateRange, isFilterSelect, isFilterText } from '../../commons/utils';
import type { TableHeaderFilterType } from '../../types';
import { TableHeadFilterDate } from './TableHeadFilterDate';
import { TableHeadFilterDateRange } from './TableHeadFilterDateRange';
import { TableHeadFilterSelect } from './TableHeadFilterSelect';
import { TableHeadFilterText } from './TableHeadFilterText';

interface FilterProps {
  filter?: TableHeaderFilterType;
  columnIndex: string;
  disabled: boolean;
}

// TODO: disabled (?)
export const Filter = ({ filter, columnIndex }: FilterProps) => {
  const [visible, setVisible] = useState(false);

  const filtered = isFilterText(filter)
    ? !!filter.getFilter()
    : isFilterSelect(filter)
      ? !!filter.getFilter().length
      : isFilterDate(filter)
        ? (() => {
            const f = filter.getFilter();
            return !!(f && isValidDate(f));
          })()
        : isFilterDateRange(filter)
          ? (() => {
              const [s, e] = filter.getFilter() ?? [];
              return !!(s && isValidDate(s) && e && isValidDate(e));
            })()
          : false;
  return (
    <Popover
      popoverClassName="bc-sf-hi jk-br-ie elevation-1"
      onOpenChange={setVisible}
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
              onFilter={(props) => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              visible={isOpen}
            />
          );
        }
        if (isFilterSelect(filter)) {
          return (
            <TableHeadFilterSelect
              visible={isOpen}
              columnIndex={columnIndex}
              options={filter.options}
              initialSelectedOptions={filter.getFilter()}
              onFilter={(props) => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
            />
          );
        }
        if (isFilterDate(filter)) {
          return (
            <TableHeadFilterDate
              visible={isOpen}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialSelectedDate={filter.getFilter()}
              onFilter={(props) => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              baseDate={filter.baseDate}
            />
          );
        }
        if (isFilterDateRange(filter)) {
          return (
            <TableHeadFilterDateRange
              visible={isOpen}
              pickerType={filter.pickerType}
              columnIndex={columnIndex}
              isDisabled={filter.isDisabled}
              initialStartSelectedDate={filter.getFilter()[0]}
              initialEndSelectedDate={filter.getFilter()[1]}
              onFilter={(props) => {
                filter.onFilter(props);
                setVisible(false);
              }}
              onReset={onReset}
              baseStartDate={filter.baseStartDate}
              baseEndDate={filter.baseEndDate}
            />
          );
        }
        return <div>FILTER</div>;
      }}
      placement="bottom"
      triggerOn={TriggerAction.CLICK}
      offset={4}
      // showPopperArrow
    >
      <div
        className={classNames('tool jk-row jk-br-ie', {
          'bc-at-lt cr-at-it active': filtered,
          'cr-hd': !filtered,
          visible,
          // disabled,
        })}
      >
        <FilterListIcon size="small" />
      </div>
    </Popover>
  );
};
