import { type KeyboardEvent, type MouseEvent, type ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { TriggerAction } from '../../../enums';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../helpers';
import type { ReactNodeOrFunctionType } from '../../types';
import { Popover } from '../_lazy_/Popover';
import type { PlacementType } from '../_lazy_/Popover/types';
import { ArrowDropDownIcon, ArrowDropUpIcon, ArrowLeftIcon, ArrowRightIcon } from '../server';
import type { SelectOptionType, SelectProps } from './types';

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

export function Select<T, U extends ReactNode, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) {
  
  const {
    className,
    popoverClassName,
    options,
    selectedOption: initialOptionSelected,
    onChange,
    disabled = false,
    optionsPlacement = 'bottom',
    expand = false,
    children,
    style,
  } = props;
  
  const { width: widthSelectLayout = 0, ref: selectLayoutRef } = useResizeDetector();
  const { width: widthFakeOptions = 0, ref: fakeOptionsRef } = useResizeDetector();
  const optimeWidth = `calc(var(--gap) * 2 + ${widthFakeOptions}px + var(--tx-h-m))`;
  const [ isOpen, setIsOpen ] = useState(false);
  
  const selectedOptionRef = useRef<HTMLDivElement>(null);
  
  const { optionIndex, optionSelected, optionsWithKey } = useMemo(() => {
    const optionsWithKey = [];
    const initialOptionSelectedKey = initialOptionSelected?.key ?? JSON.stringify(initialOptionSelected.value);
    let optionIndex = -1;
    let i = 0;
    for (const option of options) {
      const optionKey = 'key' in option ? option.key : JSON.stringify(option.value);
      if (optionKey === initialOptionSelectedKey) {
        optionIndex = i;
      }
      optionsWithKey.push({ ...option, key: optionKey });
      i++;
    }
    const optionSelected: SelectOptionType<T, U, V> = {
      key: initialOptionSelectedKey,
      value: initialOptionSelected.value,
      label: initialOptionSelected.label || options[optionIndex]?.label as U,
      inputLabel: initialOptionSelected.inputLabel || options[optionIndex]?.inputLabel,
    };
    return { optionIndex, optionSelected, optionsWithKey };
  }, [ initialOptionSelected.value, initialOptionSelected.label, initialOptionSelected.inputLabel, initialOptionSelected.key, options ]);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 150);
    
    return () => {
      clearTimeout(timeout);
    };
  }, [ isOpen, optionIndex ]);
  
  const optionRef = useRef<HTMLDivElement>(null);
  
  const isDisabled = disabled || !onChange;
  
  const expandIcon = expandIcons[optionsPlacement];
  
  return (
    <Popover
      triggerOn={TriggerAction.CLICK}
      placement={optionsPlacement}
      popoverClassName={classNames('jk-select-options-content bc-we jk-br-ie elevation-1', popoverClassName)}
      offset={4}
      open={isOpen}
      onOpenChange={setIsOpen}
      content={
        <div
          ref={(el) => {
            optionRef.current = el;
          }}
          role="listbox"
          aria-label="Select options"
          className={classNames('jk-select-options jk-col stretch nowrap wh-100 pn-re ow-ao', { disabled: isDisabled })}
          style={{
            width: (typeof style?.width === 'number' || expand) ? widthSelectLayout : optimeWidth,
          }}
        >
          {optionsWithKey.map((option, index) => {
            const isSelected = optionIndex === index;
            const isOptionDisabled = !!option.disabled || isDisabled;
            
            const handleSelect = () => {
              onChange?.(option);
              setIsOpen(false);
            };
            
            const handleClick = (!isDisabled && !option.disabled)
              ? (event: MouseEvent<HTMLDivElement>) => {
                event.stopPropagation();
                handleSelect();
              }
              : undefined;
            
            const handleKeyDown = (!isDisabled && !option.disabled)
              ? (event: KeyboardEvent<HTMLDivElement>) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  handleSelect();
                }
              }
              : undefined;
            
            return (
              <div
                className={classNames('jk-select-option ws-np', {
                  selected: isSelected,
                  disabled: isOptionDisabled,
                })}
                role="option"
                aria-selected={isSelected}
                aria-disabled={isOptionDisabled}
                tabIndex={isOptionDisabled ? -1 : 0}
                onClick={handleClick}
                onKeyDown={handleKeyDown}
                key={option.key}
                ref={(e) => {
                  if (isSelected) {
                    selectedOptionRef.current = e;
                  }
                }}
              >
                {renderReactNodeOrFunction(option.label)}
              </div>
            );
          })}
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
          width: expand ? '100%' : style?.width === 'auto' ? undefined : optimeWidth,
          height: 'fit-content',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          ref={fakeOptionsRef}
          className="jk-select-options fake jk-col stretch nowrap wh-100 pn-re ow-ao"
          style={{
            position: 'fixed',
            width: 'auto',
            pointerEvents: 'none',
            opacity: 0,
            top: 0,
            left: 0,
          }}
        >
          {optionsWithKey.map((option, index) => (
            <div
              className={classNames('jk-select-option ws-np', {
                selected: optionIndex === index,
                disabled: !!option.disabled || isDisabled,
              })}
              key={option.key}
            >
              {renderReactNodeOrFunction(option.label)}
            </div>
          ))}
        </div>
        <div
          className="jk-select-container"
          ref={selectLayoutRef}
          style={{
            width: expand ? '100%' : style?.width === 'auto' ? undefined : optimeWidth,
            // minWidth: expand ? '100%' : optimeWidth,
            ...style,
          }}
        >
          {children
            ? renderReactNodeOrFunctionP1(
              children,
              { options, isOpen, disabled: isDisabled, optionSelected, expandIcon },
            )
            : (
              <div className={classNames({ open: isOpen }, 'jk-input-select space-between jk-br-ie jk-row gap nowrap')}>
                <div className="jk-row left gap nowrap">
                  <span className="fake-gap" />
                  {optionSelected.inputLabel
                    ? renderReactNodeOrFunction(optionSelected.inputLabel)
                    : renderReactNodeOrFunction(optionSelected.label)}
                </div>
                {expandIcon}
              </div>
            )
          }
        </div>
      </div>
    </Popover>
  );
}
