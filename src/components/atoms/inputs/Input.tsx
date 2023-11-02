import React, { forwardRef, ReactElement, Ref, useEffect, useId } from 'react';
import { classNames } from '../../../helpers';
import { InputProps } from './types';

const InputComponent = <T extends string | number | FileList, >(_props: InputProps<T>, ref: Ref<HTMLInputElement>) => {
  
  const {
    className,
    onChange,
    onBlur,
    type = 'text',
    extend = false,
    value,
    register,
    disabled = false,
    size,
    autoFocus = false,
    label: inputLabel,
    icon,
    ...props
  } = _props;
  
  const id = useId();
  const { onChange: registerOnChange, onBlur: registerOnBlur, ref: registerRef, ...restRegister } = register || {};
  const length = Math.max(('' + (value || '')).length, 3);
  useEffect(() => {
    if (autoFocus) {
      // @ts-ignore
      setTimeout(() => ref?.current?.focus(), 10);
    }
  }, [ autoFocus, registerRef, ref ]);
  
  return (
    <div className={`jk-input-${type}-wrapper a`}>
      <input
        {...props}
        {...restRegister}
        id={`input-${id}`}
        ref={registerRef || ref}
        type={type === 'files' ? 'file' : type}
        value={(type === 'file' || type === 'files') ? undefined : value as string | number}
        size={size === 'auto' ? length : size}
        disabled={disabled}
        className={classNames(className, `jk-input-${type} jk-border-radius-inline`, { extend, disabled })}
        onChange={registerOnChange ? registerOnChange : (type === 'file' || type === 'files') ? ({ target: { files } }) => onChange?.(files as T) : ({ target: { value } }) => {
          const newValue = (type === 'number' ? +value : value) as T;
          onChange?.(newValue);
        }}
        onBlur={registerOnBlur ? registerOnBlur : onBlur}
        style={size === 'auto' && type === 'number' ? { width: `${length + 1}em` } : {}}
        multiple={type === 'files'}
      />
      <label htmlFor={`input-${id}`}>
        {inputLabel}
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

InputComponent.defaultProps = {
  type: 'text',
  extend: false,
  disabled: false,
  autoFocus: false,
}

// https://stackoverflow.com/questions/58469229/react-with-typescript-generics-while-using-react-forwardref/58473012
// @ts-ignore
export const Input = forwardRef(InputComponent) as <T>(p: InputProps<T> & {
  ref?: Ref<HTMLInputElement>
}) => ReactElement;
