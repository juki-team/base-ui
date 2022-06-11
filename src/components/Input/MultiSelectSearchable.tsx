import React, { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, getTextContent, renderReactNodeOrFunction } from '../../helpers';
import { useHandleState } from '../../hooks';
import {
  CloseIcon,
  Input,
  InputCheckbox,
  Popover,
  SearchIcon,
  SelectOptionType,
  SelectSearchableProps,
  UpIcon,
  VirtualizedRowsFixed,
} from '../index';

export const MultiSelectSearchable = <T, U extends ReactNode, V extends ReactNode>({
  className,
  options,
  selectedOptions: initialSelectedOptions,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
  disabled,
  optionsPlacement = 'bottom',
  block,
  rowHeightOption = 32,
  onFilter,
}: SelectSearchableProps<T, U, V>) => {
  
  const searchable = !!onFilter;
  const { width: widthContainer, ref: selectLayoutRef } = useResizeDetector();
  const [showOptions, setShowOptions] = useHandleState(false, _showOptions, _onChangeShowOptions);
  const [search, setSearch] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const selectedOptions: SelectOptionType<T, U, V>[] = useMemo(() => initialSelectedOptions.map(initialOptionSelected => {
    const option = options.find(option => option.value === initialOptionSelected.value);
    return {
      value: initialOptionSelected.value,
      label: initialOptionSelected.label || option?.label || '' as unknown as U,
      inputLabel: initialOptionSelected.inputLabel || option?.inputLabel || '' as unknown as V,
    };
  }), [initialSelectedOptions, options]);
  
  useEffect(() => {
    if (search && onFilter) {
      setFilteredOptions(options.filter(option => onFilter({ search, option, options, selectedOptions })));
    } else {
      setFilteredOptions(options);
    }
  }, [onFilter, options, search, selectedOptions]);
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  
  const widthLabels = Math.max(...[...options, ...selectedOptions].map(({ label }) => getTextContent(label).length));
  
  const isDisabled = disabled || !onChange;
  const containerWidth = widthLabels * (12 + 5) + 35;
  
  const renderOption = (option: SelectOptionType<T, U, V>) => {
    const selected = selectedOptions.some(optionSelected => JSON.stringify(option.value) === JSON.stringify(optionSelected.value));
    const disabled = !!option.disabled;
    return (
      <div
        className={classNames('jk-select-option', { selected, disabled })}
        onClick={!option.disabled ? () => {
          onChange?.(selected ? selectedOptions.filter(optionSelected => JSON.stringify(option.value) !== JSON.stringify(optionSelected.value)) : [
            ...selectedOptions,
            option,
          ]);
        } : undefined}
        key={JSON.stringify(option.value)}
        ref={(e) => {
          if (selected) {
            selectedOptionRef.current = e;
          }
        }}
      >
        <div className="jk-row left nowrap">
          <InputCheckbox checked={selected} onChange={() => null} disabled={disabled} />
          {renderReactNodeOrFunction(option.label)}
        </div>
      </div>
    );
  };
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName="jk-select-options-content"
      visible={showOptions}
      onVisibleChange={value => setShowOptions(value)}
      content={
        <div
          className={classNames('jk-select-options-virtual jk-border-radius-inline')}
          style={{ width: block ? (widthContainer || 0) + 32 : containerWidth }}
        >
          {searchable && (
            <div className="jk-row nowrap gap jk-pad jk-shadow">
              <SearchIcon />
              <Input value={search} onChange={setSearch} block />
            </div>
          )}
          <div style={{ width: '100%', height: rowHeightOption * 5 > 400 ? rowHeightOption * 3 : rowHeightOption * 5 }}>
            <VirtualizedRowsFixed
              size={filteredOptions.length}
              rowHeight={rowHeightOption}
              renderRow={(virtualItem) => renderOption(filteredOptions[virtualItem.index])}
            />
          </div>
        </div>
      }
    >
      <div
        className={classNames('jk-multi-select-layout', className, { open: showOptions, disabled: isDisabled })}
        style={{ width: block ? '100%' : `${containerWidth}px` }}
      >
        <div className="jk-select jk-border-radius-inline" ref={selectLayoutRef}>
          <div className="jk-row left jk-multi-select-selected-options">
            {selectedOptions.map(optionSelected => (
              <div className="jk-tag gray-6 jk-row nowrap" key={JSON.stringify(optionSelected.value)}>
                {optionSelected?.inputLabel ? renderReactNodeOrFunction(optionSelected?.inputLabel) : renderReactNodeOrFunction(optionSelected.label)}
                {onChange && (
                  <CloseIcon
                    size="small"
                    filledCircle
                    onClick={event => {
                      onChange(selectedOptions.filter(option => JSON.stringify(optionSelected.value) !== JSON.stringify(option.value)));
                      event.stopPropagation();
                    }}
                    className="color-gray-3"
                  />
                )}
              </div>
            ))}
          </div>
          <UpIcon rotate={180} className="input-icon" />
        </div>
      </div>
    </Popover>
  );
};
