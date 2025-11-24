import { type ComponentPropsWithRef, type CSSProperties, forwardRef, type ReactElement, type Ref } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';
import { classNames, isBrowser } from '../../helpers';

function TextAreaComponent(props: CmpTextAreaProps, ref: Ref<HTMLTextAreaElement>) {
  
  const {
    value,
    onChange,
    style,
    className,
    register,
    onBlur,
    disabled,
    rows,
    ...rest
  } = props;
  
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
        if (isBrowser()) {
          window.requestAnimationFrame?.(() => {
            element.selectionStart = pointer;
            element.selectionEnd = pointer;
          });
        }
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

interface CmpTextAreaProps {
  value?: string,
  onChange?: (value: string) => void,
  style?: CSSProperties,
  className?: string,
  register?: UseFormRegisterReturn,
  onBlur?: () => void,
  disabled?: boolean,
  rows?: number,
  placeholder?: string,
  wrap?: 'off'
}

export type TextAreaProps = ComponentPropsWithRef<typeof TextArea>;
