import { type MouseEvent, useState } from 'react';
import { classNames } from '../../helpers/commons';
import { copy } from '../../helpers/copy';
import { ContentCopyIcon } from '../server/icons/google/ContentCopyIcon';
import { DoneAllIcon } from '../server/icons/google/DoneAllIcon';
import type { CopyToClipboardProps } from './types';

export function CopyToClipboard(props: CopyToClipboardProps) {
  const { text, iconSize = 'regular', tooltipContent, children, noStyling, className, disabled = false } = props;
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async <T,>(event: MouseEvent<T>) => {
    event.preventDefault();
    event.stopPropagation();
    await copy(text);
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 600);
  };

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: handler stops propagation of the click event; keyboard not yet supported
    // biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handler not yet implemented for copy-to-clipboard
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={isOpen ? 'copied' : (tooltipContent ?? 'copy')}
      className={classNames('jk-row gap', className, {
        'link jk-br-ie jk-button secondary': !noStyling,
        'jk-row nowrap': !!children,
        'only-icon': !children,
        disabled,
      })}
      style={
        noStyling || !children
          ? {}
          : {
              width: 'min-content',
              // height: 'min-content',
              // padding: 'calc(var(--gap) / 3)',
            }
      }
      aria-disabled={disabled}
      onClick={disabled ? undefined : handleClick}
    >
      {/*{children ?? (isOpen ? <CheckIcon size={size} /> : <ContentCopyIcon size={size} />)}*/}
      {isOpen ? <DoneAllIcon size={iconSize} /> : <ContentCopyIcon size={iconSize} />}
      {children}
    </div>
  );
}
