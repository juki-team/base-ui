import { type ChangeEvent, useRef } from 'react';
import { classNames, getTextContent } from '../../helpers';
import type { ReactNodeOrFunctionType } from '../../types';
import type { SelectOptionType, SelectProps } from './types';

function getOptionTextLabel<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType>(
  option: SelectOptionType<T, U, V>,
): string {
  if (option.inputLabel) {
    const text = getTextContent(option.inputLabel);
    if (text) return text;
  }
  return getTextContent(option.label);
}

export function Select<T, U extends ReactNodeOrFunctionType, V extends ReactNodeOrFunctionType>(props: SelectProps<T, U, V>) {

  const {
    className,
    options,
    selectedOption: initialOptionSelected,
    onChange,
    disabled = false,
    expand = false,
    containerWidth,
    onBlur,
  } = props;

  const selectRef = useRef<HTMLSelectElement>(null);

  const selectedIndex = options.findIndex(option =>
    option.key != null && initialOptionSelected.value != null
      ? option.key === String(initialOptionSelected.value)
      : Object.is(option.value, initialOptionSelected.value),
  );

  const isDisabled = disabled || !onChange;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const index = Number(event.target.value);
    const option = options[index];
    if (option && !option.disabled) {
      onChange?.(option);
    }
  };

  const widthStyle = containerWidth === 'child'
    ? 'fit-content'
    : typeof containerWidth === 'number'
      ? `min(${containerWidth}px, 100%)`
      : expand
        ? '100%' : undefined;

  return (
    <div
      className={classNames('jk-select-layout', className, { disabled: isDisabled })}
      style={{
        width: widthStyle,
        minWidth: widthStyle,
        height: 'fit-content',
      }}
    >
      <select
        ref={selectRef}
        className={classNames('jk-select-native jk-br-ie', { disabled: isDisabled })}
        value={selectedIndex >= 0 ? selectedIndex : ''}
        onChange={handleChange}
        disabled={isDisabled}
        onBlur={onBlur ? () => onBlur({ target: selectRef }) : undefined}
        style={{ width: '100%' }}
      >
        {selectedIndex < 0 && (
          <option value="" disabled>
            {getTextContent(initialOptionSelected.label) || '—'}
          </option>
        )}
        {options.map((option, index) => (
          <option
            key={option.key ?? index}
            value={index}
            disabled={!!option.disabled}
          >
            {getOptionTextLabel(option)}
          </option>
        ))}
      </select>
    </div>
  );
}
