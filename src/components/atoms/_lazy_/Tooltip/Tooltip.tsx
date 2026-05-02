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
      render={({ content, activeAnchor }) => {
        if (!content) {
          return null;
        }
        if (typeof content !== 'string' || activeAnchor?.getAttribute('data-tooltip-t') === 'false') {
          return content;
        }
        const className = activeAnchor?.getAttribute('data-tooltip-t-class-name') ?? 'tt-se tx-s';
        return <T className={className}>{content}</T>;
      }}
    />
  );
}
