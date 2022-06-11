import React, { ReactNode, useEffect, useRef } from 'react';
import { classNames, getTextContent } from '../../helpers';
import { useHandleState, useOutsideAlerter } from '../../hooks';
import { Popover, UpIcon } from '../index';
import { SelectProps } from './types';

export const SelectInline = <T, U extends ReactNode, >({  // TODO: Fix the styles or remove component
  className,
  options,
  optionSelected,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
}: SelectProps<T, U>) => {
  
  const [showOptions, setShowOptions] = useHandleState(false, _showOptions, _onChangeShowOptions);
  const selectLayoutRef = useRef(null);
  useOutsideAlerter(() => setShowOptions(false), selectLayoutRef);
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => selectedOptionRef.current?.scrollIntoView(), [showOptions]);
  
  const width = Math.max(...options.map(({ label }) => getTextContent(label).length), getTextContent(optionSelected.label).length);
  
  return (
    <div
      className={classNames('jk-select-layout', className, { open: showOptions })}
      ref={selectLayoutRef}
      style={{ width: `${width * 12 + 35}px` }}
    >
      <div className="jk-select jk-inline-border-radius" onClick={() => setShowOptions(!showOptions)}>
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
  const [showOptions, setShowOptions] = useHandleState(false, _showOptions, _onChangeShowOptions);
  
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
