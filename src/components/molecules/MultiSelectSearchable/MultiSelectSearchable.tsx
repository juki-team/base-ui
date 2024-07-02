import { VirtualItem } from '@tanstack/react-virtual';
import React, { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, getTextContent, renderReactNodeOrFunction } from '../../../helpers';
import { useHandleState } from '../../../hooks/useHandleState';
import {
  CloseIcon,
  ExpandMoreIcon,
  Input,
  InputCheckbox,
  Popover,
  SearchIcon,
  SelectOptionType,
  VirtualizedRowsFixed,
} from '../../atoms';
import { SelectSearchableProps } from './types';

export const MultiSelectSearchable = <T, U extends ReactNode, V extends ReactNode>(props: SelectSearchableProps<T, U, V>) => {
  
  const {
    className,
    options: _options,
    selectedOptions: _initialSelectedOptions,
    onChange: _onChange,
    showOptions: _showOptions,
    onChangeShowOptions: _onChangeShowOptions,
    disabled,
    optionsPlacement = 'bottom',
    extend,
    rowHeightOption = 32,
    onFilter,
    multiselect = true,
  } = props;
  
  const optionValues = JSON.stringify(_options.map(option => option.value));
  const options = useMemo(() => {
    return _options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ optionValues ]);
  
  const initialSelectedOptionValues = JSON.stringify(_initialSelectedOptions.map(option => option.value));
  const initialSelectedOptions = useMemo(() => {
    return _initialSelectedOptions;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ initialSelectedOptionValues ]);
  
  const onChangeRef = useRef(_onChange);
  onChangeRef.current = _onChange;
  
  const searchable = !!onFilter;
  const { width: widthContainer, ref: selectLayoutRef } = useResizeDetector();
  const [ showOptions, setShowOptions ] = useHandleState(false, _showOptions, _onChangeShowOptions);
  const [ search, setSearch ] = useState('');
  const [ filteredOptions, setFilteredOptions ] = useState(options);
  const selectedOptions: SelectOptionType<T, U, V>[] = useMemo(() => initialSelectedOptions.map(initialOptionSelected => {
    const value = JSON.stringify(initialOptionSelected.value);
    const option = options.find(option => JSON.stringify(option.value) === value);
    return {
      value: initialOptionSelected.value,
      label: initialOptionSelected.label || option?.label || '' as unknown as U,
      inputLabel: initialOptionSelected.inputLabel || option?.inputLabel || '' as unknown as V,
    };
  }), [ initialSelectedOptions, options ]);
  
  useEffect(() => {
    if (search && onFilter) {
      setFilteredOptions(options.filter(option => onFilter({ search, option, options, selectedOptions })));
    } else {
      setFilteredOptions(options);
    }
  }, [ onFilter, options, search, selectedOptions ]);
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  
  const widthLabels = Math.max(...[ ...options, ...selectedOptions ].map(({ label }) => getTextContent(label).length));
  
  const isDisabled = disabled || !onChangeRef.current;
  const containerWidth = widthLabels * (12 + 5) + 35;
  
  const renderRow = useCallback((virtualItem: VirtualItem) => {
    const option = filteredOptions[virtualItem.index];
    const value = JSON.stringify(option.value);
    const selected = selectedOptions.some(optionSelected => value === JSON.stringify(optionSelected.value));
    const disabled = !!option.disabled;
    return (
      <div
        className={classNames('jk-select-option', { selected, disabled })}
        onClick={!option.disabled ? () => {
          onChangeRef.current?.(selected ? selectedOptions.filter(optionSelected => JSON.stringify(option.value)
            !== JSON.stringify(optionSelected.value)) : [
            ...(multiselect ? selectedOptions : []),
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
          {multiselect && <InputCheckbox checked={selected} disabled={disabled} onChange={() => null} />}
          {renderReactNodeOrFunction(option.label)}
        </div>
      </div>
    );
  }, [ filteredOptions, multiselect, selectedOptions ]);
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName="jk-select-options-content"
      visible={showOptions}
      onVisibleChange={setShowOptions}
      marginOfChildren={0}
      content={
        <div
          className={classNames('jk-select-options-virtual jk-border-radius-inline')}
          style={{
            width: extend ? (widthContainer || 0) + 8 + 4 /*padding*/ - 2 /*border*/ : containerWidth - 2, /*border*/
          }}
        >
          {searchable && (
            <div className="jk-row nowrap gap jk-pg-md elevation-1">
              <SearchIcon />
              <Input value={search} onChange={setSearch} extend />
            </div>
          )}
          <div style={{ width: '100%', height: Math.ceil(256 / rowHeightOption) * rowHeightOption }}>
            <VirtualizedRowsFixed
              size={filteredOptions.length}
              rowHeight={rowHeightOption}
              renderRow={renderRow}
            />
          </div>
        </div>
      }
    >
      <div
        className={classNames('jk-multi-select-layout', className, { open: showOptions, disabled: isDisabled })}
        style={{ width: extend ? '100%' : `${containerWidth}px` }}
      >
        <div className="jk-select jk-border-radius-inline jk-row space-between nowrap" ref={selectLayoutRef}>
          <div className="jk-row left jk-multi-select-selected-options">
            {selectedOptions.map(optionSelected => (
              <div
                className={classNames('jk-row nowrap', { 'jk-tag gray-6': multiselect })}
                key={JSON.stringify(optionSelected.value)}
              >
                {optionSelected?.inputLabel ? renderReactNodeOrFunction(optionSelected?.inputLabel) : renderReactNodeOrFunction(
                  optionSelected.label)}
                {onChangeRef.current && multiselect && (
                  <CloseIcon
                    size="small"
                    filledCircle
                    onClick={event => {
                      onChangeRef.current?.(selectedOptions.filter(option => JSON.stringify(optionSelected.value) !== JSON.stringify(
                        option.value)));
                      event.stopPropagation();
                    }}
                    className="cr-g3"
                  />
                )}
              </div>
            ))}
          </div>
          <div className="jk-row nowrap jk-multi-select-selected-searchable-icons">
            {!!onChangeRef.current && (
              <CloseIcon
                className="input-icon"
                onClick={event => {
                  onChangeRef.current?.([]);
                  event.stopPropagation();
                }}
              />
            )}
            <ExpandMoreIcon className="input-icon" />
          </div>
        </div>
      </div>
    </Popover>
  );
};
