import React, {
  cloneElement,
  isValidElement,
  MouseEvent,
  MouseEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { copy } from '../../../helpers';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { T } from '../T/T';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ children, text }: PropsWithChildren<CopyToClipboardProps>) => {
  
  const { addQuietNotification } = useJukiNotification();
  
  const handleClick = async <T, >(event: MouseEvent<T>) => {
    if (isValidElement<{ onClick: MouseEventHandler<T> }>(children) && children?.props?.onClick) {
      children.props.onClick?.(event);
    }
    await copy(text);
    addQuietNotification(<T className="tt-se">copied</T>);
  };
  
  return cloneElement(children as ReactElement, { onClick: handleClick } as ReactElement<{}>['props']);
};
