import React, { forwardRef, MouseEventHandler, ReactElement, Ref } from 'react';
import { classNames } from '../../../helpers';
import { InputToggleProps } from './types';

const InputToggleComponent = (props: InputToggleProps) => {
  
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
    <label className={classNames('jk-input-toggle-wrapper', type, className, size, { disabled: isDisabled })} {...restProps}>
      <p onClick={handleClick(false)}>{leftLabel}</p>
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
      <p onClick={handleClick(true)}>{rightLabel}</p>
    </label>
  );
};

export const InputToggle = forwardRef(InputToggleComponent) as (p: InputToggleProps & {
  ref?: Ref<HTMLButtonElement>
}) => ReactElement;
