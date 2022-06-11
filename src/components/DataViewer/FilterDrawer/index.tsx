import React, { useEffect, useState } from 'react';
import { classNames } from '../../../helpers';
import {
  ArrowIcon,
  Button,
  CheckboxList,
  DrawerView,
  FilterIcon,
  FilterValuesType,
  Input,
  InputDate,
  OptionType,
  T,
  useT,
} from '../../index';
import { FilterDrawerProps, TableHeadType, TableSortOnSortType, TableSortOrderType } from '../types';
import {
  isDisabledEnd,
  isDisabledStart,
  isFilterDate,
  isFilterDateRange,
  isFilterSelect,
  isFilterText,
  isRangeSelected,
  isSelected,
  isSomethingFiltered,
  orDatePickerDateFun,
  renderHead,
} from '../utils';

type renderFilterTitleProps = { onSort?: TableSortOnSortType, order: TableSortOrderType, columnIndex: string, head: TableHeadType }

const renderFilterTitle = ({ head, columnIndex, onSort, order }: renderFilterTitleProps) => {
  return (
    <div className="jk-row space-between">
      <div>{renderHead({ head, columnIndex })}</div>
      {onSort ? (
        <div className={classNames('jk-row tool', { active: !!order })} onClick={() => onSort({ columnIndex })}>
          <ArrowIcon rotate={order < 0 ? 180 : 0} />
        </div>
      ) : <div />}
    </div>
  );
};

export const FilterDrawer = <T, >({ headers, isOpen, onClose, onFilter, onResetFilters }: FilterDrawerProps<T>) => {
  
  const [initialValues, setInitialValues] = useState({});
  const [values, setValues] = useState<FilterValuesType>({});
  const [isFiltered, setIsFiltered] = useState(false);
  
  const onlyValues = (obj: FilterValuesType) => {
    return Object.values(obj).map(val => {
      if (Array.isArray(val)) {
        return (val as OptionType<string>[]).map(v => v?.value || v);
      }
      return val;
    });
  };
  
  useEffect(() => {
    const { filtered, values } = isSomethingFiltered(headers);
    setInitialValues(onlyValues(values));
    setValues(values);
    setIsFiltered(filtered);
  }, [headers, isOpen]);
  const { t } = useT();
  
  return (
    <DrawerView isOpen={isOpen} onClose={onClose} closeOnEscape closeOnOutside>
      <div className="jk-drawer-filters">
        <div className="jk-row left gap title color-primary">
          <div className={classNames({ active: true }, 'jk-row')}><FilterIcon /></div>
          <T>order and filters</T>
        </div>
        <div className="jk-divider" />
        <div className="jk-col stretch space-between filters-buttons">
          <div className="filters">
            {headers.map(({ index: columnIndex, head, filter, sort: { onSort, order = 0 } = {} }) => {
              if (isFilterText(filter)) {
                return (
                  <div className="jk-col stretch" key={columnIndex}>
                    {renderFilterTitle({ head, columnIndex, onSort, order })}
                    <Input
                      onChange={newValue => setValues(prevState => ({ ...prevState, [columnIndex]: newValue }))}
                      value={(values[columnIndex] || '') as string}
                      block
                      placeholder={t('empty field')}
                    />
                  </div>
                );
              } else if (isFilterSelect(filter)) {
                return (
                  <div className="jk-col stretch" key={columnIndex}>
                    {renderFilterTitle({ head, columnIndex, onSort, order })}
                    <CheckboxList
                      options={filter.options}
                      selectedOptions={(values[columnIndex] || []) as OptionType<string>[]}
                      onSelectOptions={options => setValues(prevState => ({ ...prevState, [columnIndex]: options }))}
                    />
                  </div>
                );
              } else if (isFilterDate(filter)) {
                return (
                  <div className="jk-col stretch" key={columnIndex}>
                    {renderFilterTitle({ head, columnIndex, onSort, order })}
                    <InputDate
                      type={filter.pickerType}
                      date={(values[columnIndex] as Date)?.isValidDate?.() ? values[columnIndex] as Date : null}
                      onDatePick={date => setValues(prevState => ({ ...prevState, [columnIndex]: date }))}
                      onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                      isDisabled={filter.isDisabled}
                      isSelected={isSelected(filter.selectedDate)}
                      baseDate={filter.baseDate}
                      twoLines={filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || filter.pickerType === 'year-month-day-hours-minutes-seconds' || filter.pickerType === 'year-month-day-hours-minutes' || filter.pickerType === 'year-month-day-hours'}
                    />
                  </div>
                );
              } else if (isFilterDateRange(filter)) {
                const [start, end] = Array.isArray(values?.[columnIndex]) ? values?.[columnIndex] as [Date, Date] : [null, null];
                return (
                  <div className="jk-col stretch" key={columnIndex}>
                    {renderFilterTitle({ head, columnIndex, onSort, order })}
                    <div>
                      <div className="jk-row left text-semi-bold"><T className="text-sentence-case">from</T>&nbsp;:</div>
                      <InputDate
                        type={filter.pickerType}
                        date={start}
                        onDatePick={date => {
                          if (end && end.isValidDate()) {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [date, end] }));
                          } else {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [date, date] }));
                          }
                        }}
                        onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                        isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledStart(end))}
                        isSelected={orDatePickerDateFun(isSelected(start), isRangeSelected(start, end))}
                        baseDate={filter.baseStartDate}
                        twoLines={filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || filter.pickerType === 'year-month-day-hours-minutes-seconds' || filter.pickerType === 'year-month-day-hours-minutes' || filter.pickerType === 'year-month-day-hours'}
                      />
                    </div>
                    <div>
                      <div className="jk-row left text-semi-bold"><T className="text-sentence-case">to</T>&nbsp;:</div>
                      <InputDate
                        type={filter.pickerType}
                        date={end}
                        onDatePick={date => {
                          if (start && start.isValidDate()) {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [start, date] }));
                          } else {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [date, date] }));
                          }
                        }}
                        onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                        isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledEnd(start))}
                        isSelected={orDatePickerDateFun(isSelected(end), isRangeSelected(start, end))}
                        baseDate={filter.baseEndDate}
                        twoLines={filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' || filter.pickerType === 'year-month-day-hours-minutes-seconds' || filter.pickerType === 'year-month-day-hours-minutes' || filter.pickerType === 'year-month-day-hours'}
                      />
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          <div className="jk-row space-between right buttons">
            <Button type="text" size="small" onClick={onResetFilters} disabled={!isFiltered}>
              <T>reset all filters</T>
            </Button>
            <Button
              onClick={() => {
                onFilter(values);
                onClose();
              }}
              disabled={JSON.stringify(onlyValues(values)) === JSON.stringify(initialValues)}
            >
              <T>apply filters</T>
            </Button>
          </div>
        </div>
      </div>
    </DrawerView>
  );
};