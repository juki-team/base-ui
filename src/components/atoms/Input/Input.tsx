import { type ComponentPropsWithRef, forwardRef, type ReactElement, type Ref, useEffect, useId } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../../../helpers';
import type { InputCommonsProps } from '../../types';

export type CmpInputProps<T> = InputCommonsProps<T>;

function InputBaseComponent<T extends string | number | FileList, >(_props: InputProps<T> & {
  inputId: string
}, ref: Ref<HTMLInputElement>) {
  
  const {
    className,
    onChange,
    onBlur,
    type = 'text',
    value,
    register,
    disabled = false,
    size,
    autoFocus = false,
    required = false,
    inputId: id,
    onClick,
    onFocus,
    onKeyDown,
    onEnter,
    ...props
  } = _props;
  
  const {
    onChange: registerOnChange,
    onBlur: registerOnBlur,
    ref: registerRef,
    ...restRegister
  } = (register ? (typeof register === 'function' ? register((v) => (type === 'number' ? +v : v) as T) : register) : {} as Partial<UseFormRegisterReturn>);
  
  useEffect(() => {
    if (autoFocus) {
      // @ts-ignore
      setTimeout(() => ref?.current?.focus(), 10);
    }
  }, [ autoFocus, registerRef, ref ]);
  
  const length = Math.max(('' + (value || '')).length, 3);
  
  return (
    <input
      {...props}
      {...restRegister}
      onWheel={(e) => {
        if (e.currentTarget?.type === 'number' && typeof document !== 'undefined' && document.activeElement === e.currentTarget) {
          e.currentTarget?.blur();
        }
      }}
      onClick={(e) => {
        // e.currentTarget?.select();
        onClick?.(e);
      }}
      onFocus={(e) => {
        e.currentTarget?.select();
        onFocus?.();
      }}
      id={`input-${id}`}
      autoComplete={props.name}
      required={required}
      ref={registerRef || ref}
      type={type === 'files' ? 'file' : type}
      value={(type === 'file' || type === 'files') ? undefined : value as string | number}
      size={size === 'auto' ? length : size}
      disabled={disabled}
      className={classNames(className, `jk-input-${type} jk-br-ie`, { disabled })}
      onChange={registerOnChange ? registerOnChange : (type === 'file' || type === 'files') ? ({ target: { files } }) => onChange?.(files as T) : ({ target: { value } }) => {
        const newValue = (type === 'number' ? +value : value) as T;
        onChange?.(newValue);
      }}
      onBlur={registerOnBlur ? registerOnBlur : onBlur}
      style={size === 'auto' && type === 'number' ? { width: `${length + 1}em` } : {}}
      multiple={type === 'files'}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          onEnter?.(e);
        }
        onKeyDown?.(e);
      }}
    />
  );
}

export const InputBase = forwardRef(InputBaseComponent) as <T>(p: InputProps<T> & {
  inputId: string,
  ref?: Ref<HTMLInputElement>
}) => ReactElement;

function InputComponent<T extends string | number | FileList, >(_props: CmpInputProps<T>, ref: Ref<HTMLInputElement>) {
  
  const {
    type = 'text',
    expand = false,
    label: inputLabel,
    icon,
    labelPlacement = 'top-border',
    required = false,
    className,
    inputClassName,
    labelClassName,
    children,
    ...props
  } = _props;
  
  const id = useId();
  
  return (
    <div
      className={classNames(`jk-wrapper-input jk-wrapper-input-${type}`, className, {
        expand,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      {children}
      <InputBase {...props} className={inputClassName} inputId={id} type={type} required={required} ref={ref} />
      <label htmlFor={`input-${id}`} className={labelClassName}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
      {icon}
    </div>
  );
}

// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
export const Input = forwardRef(InputComponent) as <T>(p: CmpInputProps<T> & {
  ref?: Ref<HTMLInputElement>
}) => ReactElement;

export type InputProps<T> = ComponentPropsWithRef<typeof Input<T>>;
