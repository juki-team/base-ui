import { T } from '../../atoms';
import { FitnessCenterIcon } from '../../atoms/server';
import { InformationPopover } from './InformationPopover';
import { InformationPopoverProps } from './types';

export const UpsolvingInformation = (props: InformationPopoverProps) => {
  return (
    <InformationPopover
      icon={
        <div className="jk-row jk-tag bc-ss">
          <FitnessCenterIcon size="small" filledCircle className="cr-ss" />
        </div>
      }
      {...props}
    >
      <T className="tt-se fw-bd">upsolving period</T>
      <T className="tt-se">
        in this period the official scoreboard is not updated and the contestant will be able to send submissions
      </T>
    </InformationPopover>
  );
};
