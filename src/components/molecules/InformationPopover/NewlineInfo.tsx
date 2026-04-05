import { VoidIcon } from '../../atoms/server';
import { classNames } from '../../helpers';

export const NewlineInfo = ({ text }: { text: string }) => {
  
  const withEndLine = text.lastIndexOf('\n') === text.length - 1;
  
  return (
    <div
      className="jk-row"
      data-tooltip-id="jk-tooltip"
      data-tooltip-content={`${withEndLine ? '' : 'no '}newline at end of file`}
    >
      <VoidIcon
        size="tiny"
        letter="⏎"
        letterSize={16}
        className={classNames({ 'cr-ss-lt': withEndLine, 'cr-er-lt': !withEndLine })}
      />
    </div>
  );
};
