import { ContentResponseType, UserBasicResponseDTO } from '@juki-team/commons';
import React from 'react';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { jukiApiManager } from '../../../../settings';
import { Button, CopyToClipboard, Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader, FetcherLayer } from '../../../molecules';
import { LocationOnIcon, MailIcon, OpenInNewIcon, SchoolIcon } from '../../../server';

export interface UserPreviewContentModalProps extends BasicModalProps {
  nickname: string,
  companyKey?: string,
  userHref: string,
}

export const UserPreviewContentModal = ({
                                          isOpen,
                                          nickname,
                                          companyKey,
                                          onClose,
                                          userHref,
                                        }: UserPreviewContentModalProps) => {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="modal-user-preview"
    >
      <FetcherLayer<ContentResponseType<UserBasicResponseDTO>>
        url={jukiApiManager.API_V1.user.getSummary({ params: { nickname, companyKey } }).url}
        onError={onClose}
      >
        {({ data }) => (
          <div className="jk-pg-md jk-col stretch gap">
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
                    <CopyToClipboard text={data?.content?.nickname} size="small" />
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
                <Button size="small" expand>
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
