import { DatePickerDateFunType, DateDisplayType, OptionType } from '../../../../index';

export interface TableHeadFilterTextProps {
  columnIndex: string,
  onFilter: (props: { columnIndex: string, text: string }) => void,
  onReset: () => void,
  initialText: string,
  visible: boolean,
}

export interface TableHeadFilterSelectProps {
  columnIndex: string,
  onFilter: (props: { columnIndex: string, selectedOptions: OptionType<string>[] }) => void,
  onReset: () => void,
  options: OptionType<string>[],
  initialSelectedOptions: OptionType<string>[],
  visible: boolean,
}

export interface TableHeadFilterDateProps {
  pickerType: DateDisplayType,
  columnIndex: string,
  onFilter: (props: { columnIndex: string, selectedDate: Date }) => void,
  onReset: () => void,
  isDisabled: DatePickerDateFunType,
  initialSelectedDate: Date | null,
  visible: boolean,
  baseDate: Date,
}

export interface TableHeadFilterDateRangeProps {
  pickerType: DateDisplayType,
  columnIndex: string,
  onFilter: (props: { columnIndex: string, startSelectedDate: Date, endSelectedDate: Date }) => void,
  onReset: () => void,
  isDisabled: DatePickerDateFunType,
  initialStartSelectedDate: Date | null,
  initialEndSelectedDate: Date | null,
  visible: boolean,
  baseStartDate: Date,
  baseEndDate: Date,
}
