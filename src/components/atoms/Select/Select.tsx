import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { ReactNodeOrFunctionType } from '../../../types';
import { Popover } from '../Popover/Popover';
import { PlacementType } from '../Popover/types';
import { ArrowDropDownIcon, ArrowDropUpIcon, ArrowLeftIcon, ArrowRightIcon } from '../server';
import { SelectOptionType, SelectProps } from './types';

const expandIcons: { [key in PlacementType]: ReactNode } = {
  'top-start': <ArrowDropUpIcon className="input-icon" />,
  top: <ArrowDropUpIcon className="input-icon" />,
  'top-end': <ArrowDropUpIcon className="input-icon" />,
  'right-start': <ArrowRightIcon className="input-icon" />,
  right: <ArrowRightIcon className="input-icon" />,
  'right-end': <ArrowRightIcon className="input-icon" />,
  'bottom-end': <ArrowDropDownIcon className="input-icon" />,
  bottom: <ArrowDropDownIcon className="input-icon" />,
  'bottom-start': <ArrowDropDownIcon className="input-icon" />,
  'left-start': <ArrowLeftIcon className="input-icon" />,
  left: <ArrowLeftIcon className="input-icon" />,
  'left-end': <ArrowLeftIcon className="input-icon" />,
  // center: <ArrowDropUpIcon className="input-icon" />,
  // centerScreen: <ArrowDropUpIcon className="input-icon" />,
};

export const Select = <T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => {
  
  const {
    className,
    popoverClassName,
    options,
    selectedOption: initialOptionSelected,
    onChange,
    disabled = false,
    optionsPlacement = 'bottom',
    expand = false,
    containerWidth: _containerWidth,
    children,
    onBlur,
  } = props;
  
  const [ widthSelect, setWidthSelect ] = useState(0);
  const selectLayoutRef = useRef<HTMLDivElement>(null);
  useResizeDetector({
    onResize: () => {
      if (selectLayoutRef.current) {
        setWidthSelect(selectLayoutRef.current?.getBoundingClientRect().width);
      }
    },
    targetRef: selectLayoutRef,
  });
  const { width: widthFakeOptions = 0, ref: fakeOptionsRef } = useResizeDetector();
  const optimeWidth = `(var(--gap) * 2 + ${widthFakeOptions}px + var(--size-regular-icon))`;
  const [ isOpen, setIsOpen ] = useState(false);
  
  const selectedOptionRef = useRef<HTMLDivElement>(null);
  const onBlurRef = useRef(onBlur);
  onBlurRef.current = onBlur;
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    // if (!showOptions && selectRef.current) {
    // onBlurRef.current?.({ target: selectRef.current });
    // }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [ isOpen ]);
  
  const optionRef = useRef<HTMLDivElement>(null);
  
  const option = options.find(option => JSON.stringify(option.value) === JSON.stringify(initialOptionSelected.value));
  const optionSelected: SelectOptionType<T, U, V> = {
    value: initialOptionSelected.value,
    label: initialOptionSelected.label || option?.label as U,
    inputLabel: initialOptionSelected.inputLabel || option?.inputLabel,
  };
  
  const isDisabled = disabled || !onChange;
  
  const expandIcon = expandIcons[optionsPlacement];
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName={classNames('jk-select-options-content bc-we jk-br-ie elevation-1', popoverClassName)}
      offset={4}
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div
          ref={optionRef}
          className={classNames('jk-select-options jk-col stretch nowrap wh-100 pn-re ow-ao', { disabled: isDisabled })}
          style={{ width: _containerWidth ?? `max(${widthSelect}px, ${optimeWidth}` }}
        >
          {options.map((option) => (
            <div
              className={classNames('jk-select-option ws-np', {
                selected: JSON.stringify(option.value) === JSON.stringify(optionSelected.value),
                disabled: !!option.disabled || isDisabled,
              })}
              onClick={(!isDisabled && !option.disabled) ? (event) => {
                onChange?.(option);
                setIsOpen(false);
                event.stopPropagation();
              } : undefined}
              key={option.key ?? JSON.stringify(option.value)}
              ref={(e) => {
                if (JSON.stringify(option.value) === JSON.stringify(optionSelected.value)) {
                  selectedOptionRef.current = e;
                }
              }}
            >
              {renderReactNodeOrFunction(option.label)}
            </div>
          ))}
        </div>
      }
    >
      <div
        className={classNames(
          'jk-select-layout',
          className,
          optionsPlacement,
          { open: isOpen, disabled: isDisabled },
        )}
        style={{
          width: _containerWidth ? `min(${_containerWidth}px, 100%)` : (expand ? '100%' : `${optimeWidth}`),
          minWidth: _containerWidth ? `min(${_containerWidth}px, 100%)` : (expand ? undefined : `${optimeWidth}`),
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          ref={fakeOptionsRef}
          className="jk-select-options jk-col stretch nowrap wh-100 pn-re ow-ao"
          style={{
            position: 'fixed',
            width: 'auto',
            pointerEvents: 'none',
            opacity: 0,
            top: 0,
            left: 0,
          }}
        >
          {options.map((option) => (
            <div className="jk-select-option" key={option.key ?? JSON.stringify(option.value)}>
              {renderReactNodeOrFunction(option.label)}
            </div>
          ))}
          {options.map((option) => (
            <div className="jk-select-option" key={option.key ?? JSON.stringify(option.value)}>
              {renderReactNodeOrFunction(option.inputLabel)}
            </div>
          ))}
        </div>
        {children
          ? renderReactNodeOrFunctionP1(
            children,
            { options, isOpen, disabled: isDisabled, optionSelected, expandIcon },
          )
          : (
            <div
              className={classNames({ open: isOpen }, 'jk-input-select space-between jk-border-radius-inline jk-row gap nowrap')}
              ref={selectLayoutRef}
            >
              <span className="fake-gap" />
              {optionSelected.inputLabel
                ? renderReactNodeOrFunction(optionSelected.inputLabel)
                : renderReactNodeOrFunction(optionSelected.label)}
              {expandIcon}
            </div>
          )
        }
      </div>
    </Popover>
  );
};
