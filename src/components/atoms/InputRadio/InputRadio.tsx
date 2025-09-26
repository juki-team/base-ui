import { classNames } from '../../../helpers';
import type { InputRadioProps } from '../Input/types';

export function InputRadio({ className, checked, disabled, onChange, label, ...props }: InputRadioProps) {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <label className={classNames('jk-wrapper-input jk-wrapper-input-radio jk-row gap', className, { disabled: isDisabled })}>
      <input
        type="radio"
        className={classNames('jk-input-radio', { disabled: isDisabled })}
        onChange={isDisabled ? undefined : ({ target: { checked } }) => {
          onChange?.(checked);
        }}
        checked={checked}
        disabled={isDisabled}
        {...props}
      />
      {label}
    </label>
  );
}
