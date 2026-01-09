import { T } from '../../atoms';
import { AcUnitIcon } from '../../atoms/server';
import { InformationPopover } from './InformationPopover';
import { InformationPopoverProps } from './types';

export const FrozenInformation = (props: InformationPopoverProps) => {
  return (
    <InformationPopover
      icon={
        <div className="jk-row jk-tag bc-io">
          <AcUnitIcon size="small" filledCircle className="cr-io" />
        </div>
      }
      {...props}
    >
      <T className="tt-se fw-bd">frozen period</T>
      <T className="tt-se">
        in this period the scoreboard is not updated but the contestant will still be able to know the verdict of
        his submissions
      </T>
    </InformationPopover>
  );
};
