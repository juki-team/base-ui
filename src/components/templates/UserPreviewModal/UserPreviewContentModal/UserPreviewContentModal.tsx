import {
  ContentResponseType,
  ContentsResponseType,
  Judge,
  JUDGE,
  JudgeDataResponseDTO,
  UserBasicResponseDTO,
} from '@juki-team/commons';
import React from 'react';
import { useFetcher } from '../../../../hooks';
import { useJukiUI } from '../../../../hooks/useJukiUI';
import { jukiApiManager } from '../../../../settings';
import { Button, CopyToClipboard, Modal, T } from '../../../atoms';
import { BasicModalProps } from '../../../atoms/Modal/types';
import { ButtonLoader, FetcherLayer } from '../../../molecules';
import { LocationOnIcon, MailIcon, OpenInNewIcon, SchoolIcon } from '../../../server';

export const UserPreview = ({ user, onClose, userHref }: {
  user: UserBasicResponseDTO,
  onClose: () => void,
  userHref: string
}) => {
  
  const { components: { Image, Link } } = useJukiUI();
  const { data } = useFetcher<ContentsResponseType<JudgeDataResponseDTO>>(
    jukiApiManager.API_V1.judge.getSummaryList().url,
  );
  
  return (
    <div className="jk-pg-md jk-col stretch gap">
      <div className="jk-row center gap">
        <Image
          src={user?.imageUrl}
          className="jk-user-profile-img elevation-1"
          alt={user?.nickname}
          height={100}
          width={100}
        />
        <div className="jk-col stretch">
          <div className="jk-col stretch">
            <div className="jk-row left gap nowrap">
              <h3 className="fl-tt-il">{user?.nickname}</h3>
              <CopyToClipboard text={user?.nickname} size="small" />
            </div>
            <div className="cr-g3">{user?.givenName} {user?.familyName}</div>
          </div>
          <div className="jk-col gap stretch">
            <div className="jk-divider tiny" />
            {(user?.city?.trim() || user?.country?.trim()) && (
              <div className="jk-row left gap">
                <LocationOnIcon />{user?.city}{user?.city && ','} {user?.country}
              </div>
            )}
            {user?.institution?.trim() && (
              <div className="jk-row left gap nowrap wb-ba"><SchoolIcon />{user?.institution}</div>
            )}
            <div className="jk-row left gap nowrap wb-ba"><MailIcon />{user?.email}</div>
          </div>
          <div className="jk-divider tiny" />
          <div className="jk-col gap stretch">
            {Object.entries(user?.handles || {})
              .filter(([ judge, nickname ]) => !!nickname && !!JUDGE[judge as Judge])
              .map(([ judge, nickname ]) => {
                const getProfileUrl = data?.success ? data?.contents.find(({ key }) => key === judge)?.getProfileUrl : '';
                const getProfileUrlFn = new Function('userNickname', getProfileUrl || 'return \'\'');
                const externalUrl = getProfileUrlFn(nickname) as string;
                
                return (
                  <div key={judge}>
                    <div className="jk-col left gap block stretch">
                      <div className="jk-row gap">
                        <Image
                          src={JUDGE[judge as Judge]?.logo}
                          alt={judge}
                          height={(64 / JUDGE[judge as Judge]?.logoSize[0]) * JUDGE[judge as Judge]?.logoSize[1]}
                          width={64}
                        />
                        {externalUrl ? (
                          <Link href={externalUrl} target="_blank" rel="noopener noreferrer" className="link">
                            {nickname}
                          </Link>
                        ) : nickname}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
      <div className="jk-row-col gap block stretch">
        <ButtonLoader size="small" type="light" onClick={onClose}><T className="tt-se">close</T></ButtonLoader>
        <Link href={userHref} target="_blank" rel="noreferrer">
          <Button size="small" expand>
            <div className="jk-row nowrap gap"><T className="ws-np tt-se">see profile</T><OpenInNewIcon /></div>
          </Button>
        </Link>
      </div>
    </div>
  );
};

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
          <UserPreview user={data?.content} onClose={onClose} userHref={userHref} />
        )}
      </FetcherLayer>
    </Modal>
  );
};
