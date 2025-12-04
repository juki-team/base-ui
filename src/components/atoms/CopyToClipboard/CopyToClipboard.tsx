import { type MouseEvent, useState } from 'react';
import { classNames, copy } from '../../helpers';
import { CheckIcon, ContentCopyIcon } from '../server';
import type { CopyToClipboardProps } from './types';

export function CopyToClipboard({
                                  text,
                                  size = 'regular',
                                  tooltip,
                                  children,
                                  noStyling,
                                  className,
                                }: CopyToClipboardProps) {
  
  const [ isOpen, setIsOpen ] = useState(false);
  
  const handleClick = async <T, >(event: MouseEvent<T>) => {
    event.preventDefault();
    event.stopPropagation();
    await copy(text);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 600);
  };
  
  return (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? 'copied' : tooltip ?? 'copy'}
      // data-tooltip-place="left"
      className={classNames('jk-row gap', size, className, {
        'link jk-br-ie jk-button light': !noStyling,
        'only-icon': !children,
      })}
      style={noStyling || !children ? {} : {
        width: 'min-content',
        height: 'min-content',
        // padding: 'calc(var(--gap) / 3)',
      }}
      onClick={handleClick}
    >
      {/*{children ?? (isOpen ? <CheckIcon size={size} /> : <ContentCopyIcon size={size} />)}*/}
      {(isOpen ? <CheckIcon size={size} /> : <ContentCopyIcon size={size} />)}
      {children}
    </div>
  );
}
