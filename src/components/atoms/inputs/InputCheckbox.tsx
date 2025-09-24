import { classNames } from '../../../helpers';
import { InputCheckboxProps } from './types';

export const InputCheckbox = ({ className, checked, disabled, onChange, label, ...props }: InputCheckboxProps) => {
  
  const isDisabled = disabled || !onChange;
  
  return (
    <label className={classNames('jk-wrapper-input jk-wrapper-input-checkbox jk-row nowrap left gap jk-br-ie', className)}>
      <input
        type="checkbox"
        className={classNames('jk-input-checkbox jk-br-ie', { disabled: isDisabled })}
        onChange={isDisabled ? undefined : ({ target: { checked } }) => onChange?.(checked)}
        checked={checked}
        disabled={isDisabled}
        {...props}
      />
      {label}
    </label>
  );
};
