import { ReactNode, useEffect, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { TriggerAction } from '../../../enums';
import { classNames, getTextContent, renderReactNodeOrFunction } from '../../../helpers';
import { InputCheckbox } from '../inputs/InputCheckbox';
import { Popover } from '../Popover/Popover';
import { SelectOptionType } from '../Select/types';
import { CloseIcon, ExpandMoreIcon } from '../server';
import { MultiSelectProps } from './types';

export const MultiSelect = <T, U extends ReactNode, V extends ReactNode>(props: MultiSelectProps<T, U, V>) => {
  
  const {
    className,
    options,
    selectedOptions: initialOptionsSelected,
    onChange,
    // showOptions: _showOptions,
    // onChangeShowOptions: _onChangeShowOptions,
    disabled = false,
    optionsPlacement = 'bottom',
    expand = false,
    children,
    containerWidth: _containerWidth,
  } = props;
  
  const { width: widthContainer, ref: selectLayoutRef } = useResizeDetector();
  const [ isOpen, setIsOpen ] = useState(false);
  const selectedOptionRef = useRef<HTMLDivElement>(null);
  const optionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isOpen && (optionRef.current?.scrollHeight || 0) > (optionRef.current?.clientHeight || 0)) {
        selectedOptionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 100);
    return () => {
      clearTimeout(timeout);
    };
  }, [ isOpen ]);
  
  const optionsSelected: SelectOptionType<T, U, V>[] = initialOptionsSelected.map(initialOptionSelected => {
    const option = options.find(option => JSON.stringify(option.value) === JSON.stringify(initialOptionSelected.value));
    return {
      value: initialOptionSelected.value,
      label: initialOptionSelected.label || option?.label || '' as unknown as U,
      inputLabel: initialOptionSelected.inputLabel || option?.inputLabel || '' as unknown as V,
    };
  });
  
  const widthLabels = Math.max(...[ ...options, ...optionsSelected ].map(({ label }) => getTextContent(label).length));
  const isDisabled = disabled || !onChange;
  const containerWidth = widthLabels * (12 + 5) + 35;
  
  return (
    <Popover
      popoverClassName="bc-we jk-br-ie elevation-1"
      placement={optionsPlacement}
      triggerOn={TriggerAction.CLICK}
      offset={4}
      onOpenChange={setIsOpen}
      content={
        <div
          ref={optionRef}
          className={classNames('jk-select-options jk-pg-xsm-tb', { disabled: isDisabled })}
          style={{
            width: _containerWidth === 'child' ? 'auto' : expand ? (widthContainer || 0) + 8 + 4 /*padding*/ - 2/*border*/ : containerWidth - 2, /*border*/
          }}
        >
          {options.map((option) => {
            const selected = optionsSelected.some(optionSelected => JSON.stringify(option.value) === JSON.stringify(
              optionSelected.value));
            const disabled = !!option.disabled;
            return (
              <div
                className={classNames('jk-select-option jk-row left multiselect', {
                  selected,
                  disabled: isDisabled || disabled,
                })}
                key={JSON.stringify(option.value)}
                ref={(e) => {
                  if (selected) {
                    selectedOptionRef.current = e;
                  }
                }}
              >
                <InputCheckbox
                  checked={selected}
                  onChange={(!isDisabled && !option.disabled) ? () => {
                    onChange?.(
                      selected
                        ? optionsSelected.filter(optionSelected => JSON.stringify(option.value)
                          !== JSON.stringify(optionSelected.value))
                        : [ ...optionsSelected, option ],
                      option,
                    );
                  } : undefined}
                  disabled={isDisabled || disabled}
                  label={renderReactNodeOrFunction(option.label)}
                  className="wh-100"
                />
              </div>
            );
          })}
        </div>
      }
    >
      <div
        className={classNames('jk-multi-select-layout', className, { open: isOpen, disabled: isDisabled })}
        style={{ width: _containerWidth === 'child' ? 'auto' : expand ? '100%' : `${containerWidth}px` }}
      >
        {children
          ? children : (
            <>
              <div
                className={classNames({ open: isOpen }, 'jk-input-select jk-br-ie jk-row space-between nowrap')}
                ref={selectLayoutRef}
              >
                <div className="jk-row left jk-multi-select-selected-options jk-pg-xsm">
                  {optionsSelected.map(optionSelected => (
                    <div className="jk-tag bc-hl jk-row nowrap" key={JSON.stringify(optionSelected.value)}>
                      {optionSelected?.inputLabel ? renderReactNodeOrFunction(optionSelected.inputLabel) : renderReactNodeOrFunction(
                        optionSelected.label)}
                      {!isDisabled && (
                        <CloseIcon
                          size="small"
                          filledCircle
                          onClick={event => {
                            onChange(
                              optionsSelected.filter(option => JSON.stringify(optionSelected.value) !== JSON.stringify(option.value)),
                              optionSelected,
                            );
                            event.stopPropagation();
                          }}
                          className="cr-hd"
                        />
                      )}
                    </div>
                  ))}
                </div>
                <div className="jk-row nowrap jk-multi-select-selected-icons">
                  {!isDisabled && (
                    <CloseIcon
                      className="input-icon"
                      onClick={event => {
                        onChange([], undefined);
                        event.stopPropagation();
                      }}
                    />
                  )}
                  <ExpandMoreIcon className="input-icon" />
                </div>
              </div>
            </>
          )}
      </div>
    </Popover>
  );
};
