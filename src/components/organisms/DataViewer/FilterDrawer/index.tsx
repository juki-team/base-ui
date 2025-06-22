import React, { useEffect, useState } from 'react';
import { classNames } from '../../../../helpers';
import { useI18nStore } from '../../../../stores/i18n/useI18nStore';
import { Button, Input, InputToggle, T } from '../../../atoms';
import { CheckboxList, DrawerView, InputDate } from '../../../molecules';
import { OptionType } from '../../../molecules/types';
import { ArrowDownwardIcon, ArrowUpwardIcon, FilterListIcon } from '../../../server';
import {
  fixHeaders,
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
import {
  DataViewerTableHeadersType,
  FilterDrawerProps,
  FilterValuesType,
  TableSortOnSortType,
  TableSortOrderType,
} from '../types';

interface renderFilterTitleProps<T> {
  onSort?: TableSortOnSortType,
  order: TableSortOrderType,
  columnIndex: string,
  header: DataViewerTableHeadersType<T>,
  visibility: boolean,
  onToggleVisibility: () => void,
}

const RenderFilterTitle = <T, >({
                                  visibility,
                                  onToggleVisibility,
                                  header,
                                  columnIndex,
                                  onSort,
                                  order,
                                }: renderFilterTitleProps<T>) => {
  return (
    <div className="jk-row space-between">
      <div className="jk-row gap">
        <InputToggle
          data-tooltip-id="jk-tooltip"
          data-tooltip-content={visibility ? 'hide column' : 'enable column'}
          data-tooltip-t-class-name="tt-se"
          data-tooltip-place="left"
          checked={visibility}
          onChange={onToggleVisibility}
        />
        <div className="fw-bd">{renderHead({ header, columnIndex })}</div>
      </div>
      {onSort ? (
        <div className={classNames('jk-row tool', { active: !!order })} onClick={() => onSort({ columnIndex })}>
          <T>sort</T>
          {order > 0 ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
        </div>
      ) : <div />}
    </div>
  );
};

export const FilterDrawer = <T, >(props: FilterDrawerProps<T>) => {
    
    const { headers, setHeaders, isOpen, onClose, onFilter, onResetFilters } = props;
    
    const [ initialValues, setInitialValues ] = useState({});
    const [ values, setValues ] = useState<FilterValuesType>({});
    const [ isFiltered, setIsFiltered ] = useState(false);
    
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
    }, [ headers, isOpen ]);
    
    const t = useI18nStore(state => state.i18n.t);
    
    return (
      <DrawerView isOpen={isOpen} onClose={onClose} closeWhenKeyEscape closeWhenClickOutside>
        <div className="jk-drawer-filters jk-col nowrap extend stretch">
          <div className="jk-row left gap title cr-py jk-pg-sm">
            <div className={classNames({ active: true }, 'jk-row')}><FilterListIcon /></div>
            <T>order and filters</T>
          </div>
          <div className="jk-col top nowrap stretch space-between filter-drawer-columns flex-1">
            {headers.map((header, index) => {
              const {
                index: columnIndex,
                visible,
                filter,
                sort: { onSort, getOrder = () => (0 as TableSortOrderType) } = {},
              } = header;
              
              let filterCmp = null;
              if (isFilterText(filter)) {
                filterCmp = (
                  <Input
                    onChange={newValue => setValues(prevState => ({ ...prevState, [columnIndex]: newValue }))}
                    value={(values[columnIndex] || '') as string}
                    expand
                    placeholder={t('empty field')}
                  />
                );
              } else if (isFilterSelect(filter)) {
                filterCmp = (
                  <CheckboxList
                    options={filter.options}
                    selectedOptions={(values[columnIndex] || []) as OptionType<string>[]}
                    onSelectOptions={options => setValues(prevState => ({ ...prevState, [columnIndex]: options }))}
                  />
                );
              } else if (isFilterDate(filter)) {
                filterCmp = (
                  <InputDate
                    type={filter.pickerType}
                    date={(values[columnIndex] as Date)?.isValidDate?.() ? values[columnIndex] as Date : null}
                    onDatePick={date => setValues(prevState => ({ ...prevState, [columnIndex]: date }))}
                    onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                    isDisabled={filter.isDisabled}
                    isSelected={isSelected(values[columnIndex] as Date)}
                    baseDate={filter.baseDate}
                    twoLines={filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds'
                      || filter.pickerType === 'year-month-day-hours-minutes-seconds'
                      || filter.pickerType === 'year-month-day-hours-minutes'
                      || filter.pickerType === 'year-month-day-hours'}
                  />
                );
              } else if (isFilterDateRange(filter)) {
                const [ start, end ] = Array.isArray(values?.[columnIndex]) ? values?.[columnIndex] as [ Date, Date ] : [
                  null,
                  null,
                ];
                filterCmp = (
                  <>
                    <div>
                      <div className="jk-row left fw-bd"><T className="tt-se">from</T>&nbsp;:</div>
                      <InputDate
                        type={filter.pickerType}
                        date={start}
                        onDatePick={date => {
                          if (end && end.isValidDate()) {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [ date, end ] }));
                          } else {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [ date, date ] }));
                          }
                        }}
                        onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                        isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledStart(end))}
                        isSelected={orDatePickerDateFun(isSelected(start), isRangeSelected(start, end))}
                        baseDate={filter.baseStartDate}
                        twoLines={filter.pickerType === 'year-month-day-hours-minutes-seconds-milliseconds'
                          || filter.pickerType === 'year-month-day-hours-minutes-seconds'
                          || filter.pickerType === 'year-month-day-hours-minutes'
                          || filter.pickerType === 'year-month-day-hours'}
                      />
                    </div>
                    <div>
                      <div className="jk-row left fw-bd"><T className="tt-se">to</T>&nbsp;:</div>
                      <InputDate
                        type={filter.pickerType}
                        date={end}
                        onDatePick={date => {
                          if (start && start.isValidDate()) {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [ start, date ] }));
                          } else {
                            setValues(prevState => ({ ...prevState, [columnIndex]: [ date, date ] }));
                          }
                        }}
                        onDateClean={() => setValues(prevState => ({ ...prevState, [columnIndex]: '' }))}
                        isDisabled={orDatePickerDateFun(filter.isDisabled, isDisabledEnd(start))}
                        isSelected={orDatePickerDateFun(isSelected(end), isRangeSelected(start, end))}
                        baseDate={filter.baseEndDate}
                        twoLines={filter.pickerType
                          === 'year-month-day-hours-minutes-seconds-milliseconds'
                          || filter.pickerType
                          === 'year-month-day-hours-minutes-seconds'
                          || filter.pickerType
                          === 'year-month-day-hours-minutes'
                          || filter.pickerType
                          === 'year-month-day-hours'}
                      />
                    </div>
                  </>
                );
              }
              
              return (
                <div
                  className="jk-col stretch jk-pg-sm-trl jk-pg-b"
                  style={index ? { borderTop: '1px solid var(--t-color-highlight)' } : {}}
                  key={columnIndex}
                >
                  <RenderFilterTitle
                    header={header}
                    columnIndex={columnIndex}
                    onSort={onSort}
                    order={getOrder()}
                    visibility={visible}
                    onToggleVisibility={() => {
                      const newHeaders = [ ...headers ];
                      newHeaders[index] = {
                        ...newHeaders[index],
                        visible: !newHeaders[index].visible,
                      };
                      setHeaders(fixHeaders(newHeaders));
                    }}
                  />
                  {filterCmp}
                </div>
              );
            })}
          </div>
          <div className="jk-row-col space-between gap block jk-pg-sm filter-drawer-buttons">
            <Button
              type="light"
              size="small"
              onClick={() => {
                onResetFilters();
                onClose();
              }}
              disabled={!isFiltered}
            >
              <T>reset all filters</T>
            </Button>
            <Button
              size="small"
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
      </DrawerView>
    );
  }
;
