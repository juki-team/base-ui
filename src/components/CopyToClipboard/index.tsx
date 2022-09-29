import React, { PropsWithChildren } from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import { useNotification } from '../Notifications';
import { T } from '../Translate';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ children, text }: PropsWithChildren<CopyToClipboardProps>) => {
  
  const { addQuietNotification } = useNotification();
  
  return (
    <ReactCopyToClipboard
      onCopy={() => addQuietNotification(<T className="tt-se">copied</T>)}
      text={text}
    >
      {children}
    </ReactCopyToClipboard>
  );
};
