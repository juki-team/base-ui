import React, { MouseEvent, useState } from 'react';
import { classNames, copy } from '../../../helpers';
import { ContentCopyIcon } from '../server';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ text, size = 'regular', tooltip, children }: CopyToClipboardProps) => {
  
  const [ isOpen, setIsOpen ] = useState(false);
  
  const handleClick = async <T, >(event: MouseEvent<T>) => {
    await copy(text);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 800);
  };
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? 'copied' : tooltip ?? 'copy'}
      className={classNames('jk-button-light-only-icon jk-row bc-hl link jk-br-ie', size)}
      style={{ width: 'min-content', height: 'min-content', padding: 'calc(var(--gap) / 3)' }}
      onClick={handleClick}
    >
      {children ?? <ContentCopyIcon size={size} />}
    </div>
  );
};
