import { classNames } from '../../helpers';
import type { InputCheckboxProps } from '../Input/types';

export function InputCheckbox({
                                className,
                                checked,
                                disabled,
                                onChange,
                                label,
                                size = 'regular',
                                ...props
                              }: InputCheckboxProps) {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <label className={classNames('jk-wrapper-input jk-wrapper-input-checkbox jk-row nowrap left jk-br-ie', className)}>
      <input
        type="checkbox"
        className={classNames('jk-input-checkbox jk-br-ie', size, { disabled: isDisabled })}
        onChange={isDisabled ? undefined : ({ target: { checked } }) => onChange?.(checked)}
        checked={checked}
        disabled={isDisabled}
        {...props}
      />
      {label}
    </label>
  );
};
