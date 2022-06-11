import React, { ReactNode, useEffect, useRef } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, getTextContent, renderReactNodeOrFunction } from '../../helpers';
import { useHandleState } from '../../hooks';
import { CloseIcon, InputCheckbox, MultiSelectProps, Popover, SelectOptionType, UpIcon } from '../index';

export const MultiSelect = <T, U extends ReactNode, V extends ReactNode>({
  className,
  options,
  selectedOptions: initialOptionsSelected,
  onChange,
  showOptions: _showOptions,
  onChangeShowOptions: _onChangeShowOptions,
  disabled,
  optionsPlacement = 'bottom',
  block,
}: MultiSelectProps<T, U, V>) => {
  
  const { width: widthContainer, ref: selectLayoutRef } = useResizeDetector();
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
  
  const optionsSelected: SelectOptionType<T, U, V>[] = initialOptionsSelected.map(initialOptionSelected => {
    const option = options.find(option => JSON.stringify(option.value) === JSON.stringify(initialOptionSelected.value));
    return {
      value: initialOptionSelected.value,
      label: initialOptionSelected.label || option?.label || '' as unknown as U,
      inputLabel: initialOptionSelected.inputLabel || option?.inputLabel || '' as unknown as V,
    };
  });
  
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
          })}
        </div>
      }
    >
      <div
        className={classNames('jk-multi-select-layout', className, { open: showOptions, disabled: isDisabled })}
        style={{ width: block ? '100%' : `${containerWidth}px` }}
      >
        <div className="jk-select jk-border-radius-inline jk-row space-between nowrap" ref={selectLayoutRef}>
          <div className="jk-row left jk-multi-select-selected-options">
            {optionsSelected.map(optionSelected => (
              <div className="jk-tag gray-6 jk-row nowrap" key={JSON.stringify(optionSelected.value)}>
                {optionSelected?.inputLabel ? renderReactNodeOrFunction(optionSelected.inputLabel) : renderReactNodeOrFunction(optionSelected.label)}
                {!!onChange && (
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
          <div className="jk-row nowrap">
            {!!onChange && (
              <CloseIcon
                className="input-icon"
                onClick={event => {
                  onChange([]);
                  event.stopPropagation();
                }}
              />
            )}
            <UpIcon rotate={180} className="input-icon" />
          </div>
        </div>
      </div>
    </Popover>
  );
};
