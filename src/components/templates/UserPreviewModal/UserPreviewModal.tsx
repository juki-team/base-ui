import { ContentResponseType, Status, UserBasicResponseDTO } from '@juki-team/commons';
import React from 'react';
import { jukiSettings } from '../../../config';
import { useJukiUI } from '../../../hooks/useJukiUI';
import {
  Button,
  ContentCopyIcon,
  LocationOnIcon,
  MailIcon,
  Modal,
  OpenInNewIcon,
  SchoolIcon,
  T,
  CopyToClipboard,
} from '../../atoms';
import { ButtonLoader, FetcherLayer } from '../../molecules';
import { UserPreviewModalProps } from './types';

export const UserPreviewModal = ({ isOpen, nickname, companyKey, onClose, userHref }: UserPreviewModalProps) => {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-user-preview wh-aoa"
      closeWhenClickOutside
    >
      <FetcherLayer<ContentResponseType<UserBasicResponseDTO>>
        url={jukiSettings.API.user.getSummary({ params: { nickname, companyKey } }).url}
        onError={(error) => onClose(() => () => Status.ERROR, Status.ERROR, { fetcherLayerErrorEvent: error })}
      >
        {({ data }) => (
          <div className="jk-pad-md jk-col stretch gap">
            <div className="jk-row center gap">
              <Image
                src={data?.content?.imageUrl}
                className="jk-user-profile-img elevation-1"
                alt={nickname}
                height={100}
                width={100}
              />
              <div className="jk-col stretch">
                <div className="jk-col stretch">
                  <div className="jk-row left gap nowrap">
                    <h3 className="fl-tt-il">{data?.content?.nickname}</h3>
                    <CopyToClipboard text={data?.content?.nickname}>
                      <div className="jk-button light only-icon small">
                        <ContentCopyIcon />
                      </div>
                    </CopyToClipboard>
                  </div>
                  <div className="cr-g3">{data?.content?.givenName} {data?.content?.familyName}</div>
                </div>
                <div className="jk-col gap stretch">
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
            </div>
            <div className="jk-row-col gap block stretch">
              <ButtonLoader size="small" type="light" onClick={onClose}><T>close</T></ButtonLoader>
              <a href={userHref} target="_blank" rel="noreferrer">
                <Button size="small" extend>
                  <div className="jk-row nowrap gap"><T className="ws-np">see profile</T><OpenInNewIcon /></div>
                </Button>
              </a>
            </div>
          </div>
        )}
      </FetcherLayer>
    </Modal>
  );
};
