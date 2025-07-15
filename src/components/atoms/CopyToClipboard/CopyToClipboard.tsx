import React, { MouseEvent, useState } from 'react';
import { classNames, copy } from '../../../helpers';
import { ContentCopyIcon } from '../server';
import { CopyToClipboardProps } from './types';

export const CopyToClipboard = ({ text, size = 'regular', tooltip, children, noStyling }: CopyToClipboardProps) => {
  
  const [ isOpen, setIsOpen ] = useState(false);
  
  const handleClick = async <T, >(event: MouseEvent<T>) => {
    event.preventDefault();
    event.stopPropagation();
    await copy(text);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 800);
  };
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? 'copied' : tooltip ?? 'copy'}
      className={classNames('jk-button light jk-row', size, { 'bc-hl link jk-br-ie cr-we': !noStyling })}
      style={noStyling ? {} : { width: 'min-content', height: 'min-content', padding: 'calc(var(--gap) / 3)' }}
      onClick={handleClick}
    >
      {children ?? <ContentCopyIcon size={size} />}
    </div>
  );
};
