import { type MouseEventHandler } from 'react';
import { classNames } from '../../../helpers';
import type { InputToggleProps } from '../Input/types';

export function InputToggle(props: InputToggleProps) {
  
  const {
    className,
    checked,
    onChange,
    type = 'rounded',
    leftLabel,
    rightLabel,
    size = 'regular',
    disabled = false,
    ...restProps
  } = props;
  
  const isDisabled = disabled || !onChange;
  const handleClick = (value: boolean): MouseEventHandler<HTMLParagraphElement> => event => {
    if (!isDisabled) {
      onChange?.(value);
    }
    event.preventDefault();
  };
  
  return (
    <label className={classNames('jk-wrapper-input-toggle', type, className, size, { disabled: isDisabled })} {...restProps}>
      <div onClick={handleClick(false)}>{leftLabel}</div>
      <input
        className="jk-input-toggle" type="checkbox" checked={checked}
        onChange={({ target: { checked } }) => isDisabled ? null : onChange?.(checked)}
      />
      <span
        className="jk-input-toggle-slider"
        style={{
          marginLeft: !!leftLabel ? 'var(--pad-xt)' : undefined,
          marginRight: !!rightLabel ? 'var(--pad-xt)' : undefined,
        }}
      />
      <div onClick={handleClick(true)}>{rightLabel}</div>
    </label>
  );
}
