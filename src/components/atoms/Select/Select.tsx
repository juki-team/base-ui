import React, { ReactNode, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { ArrowDropDownIcon, ArrowDropUpIcon, ArrowLeftIcon, ArrowRightIcon, PlacementType, Popover } from '../';
import { classNames, getTextContent, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks';
import { ReactNodeOrFunctionType } from '../../../types';
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
    disabled,
    optionsPlacement = 'bottom',
    extend = false,
    containerWidth: _containerWidth,
    children,
  } = props;
  
  const { width: selectLayoutWidth = 0, ref: selectLayoutRef } = useResizeDetector();
  const [ showOptions, setShowOptions ] = useHandleState(false, _showOptions, _onChangeShowOptions);
  
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
  }, [ showOptions ]);
  
  const optionRef = useRef<HTMLDivElement | null>(null);
  
  const option = options.find(option => JSON.stringify(option.value) === JSON.stringify(initialOptionSelected.value));
  const optionSelected: SelectOptionType<T, U, V> = {
    value: initialOptionSelected.value,
    label: initialOptionSelected.label || option?.label as U,
    inputLabel: initialOptionSelected.inputLabel || option?.inputLabel,
  };
  
  const width = Math.max(
    ...options.map(({ label }) => getTextContent(label).length),
    getTextContent(optionSelected.label).length,
  );
  
  const isDisabled = disabled || !onChange;
  const containerWidth = _containerWidth ?? width * 12 + 35;
  
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
      marginOfChildren={0}
      content={
        <div
          ref={optionRef}
          className={classNames('jk-select-options jk-border-radius-inline', { disabled: isDisabled })}
          style={{
            width: extend
              ? (selectLayoutWidth + 8 + 4 /*padding*/ - 2 /*border*/) : containerWidth - 2, /*border*/
          }}
        >
          {options.map((option) => (
            <div
              className={classNames('jk-select-option', {
                selected: JSON.stringify(option.value) === JSON.stringify(optionSelected.value),
                disabled: !!option.disabled || isDisabled,
              })}
              onClick={(!isDisabled && !option.disabled) ? () => {
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
      >
        {children
          ? renderReactNodeOrFunctionP1(
            children,
            { options, showOptions, disabled: isDisabled, optionSelected, expandIcon },
          )
          : (
            <div className="jk-select jk-border-radius-inline" ref={selectLayoutRef}>
              {optionSelected.inputLabel ? renderReactNodeOrFunction(optionSelected.inputLabel) : renderReactNodeOrFunction(
                optionSelected.label)}
              {expandIcon}
            </div>
          )
        }
      </div>
    </Popover>
  );
};