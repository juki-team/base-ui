import { ContentResponseType, UserBasicResponseDTO } from '@juki-team/commons';
import React from 'react';
import { Button, FetcherLayer, LocationOnIcon, MailIcon, Modal, OpenInNewIcon, SchoolIcon, T } from '../../components';
import { settings } from '../../config';
import { classNames } from '../../helpers';
import { useJukiUI } from '../../hooks';
import { ImageCmpProps } from '../types';

interface UserPreviewModalProps {
  nickname: string,
  ImageCmp: React.FC<ImageCmpProps>,
  onClose: () => void,
  userHref: string,
}

export const UserPreviewModal = ({ nickname, ImageCmp, onClose, userHref }: UserPreviewModalProps) => {
  
  const { viewPortSize } = useJukiUI();
  
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      className="modal-user-preview wh-aoa"
      closeWhenClickOutside
    >
      <FetcherLayer<ContentResponseType<UserBasicResponseDTO>>
        url={settings.getAPI().user.summary({ params: { nickname } }).url}
        onError={onClose}
      >
        {({ data }) => (
          <div className="jk-pad-md jk-col stretch gap">
            <div className="jk-row center gap">
              <ImageCmp
                src={data?.content?.imageUrl}
                className="jk-user-profile-img elevation-1"
                alt={nickname}
                height={100}
                width={100}
              />
              <div className="jk-col gap stretch">
                <h3>{data?.content?.nickname}</h3>
                <div className="cr-g3">{data?.content?.givenName} {data?.content?.familyName}</div>
                <div className="jk-divider tiny" />
                {(data?.content?.city?.trim() || data?.content?.country?.trim()) && (
                  <div className="jk-row left gap">
                    <LocationOnIcon />{data?.content?.city}{data?.content?.city && ','} {data?.content?.country}
                  </div>
                )}
                {data?.content?.institution?.trim() && (
                  <div className="jk-row left gap nowrap wb-ba"><SchoolIcon />{data?.content?.institution}</div>
                )}
                <div className="jk-row left gap nowrap wb-ba"><MailIcon />{data?.content?.email}</div>
              </div>
            </div>
            <div
              className={classNames('gap block stretch', { 'jk-col': viewPortSize === 'sm', 'jk-row': viewPortSize !== 'sm' })}>
              <Button size="small" type="light" onClick={onClose}><T>close</T></Button>
              <a href={userHref} target="_blank" rel="noreferrer">
                <Button size="small" extend>
                  <div className="jk-row nowrap"><T className="ws-np">see profile</T><OpenInNewIcon /></div>
                </Button>
              </a>
            </div>
          </div>
        )}
      </FetcherLayer>
    </Modal>
  );
};
