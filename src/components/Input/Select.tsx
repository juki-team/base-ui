import React, { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { CloseIcon, InputCheckbox, MultiSelectProps, Popover, SelectOptionType, UpIcon } from '../index';
import { classNames, getTextContent } from '../../helpers';
import { useOutsideAlerter } from '../../hooks';
import { SelectProps } from './types';

export const SelectInline = <T, U extends ReactNode, >({  // TODO: Fix the styles or remove component
  className,
  options,
  optionSelected,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
}: SelectProps<T, U>) => {
  
  const [showOptions, setShowOptions] = useState(!!_showOptions);
  
  useEffect(() => {
    if (_showOptions !== undefined) {
      setShowOptions(_showOptions);
    }
  }, [_showOptions]);
  
  const onShowOptionsChange = useCallback((value: boolean) => {
    if (_showOptions === undefined) {
      setShowOptions(value);
    } else {
      _onChangeShowOptions?.(value);
    }
  }, [_onChangeShowOptions, _showOptions]);
  
  const selectLayoutRef = useRef(null);
  useOutsideAlerter(() => onShowOptionsChange(false), selectLayoutRef);
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => selectedOptionRef.current?.scrollIntoView(), [showOptions]);
  
  const width = Math.max(...options.map(({ label }) => getTextContent(label).length), getTextContent(optionSelected.label).length);
  
  return (
    <div
      className={classNames('jk-select-layout', className, { open: showOptions })}
      ref={selectLayoutRef}
      style={{ width: `${width * 12 + 35}px` }}
    >
      <div className="jk-select jk-inline-border-radius" onClick={() => onShowOptionsChange(!showOptions)}>
        {optionSelected.label}
        <UpIcon rotate={180} className="input-icon" />
      </div>
      <div className={classNames('jk-select-options jk-inline-border-radius')}>
        {options.map((option) => (
          <div
            className={classNames('jk-select-option', {
              selected: JSON.stringify(option.value) === JSON.stringify(optionSelected.value),
              disabled: !!option.disabled,
            })}
            onClick={!option.disabled ? () => {
              onChange?.(option);
              onShowOptionsChange(false);
            } : undefined}
            key={JSON.stringify(option.value)}
            ref={(e) => {
              if (JSON.stringify(option.value) === JSON.stringify(optionSelected.value)) {
                selectedOptionRef.current = e;
              }
            }}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export const Select = <T, U extends ReactNode, >({
  className,
  options,
  optionSelected: initialOptionSelected,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
  disabled,
  optionsPlacement = 'bottom',
}: SelectProps<T, U>) => {
  
  const selectLayoutRef = useRef(null);
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    if (_showOptions !== undefined) {
      setShowOptions(_showOptions);
    }
  }, [_showOptions]);
  
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showOptions && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [showOptions]);
  
  const optionRef = useRef<HTMLDivElement | null>(null);
  
  const optionSelected = {
    value: initialOptionSelected.value,
    label: initialOptionSelected.label || options.find(option => option.value === initialOptionSelected.value)?.label,
  };
  
  const width = Math.max(...options.map(({ label }) => getTextContent(label).length), getTextContent(optionSelected.label).length);
  
  const isDisabled = disabled || !onChange;
  const containerWidth = width * 12 + 35;
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName="jk-select-options-content"
      visible={showOptions}
      onVisibleChange={value => setShowOptions(value)}
      content={
        <div ref={optionRef} className={classNames('jk-select-options jk-border-radius-inline')} style={{ width: containerWidth }}>
          {options.map((option) => (
            <div
              className={classNames('jk-select-option', {
                selected: JSON.stringify(option.value) === JSON.stringify(optionSelected.value),
                disabled: !!option.disabled,
              })}
              onClick={!option.disabled ? () => {
                onChange?.(option);
                setShowOptions(false);
              } : undefined}
              key={JSON.stringify(option.value)}
              ref={(e) => {
                if (JSON.stringify(option.value) === JSON.stringify(optionSelected.value)) {
                  selectedOptionRef.current = e;
                }
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      }
    >
      <div
        className={classNames('jk-select-layout', className, { open: showOptions, disabled: isDisabled })}
        ref={selectLayoutRef}
        style={{ width: `${containerWidth}px` }}
      >
        <div className="jk-select jk-border-radius-inline">
          {optionSelected.label}
          <UpIcon rotate={180} className="input-icon" />
        </div>
      </div>
    </Popover>
  );
};

export const MultiSelect = <T, U extends ReactNode, >({
  className,
  options,
  optionsSelected: initialOptionsSelected,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
  disabled,
  optionsPlacement = 'bottom',
  block,
}: MultiSelectProps<T, U>) => {
  
  const { width: widthContainer, ref: selectLayoutRef } = useResizeDetector();
  const [showOptions, setShowOptions] = useState(false);
  useEffect(() => {
    if (_showOptions !== undefined) {
      setShowOptions(_showOptions);
    }
  }, [_showOptions]);
  
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showOptions && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [showOptions]);
  
  const optionRef = useRef<HTMLDivElement | null>(null);
  
  const optionsSelected: SelectOptionType<T, U>[] = initialOptionsSelected.map(initialOptionSelected => ({
    value: initialOptionSelected.value,
    label: initialOptionSelected.label || options.find(option => option.value === initialOptionSelected.value)?.label || '' as unknown as U,
  }));
  
  const widthLabels = Math.max(...[...options, ...optionsSelected].map(({ label }) => getTextContent(label).length));
  
  const isDisabled = disabled || !onChange;
  const containerWidth = widthLabels * (12 + 5) + 35;
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName="jk-select-options-content"
      visible={showOptions}
      onVisibleChange={value => setShowOptions(value)}
      content={
        <div ref={optionRef} className={classNames('jk-select-options jk-border-radius-inline')}
             style={{ width: block ? (widthContainer || 0) + 32 : containerWidth }}>
          {options.map((option) => {
            const selected = optionsSelected.some(optionSelected => JSON.stringify(option.value) === JSON.stringify(optionSelected.value));
            const disabled = !!option.disabled;
            return (
              <div
                className={classNames('jk-select-option', { selected, disabled })}
                onClick={!option.disabled ? () => {
                  onChange?.(selected ? optionsSelected.filter(optionSelected => JSON.stringify(option.value) !== JSON.stringify(optionSelected.value)) : [
                    ...optionsSelected,
                    option,
                  ]);
                } : undefined}
                key={JSON.stringify(option.value)}
                ref={(e) => {
                  if (optionsSelected.some(optionSelected => JSON.stringify(option.value) === JSON.stringify(optionSelected.value))) {
                    selectedOptionRef.current = e;
                  }
                }}
              >
                <div className="jk-row left">
                  <InputCheckbox checked={selected} onChange={() => null} disabled={disabled} />
                  {option.label}
                </div>
              </div>
            );
          })}
        </div>
      }
    >
      <div
        className={classNames('jk-multi-select-layout', className, { open: showOptions, disabled: isDisabled })}
        style={{ width: block ? '100%' : `${containerWidth}px` }}
      >
        <div className="jk-select jk-border-radius-inline" ref={selectLayoutRef}>
          <div className="jk-row jk-multi-select-selected-options">
            {optionsSelected.map(optionSelected => (
              <div className="jk-tag gray-6 jk-row" key={JSON.stringify(optionSelected.value)}>
                {optionSelected.label}
                {onChange && (
                  <CloseIcon
                    size="small"
                    filledCircle
                    onClick={event => {
                      onChange(optionsSelected.filter(option => JSON.stringify(optionSelected.value) !== JSON.stringify(option.value)));
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
