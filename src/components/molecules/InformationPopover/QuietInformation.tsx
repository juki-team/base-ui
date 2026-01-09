import { T } from '../../atoms';
import { LockIcon } from '../../atoms/server';
import { InformationPopover } from './InformationPopover';
import { InformationPopoverProps } from './types';

export const QuietInformation = (props: InformationPopoverProps) => {
  return (
    <InformationPopover
      icon={
        <div className="jk-row jk-tag bc-el">
          <LockIcon size="small" filledCircle className="cr-el" />
        </div>
      }
      {...props}
    >
      <T className="tt-se fw-bd">quiet period</T>
      <T className="tt-se">
        in this period the scoreboard is not updated and the contestant will not be able to know the verdict of his
        submissions
      </T>
    </InformationPopover>
  );
};
