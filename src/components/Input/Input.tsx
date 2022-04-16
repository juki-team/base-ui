import React, { forwardRef, ReactElement, Ref } from 'react';
import { classNames } from '../../helpers';
import { InputProps } from './types';

const InputComponent = <T extends string | number, >({
  className,
  onChange,
  type = 'text',
  block,
  value,
  register,
  ...props
}: InputProps<T>, ref: Ref<HTMLInputElement>) => {
  
  const { onChange: registerOnChange, ref: registerRef, ...restRegister } = register || {};
  
  return (
    <input
      ref={registerRef || ref}
      type={type}
      value={value}
      size={Math.max(('' + (value || '')).length, 3)}
      className={classNames(className || '', `jk-input-${type} jk-border-radius-inline`, { block: !!block })}
      onChange={registerOnChange ? registerOnChange : ({ target: { value } }) => {
        const newValue = (type === 'number' ? +value : value) as T;
        onChange?.(newValue);
      }}
      {...props}
      {...restRegister}
    />
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
export const Input = forwardRef(InputComponent) as <T>(p: InputProps<T> & { ref?: Ref<HTMLInputElement> }) => ReactElement;
