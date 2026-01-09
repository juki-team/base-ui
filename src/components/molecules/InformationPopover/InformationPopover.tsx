import { PropsWithChildren } from 'react';
import { Popover } from '../../atoms';
import { ExclamationIcon } from '../../atoms/server';
import { InformationPopoverProps } from './types';

export const InformationPopover = ({ children, filledCircle, icon }: PropsWithChildren<InformationPopoverProps>) => {
  return (
    <Popover
      popoverClassName="bc-we jk-br-ie elevation-1 jk-pg-xsm"
      content={
        <div style={{ maxWidth: '200px' }}>
          {children}
        </div>
      }
    >
      <div className="jk-row">
        {icon ?? (filledCircle
          ? <ExclamationIcon rotate={180} filledCircle size="small" />
          : <ExclamationIcon rotate={180} circle size="small" />)}
      </div>
    </Popover>
  );
};
