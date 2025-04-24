import React, { forwardRef, ReactElement, Ref, useEffect, useId } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { classNames } from '../../../helpers';
import { CmpInputProps, InputProps } from './types';

const BasicInputComponent = <T extends string | number | FileList, >(_props: InputProps<T> & {
  inputId: string
}, ref: Ref<HTMLInputElement>) => {
  
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
      onWheel={(e) => e.target instanceof HTMLElement && e?.target?.blur()}
      onClick={(e) => {
        e.currentTarget?.select();
        onClick?.();
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
      className={classNames(className, `jk-input-${type} jk-border-radius-inline`, { disabled })}
      onChange={registerOnChange ? registerOnChange : (type === 'file' || type === 'files') ? ({ target: { files } }) => onChange?.(files as T) : ({ target: { value } }) => {
        const newValue = (type === 'number' ? +value : value) as T;
        onChange?.(newValue);
      }}
      onBlur={registerOnBlur ? registerOnBlur : onBlur}
      style={size === 'auto' && type === 'number' ? { width: `${length + 1}em` } : {}}
      multiple={type === 'files'}
    />
  );
};

// @ts-ignore
export const BasicInput = forwardRef(BasicInputComponent) as <T>(p: InputProps<T> & {
  inputId: string,
  ref?: Ref<HTMLInputElement>
}) => ReactElement;

const InputComponent = <T extends string | number | FileList, >(_props: CmpInputProps<T>, ref: Ref<HTMLInputElement>) => {
  
  const {
    type = 'text',
    extend = false,
    label: inputLabel,
    icon,
    labelPlacement = 'top-border',
    required = false,
    ...props
  } = _props;
  
  const id = useId();
  
  return (
    <div
      className={classNames(`jk-input-${type}-wrapper`, {
        extend,
        [`label-${labelPlacement}`]: true,
        required,
        'no-label': !inputLabel,
      })}
    >
      <BasicInput {...props} inputId={id} type={type} required={required} ref={ref} />
      <label htmlFor={`input-${id}`}>
        {inputLabel}{labelPlacement === 'left' ? <>:&nbsp;</> : ''}
      </label>
      {icon}
    </div>
  );
};
//
// const InputComponentOld = <T extends string | number, >({
//   className,
//   onChange,
//   offline = false,
//   type = 'text',
//   value,
//   block,
//   ...props
// }: InputProps<T> & { offline: boolean, value: T }, ref: Ref<HTMLInputElement>) => {
//
//   const [editValue, setEditValue] = useState<T>(value);
//   useEffect(() => setEditValue(value), [value]);
//
//   return (
//     <input
//       ref={ref}
//       type={type}
//       size={Math.max(('' + (offline ? editValue : value)).length, 3)}
//       value={offline ? editValue : value}
//       className={classNames(className || '', `jk-input-${type} jk-border-radius-inline`, { offline, block: !!block })}
//       onChange={({ target: { value } }) => {
//         const newValue = (type === 'number' ? +value : value) as T;
//         if (offline) {
//           setEditValue(newValue);
//         } else {
//           onChange?.(newValue);
//         }
//       }}
//       onBlur={() => {
//         const newValue = (type === 'number' ? +value : value) as T;
//         if (offline) {
//           onChange?.(newValue);
//         }
//       }}
//       onKeyDown={event => {
//         if (event.key === 'Enter') {
//           const newValue = (type === 'number' ? +value : value) as T;
//           if (offline) {
//             onChange?.(newValue);
//           }
//         }
//       }}
//       {...props}
//     />
//   );
// };

// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
export const Input = forwardRef(InputComponent) as <T>(p: CmpInputProps<T> & {
  ref?: Ref<HTMLInputElement>
}) => ReactElement;
