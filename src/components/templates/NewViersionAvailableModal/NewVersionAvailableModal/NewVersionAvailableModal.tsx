import React from 'react';
import { T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/types';
import { TwoActionModal } from '../../../molecules';

export interface NewVersionAvailableModalProps extends BasicModalProps {
  previousVersion: string,
  newVersion: string,
  reload: () => void,
}

export const NewVersionAvailableModal = (props: NewVersionAvailableModalProps) => {
  
  const { reload, previousVersion, newVersion, ...restProps } = props;
  
  return (
    <TwoActionModal
      {...restProps}
      secondary={{ label: <T>cancel</T>, onClick: props.onClose }}
      primary={{ label: <T>reload</T>, onClick: reload }}
      title={<div><T>attention</T></div>}
      className="jk-pg"
    >
      <div className="jk-col gap left stretch">
        <div>
          <T className="tt-se">
            there is an interface update available, to use the new interface you need to reload the application.
          </T>
        </div>
        <div>
          <T className="tt-se">your UI version is</T>&nbsp;
          <span className="jk-tag gray-6">{previousVersion}</span>&nbsp;
          <T>and the new UI version available is</T>&nbsp;
          <span className="jk-tag gray-6">{newVersion}</span>.
        </div>
        <div>
          <T className="tt-se">
            an interface update may mean improvements in the user experience and/or bug fixes.
          </T>
        </div>
        <div>
          <T className="tt-se fw-bd">if you reload the page, any changes that are not saved will be lost.</T>
        </div>
      </div>
    </TwoActionModal>
  );
};
