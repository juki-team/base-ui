import { Tooltip as ReactTooltip } from 'react-tooltip';
import { T } from '../../T/T';

export default function Tooltip() {
  return (
    <ReactTooltip
      id="jk-tooltip"
      opacity={1}
      // isOpen
      positionStrategy="fixed"
      clickable
      // disableStyleInjection
      render={({ content, activeAnchor }) => (
        content ?
          activeAnchor?.getAttribute('data-tooltip-t') === 'false'
            ? content
            :
            <T className={activeAnchor?.getAttribute('data-tooltip-t-class-name') ?? 'tt-se tx-s'}>{content}</T>
          : null // Relevant attribute: { || 'not set'}
      )}
    />
  );
}
