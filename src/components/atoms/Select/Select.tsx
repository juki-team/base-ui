import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks/useHandleState';
import { ReactNodeOrFunctionType } from '../../../types';
import { ArrowDropDownIcon, ArrowDropUpIcon, ArrowLeftIcon, ArrowRightIcon } from '../icons';
import { PlacementType, Popover } from '../Popover';
import { SelectOptionType, SelectProps } from './types';

export const Select = <T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) => {
  
  const {
    className,
    popoverClassName,
    options,
    selectedOption: initialOptionSelected,
    onChange,
    showOptions: _showOptions,
    onChangeShowOptions: _onChangeShowOptions,
    disabled = false,
    optionsPlacement = 'bottom',
    extend = false,
    containerWidth: _containerWidth,
    children,
    onBlur,
  } = props;
  
  const { ref: selectLayoutRef } = useResizeDetector();
  const [ showOptions, setShowOptions ] = useHandleState(false, _showOptions, _onChangeShowOptions);
  
  const selectedOptionRef = useRef<HTMLDivElement | null>(null);
  const selectRef = useRef(null);
  const onBlurRef = useRef(onBlur);
  const [ width, setWidth ] = useState(0);
  onBlurRef.current = onBlur;
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (showOptions && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      setWidth(prevState => Math.max(fakeOptionRef.current?.clientWidth || 0));
    }, 100);
    if (!showOptions && selectRef.current) {
      onBlurRef.current?.({ target: selectRef.current });
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [ showOptions ]);
  
  const optionRef = useRef<HTMLDivElement | null>(null);
  const fakeOptionRef = useRef<HTMLDivElement | null>(null);
  
  const option = options.find(option => JSON.stringify(option.value) === JSON.stringify(initialOptionSelected.value));
  const optionSelected: SelectOptionType<T, U, V> = {
    value: initialOptionSelected.value,
    label: initialOptionSelected.label || option?.label as U,
    inputLabel: initialOptionSelected.inputLabel || option?.inputLabel,
  };
  
  // const width = Math.max(
  //   ...options.map(({ label }) => getTextContent(label).length),
  //   getTextContent(optionSelected.label).length,
  // );
  
  const isDisabled = disabled || !onChange;
  // const containerWidth = _containerWidth ?? width * 12 + 35;
  const containerWidth = _containerWidth ?? width + 24;
  
  const expandIcons: { [key in PlacementType]: ReactNode } = {
    topLeft: <ArrowDropUpIcon className="input-icon" />,
    top: <ArrowDropUpIcon className="input-icon" />,
    topRight: <ArrowDropUpIcon className="input-icon" />,
    rightTop: <ArrowRightIcon className="input-icon" />,
    right: <ArrowRightIcon className="input-icon" />,
    rightBottom: <ArrowRightIcon className="input-icon" />,
    bottomRight: <ArrowDropDownIcon className="input-icon" />,
    bottom: <ArrowDropDownIcon className="input-icon" />,
    bottomLeft: <ArrowDropDownIcon className="input-icon" />,
    leftBottom: <ArrowLeftIcon className="input-icon" />,
    left: <ArrowLeftIcon className="input-icon" />,
    leftTop: <ArrowLeftIcon className="input-icon" />,
    center: <ArrowDropUpIcon className="input-icon" />,
    centerScreen: <ArrowDropUpIcon className="input-icon" />,
  };
  
  const expandIcon = expandIcons[optionsPlacement];
  
  return (
    <Popover
      triggerOn="click"
      placement={optionsPlacement}
      popoverClassName={classNames('jk-select-options-content', popoverClassName)}
      visible={showOptions}
      onVisibleChange={value => setShowOptions(value)}
      marginOfChildren={4}
      content={
        <div
          ref={optionRef}
          className={classNames('jk-select-options jk-pg-sm jk-border-radius-inline', { disabled: isDisabled })}
          style={{
            width: extend
              ? ((selectLayoutRef.current?.clientWidth || 0) /*padding*/ - 2 /*border*/) : containerWidth, /*border*/
          }}
        >
          {options.map((option) => (
            <div
              className={classNames('jk-select-option', {
                selected: JSON.stringify(option.value) === JSON.stringify(optionSelected.value),
                disabled: !!option.disabled || isDisabled,
              })}
              onClick={(!isDisabled && !option.disabled) ? (event) => {
                onChange?.(option);
                setShowOptions(false);
                event.stopPropagation();
              } : undefined}
              key={JSON.stringify(option.value)}
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
          { open: showOptions, disabled: isDisabled },
        )}
        style={{ width: extend ? '100%' : `${containerWidth}px` }}
        ref={selectRef}
      >
        <div>
          <div
            ref={fakeOptionRef}
            className="jk-select-options jk-pg-sm jk-border-radius-inline"
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
              <div className="jk-select-option" key={JSON.stringify(option.value)}>
                {renderReactNodeOrFunction(option.label)}
              </div>
            ))}
            {options.map((option) => (
              <div className="jk-select-option" key={JSON.stringify(option.value)}>
                {renderReactNodeOrFunction(option.inputLabel)}
              </div>
            ))}
          </div>
        </div>
        {children
          ? renderReactNodeOrFunctionP1(
            children,
            { options, showOptions, disabled: isDisabled, optionSelected, expandIcon },
          )
          : (
            <div
              className={classNames({ open: showOptions }, 'jk-select jk-border-radius-inline')}
              ref={selectLayoutRef}
            >
              {optionSelected.inputLabel
                ? renderReactNodeOrFunction(optionSelected.inputLabel)
                : renderReactNodeOrFunction(optionSelected.label)} {expandIcon}
            </div>
          )
        }
      </div>
    </Popover>
  );
};
