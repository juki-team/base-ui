import React, { PropsWithChildren } from 'react';
import ReactCopyToClipboard from 'react-copy-to-clipboard';
import { useNotification } from '../Notifications';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ children, text }: PropsWithChildren<CopyToClipboardProps>) => {
  
  const { addQuietNotification } = useNotification();
  
  return (
    <ReactCopyToClipboard
      onCopy={() => addQuietNotification('Copied!')}
      text={text}
    >
      {children}
    </ReactCopyToClipboard>
  );
};
