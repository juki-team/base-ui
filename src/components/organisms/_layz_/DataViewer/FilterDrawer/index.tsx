import { isValidDate } from '@juki-team/commons/helpers';
import { useEffect, useState } from 'react';
import { useT } from '../../../../atoms/T/client';
import { Button, Div, Input, T } from '../../../../atoms';
import { classNames } from '../../../../helpers/commons';
import { upperFirst } from '../../../../helpers/text';
import { CheckboxList, DrawerView, InputDate } from '../../../../molecules';
import type { OptionType } from '../../../../molecules/types';
import { ArrowDownwardIcon, ArrowUpwardIcon, FilterListIcon, SortIcon } from '../../../../server';
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
} from '../commons/utils';
import type {
  DataViewerTableHeadersType,
  FilterDrawerProps,
  FilterValuesType,
  TableSortOnSortType,
  TableSortOrderType,
} from '../types';

interface RenderFilterTitleProps<T> {
  onSort?: TableSortOnSortType;
  order: TableSortOrderType;
  columnIndex: string;
  header: DataViewerTableHeadersType<T>;
  // visibility: boolean,
  // onToggleVisibility: () => void,
}

const RenderFilterTitle = <T,>({
  // visibility,
  // onToggleVisibility,
  header,
  columnIndex,
  onSort,
  order,
}: RenderFilterTitleProps<T>) => {
  return (
    <div className="jk-row space-between">
      <div className="jk-row gap">
        {/*<InputToggle*/}
        {/*  data-tooltip-id="jk-tooltip"*/}
        {/*  data-tooltip-content={visibility ? 'hide column' : 'enable column'}*/}
        {/*  data-tooltip-place="left"*/}
        {/*  checked={visibility}*/}
        {/*  onChange={onToggleVisibility}*/}
        {/*/>*/}
        <div className="fw-bd">{renderHead({ header, columnIndex })}</div>
      </div>
      {onSort ? (
        <Div
          className={classNames('jk-row nowrap jk-tag tx-s cr-pr', { 'bc-at-lt cr-at-it': !!order, 'bc-ht-lt': !order })}
          onClick={() => onSort({ columnIndex })}
          onKeyDownClick
        >
          <T className="tt-se">sort</T>
          &nbsp;
          {order === 0 ? <SortIcon /> : order > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </Div>
      ) : (
        <div />
      )}
    </div>
  );
};

const onlyValues = (obj: FilterValuesType) => {
  return Object.values(obj).map((val) => {
    if (Array.isArray(val)) {
      return (val as OptionType<string>[]).map((v) => v?.value || v);
    }
    return val;
  });
};

export const FilterDrawer = <T,>(props: FilterDrawerProps<T>) => {
  const { headers, /*setHeaders,*/ isOpen, onClose, onFilter, onResetFilters } = props;

  const [initialValues, setInitialValues] = useState({});
  const [values, setValues] = useState<FilterValuesType>({});
  const [isFiltered, setIsFiltered] = useState(false);

  // biome-ignore lint/correctness/useExhaustiveDependencies: isOpen is a change trigger to re-sync filter values when drawer reopens
  useEffect(() => {
    const { filtered, values } = isSomethingFiltered(headers);
    setInitialValues(onlyValues(values));
    setValues(values);
    setIsFiltered(filtered);
  }, [headers, isOpen]);

  const t = useT();

  return (
    <DrawerView isOpen={isOpen} onClose={onClose} closeWhenKeyEscape closeWhenClickOutside>
      <div className="jk-drawer-filters jk-col nowrap extend stretch">
        <div className="jk-row left gap title cr-tx-ht jk-pg-sm">
          <div className={classNames({ active: true }, 'jk-row')}>
            <FilterListIcon />
          </div>
          <T>order and filters</T>
        </div>
        <div className="jk-col top nowrap stretch space-between filter-drawer-columns flex-1">
          {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: complexity is dominated by JSX render branches / decision trees that read more naturally inline than split into helpers; refactor deferred */}
          {headers.map((header, index) => {
            const {
              index: columnIndex,
              // visible,
              filter,
              sort: { onSort, getOrder = () => 0 as TableSortOrderType } = {},
            } = header;

            let filterCmp = null;
            if (isFilterText(filter)) {
              filterCmp = (
                <Input
                  onChange={(newValue) => setValues((prevState) => ({ ...prevState, [columnIndex]: newValue }))}
                  value={(values[columnIndex] || '') as string}
                  expand
                  placeholder={upperFirst(t('search...'))}
                />
              );
            } else if (isFilterSelect(filter)) {
              filterCmp = (
                <CheckboxList
                  options={filter.options}
                  selectedOptions={(values[columnIndex] || []) as OptionType<string>[]}
                  onSelectOptions={(options) => setValues((prevState) => ({ ...prevState, [columnIndex]: options }))}
                />
              );
            } else if (isFilterDate(filter)) {
              filterCmp = (
                <InputDate
                  type={filter.pickerType}
                  date={
                    values[columnIndex] instanceof Date && isValidDate(values[columnIndex] as Date)
                      ? (values[columnIndex] as Date)
                      : null
                  }
                  onDatePick={(date) => setValues((prevState) => ({ ...prevState, [columnIndex]: date }))}
                  onDateClean={() => setValues((prevState) => ({ ...prevState, [columnIndex]: '' }))}
                  isDisabled={filter.isDisabled}
                  isSelected={isSelected(values[columnIndex] as Date)}
                  baseDate={filter.baseDate}
                  twoLines={
                    filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' ||
                    filter.pickerType === 'year-month-day-hours-minutes-seconds' ||
                    filter.pickerType === 'year-month-day-hours-minutes' ||
                    filter.pickerType === 'year-month-day-hours'
                  }
                />
              );
            } else if (isFilterDateRange(filter)) {
              const [start, end] = Array.isArray(values?.[columnIndex])
                ? (values?.[columnIndex] as [Date, Date])
                : [null, null];
              filterCmp = (
                <>
                  <div>
                    <div className="jk-row left fw-bd">
                      <T className="tt-se">from</T>&nbsp;:
                    </div>
                    <InputDate
                      type={filter.pickerType}
                      date={start}
                      onDatePick={(date) => {
                        if (end && isValidDate(end)) {
                          setValues((prevState) => ({ ...prevState, [columnIndex]: [date, end] }));
                        } else {
                          setValues((prevState) => ({ ...prevState, [columnIndex]: [date, date] }));
                        }
                      }}
                      onDateClean={() => setValues((prevState) => ({ ...prevState, [columnIndex]: '' }))}
                      isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledStart(end))}
                      isSelected={orDatePickerDateFun(isSelected(start), isRangeSelected(start, end))}
                      baseDate={filter.baseStartDate}
                      twoLines={
                        filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' ||
                        filter.pickerType === 'year-month-day-hours-minutes-seconds' ||
                        filter.pickerType === 'year-month-day-hours-minutes' ||
                        filter.pickerType === 'year-month-day-hours'
                      }
                    />
                  </div>
                  <div>
                    <div className="jk-row left fw-bd">
                      <T className="tt-se">to</T>&nbsp;:
                    </div>
                    <InputDate
                      type={filter.pickerType}
                      date={end}
                      onDatePick={(date) => {
                        if (start && isValidDate(start)) {
                          setValues((prevState) => ({ ...prevState, [columnIndex]: [start, date] }));
                        } else {
                          setValues((prevState) => ({ ...prevState, [columnIndex]: [date, date] }));
                        }
                      }}
                      onDateClean={() => setValues((prevState) => ({ ...prevState, [columnIndex]: '' }))}
                      isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledEnd(start))}
                      isSelected={orDatePickerDateFun(isSelected(end), isRangeSelected(start, end))}
                      baseDate={filter.baseEndDate}
                      twoLines={
                        filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds' ||
                        filter.pickerType === 'year-month-day-hours-minutes-seconds' ||
                        filter.pickerType === 'year-month-day-hours-minutes' ||
                        filter.pickerType === 'year-month-day-hours'
                      }
                    />
                  </div>
                </>
              );
            }

            return (
              <div
                className="jk-col gap stretch jk-pg-sm-trl jk-pg-b"
                style={index ? { borderTop: '1px solid var(--cr-ht)' } : {}}
                key={columnIndex}
              >
                <RenderFilterTitle
                  header={header}
                  columnIndex={columnIndex}
                  onSort={onSort}
                  order={getOrder()}
                  // visibility={visible}
                  // onToggleVisibility={() => {
                  //   const newHeaders = [ ...headers ];
                  //   newHeaders[index] = {
                  //     ...newHeaders[index],
                  //     visible: !newHeaders[index].visible,
                  //   };
                  //   setHeaders(fixHeaders(newHeaders));
                  // }}
                />
                {filterCmp}
              </div>
            );
          })}
        </div>
        <div className="jk-row-col space-between gap block jk-pg-sm filter-drawer-buttons">
          <Button
            type="secondary"
            size="small"
            onClick={() => {
              onResetFilters();
              onClose();
            }}
            disabled={!isFiltered}
          >
            <T className="tt-se">reset all filters</T>
          </Button>
          <Button
            size="small"
            onClick={() => {
              onFilter(values);
              onClose();
            }}
            disabled={JSON.stringify(onlyValues(values)) === JSON.stringify(initialValues)}
          >
            <T className="tt-se">apply filters</T>
          </Button>
        </div>
      </div>
    </DrawerView>
  );
};
