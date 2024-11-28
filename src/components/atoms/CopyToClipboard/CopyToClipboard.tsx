import React, { cloneElement, PropsWithChildren, ReactElement } from 'react';
import { copy } from '../../../helpers';
import { useJukiNotification } from '../../../hooks/useJukiNotification';
import { T } from '../T';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ children, text }: PropsWithChildren<CopyToClipboardProps>) => {
  
  const { addQuietNotification } = useJukiNotification();
  
  const handleClick = async (event: MouseEvent) => {
    if (children?.props?.onClick) {
      children.props.onClick?.(event);
    }
    await copy(text);
    addQuietNotification(<T className="tt-se">copied</T>);
  };
  
  return cloneElement(children as ReactElement, { onClick: handleClick });
};
