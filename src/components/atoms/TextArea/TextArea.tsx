import { forwardRef, ReactElement, Ref } from 'react';
import { classNames } from '../../../helpers';
import { CmpTextAreaProps } from './types';

export const TextAreaComponent = ({
                                    value,
                                    onChange,
                                    style,
                                    className,
                                    register,
                                    onBlur,
                                    disabled,
                                    rows,
                                    ...rest
                                  }: CmpTextAreaProps, ref: Ref<HTMLTextAreaElement>) => {
  
  const { onChange: registerOnChange, onBlur: registerOnBlur, ref: registerRef, ...restRegister } = register || {};
  
  return (
    <textarea
      {...rest}
      {...restRegister}
      ref={registerRef ?? ref}
      className={classNames('jk-pg-sm jk-input-textarea jk-br-ie wh-100', className, { disabled: !!disabled })}
      value={value}
      onChange={registerOnChange ? registerOnChange : ({ target }) => {
        const pointer = target.selectionStart;
        const element = target;
        window?.requestAnimationFrame?.(() => {
          element.selectionStart = pointer;
          element.selectionEnd = pointer;
        });
        onChange?.(target.value);
      }}
      onBlur={registerOnBlur ? registerOnBlur : onBlur}
      disabled={disabled}
      rows={rows ?? Math.max((value || '').split('\n').length, 2)}
      style={style}
    />
  );
};

export const TextArea = forwardRef(TextAreaComponent) as (p: CmpTextAreaProps & {
  ref?: Ref<HTMLTextAreaElement>
}) => ReactElement;
