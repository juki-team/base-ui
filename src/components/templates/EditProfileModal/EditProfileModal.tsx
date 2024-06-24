import { ContentResponseType, JUDGE, Judge, Status, UserProfileResponseDTO } from '@juki-team/commons';
import React, { Dispatch, useRef, useState } from 'react';
import { jukiSettings } from '../../../config';
import { ALPHANUMERIC_DASH_UNDERSCORE_REGEX } from '../../../constants';
import { classNames } from '../../../helpers';
import { useEntityDiff, useJukiUI, useJukiUser, useSWR } from '../../../hooks';
import { UpdateUserProfileDataPayloadDTO } from '../../../types';
import {
  BasicModalProps,
  Button,
  CityIcon,
  EditIcon,
  Input,
  LocationOnIcon,
  Modal,
  PersonIcon,
  SchoolIcon,
  T,
  TextArea,
} from '../../atoms';
import { ButtonLoader } from '../../molecules';
import { ImageProfileModal } from './ImageProfileModal';

interface EditProfileModalPros extends BasicModalProps {
  user: UserProfileResponseDTO,
  onClose: () => void,
  onSuccess?: (props: {
    body: UpdateUserProfileDataPayloadDTO,
    response: ContentResponseType<string>,
  }) => Promise<void> | (() => void),
}

interface JudgeInputProps {
  judge: { value: Judge, label: string, logo: string, url: string, logoSize: [ number, number ] },
  user: UserProfileResponseDTO,
  setUser: Dispatch<UserProfileResponseDTO>,
}

const JudgeInput = ({ judge: { value, label, logo, url, logoSize }, user, setUser }: JudgeInputProps) => {
  
  const { components: { Image } } = useJukiUI();
  const height1 = (32 / logoSize[0]) * logoSize[1];
  const width1 = 32;
  
  const height2 = (24 / logoSize[1]) * logoSize[0];
  const width2 = 24;
  
  let height;
  let width;
  if (Math.max(height1, width1) > Math.max(height2, width2)) {
    height = height2;
    width = width2;
  } else {
    height = height1;
    width = width1;
  }
  
  return (
    <div className="jk-form-item" key={value}>
      <Input
        label={
          <div className="jk-row left gap">
            <Image
              src={logo}
              alt={label}
              height={height}
              width={width}
            />
            <span>{label}</span>
          </div>
        }
        labelPlacement="top"
        onChange={nickname => setUser({ ...user, handles: { ...(user.handles || {}), [value]: nickname } })}
        value={user?.handles?.[value]}
      />
    </div>
  );
};

export function EditProfileModal({ user, isOpen, onClose, onSuccess }: EditProfileModalPros) {
  
  const [ userState, setUserState ] = useState(user);
  const { updateUserProfileData, mutatePing } = useJukiUser();
  const { components: { Image } } = useJukiUI();
  const { mutate } = useSWR();
  const loadingRef = useRef(false);
  useEntityDiff(user, isOpen && !loadingRef.current);
  const [ modalImageProfile, setModalImageProfile ] = useState(false);
  const validLengthNickname = userState.nickname.length >= 3 && userState.nickname.length <= 32;
  const validCharNickname = ALPHANUMERIC_DASH_UNDERSCORE_REGEX.test(userState.nickname);
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="user-profile jk-row stretch center gap jk-pg-md pn-re">
        <ImageProfileModal
          onClose={() => setModalImageProfile(false)}
          nickname={user.nickname}
          isOpen={modalImageProfile}
        />
        <div className="jk-col top jk-pg-md">
          <Image
            width={48}
            height={48}
            src={user?.imageUrl}
            className="jk-user-profile-img huge elevation-1"
            alt={user?.nickname as string}
          />
          <EditIcon onClick={() => setModalImageProfile(true)} />
        </div>
        <div className={classNames('jk-col top stretch left jk-pg-md gap')}>
          <div className="jk-form-item">
            <Input
              label={
                <div className="jk-row left gap"><PersonIcon size="small" /><T className="tt-se">nickname</T></div>
              }
              labelPlacement="top"
              onChange={nickname => setUserState({ ...userState, nickname })}
              value={userState.nickname}
            />
            <p>
              {!validLengthNickname
                ? <T className="tt-se">must be at least 3 characters and must be less than 32 characters</T>
                : !validCharNickname &&
                <T className="tt-se">only alphanumeric characters or dash or underscore is valid</T>}
            </p>
          </div>
          <div className="jk-row gap">
            <div className="jk-form-item">
              <Input
                label={
                  <div className="jk-row left gap"><PersonIcon size="small" /><T className="tt-se">given name</T></div>
                }
                labelPlacement="top"
                onChange={givenName => setUserState({ ...userState, givenName })}
                value={userState.givenName}
              />
            </div>
            <div className="jk-form-item">
              <Input
                label={
                  <div className="jk-row left gap"><PersonIcon size="small" /><T className="tt-se">family name</T></div>
                }
                labelPlacement="top"
                onChange={familyName => setUserState({ ...userState, familyName })}
                value={userState.familyName}
              />
            </div>
          </div>
          <div className="jk-form-item">
            <label>
              <div className="jk-row left gap"><PersonIcon size="small" /><T className="tt-se">about me</T></div>
              <TextArea onChange={aboutMe => setUserState({ ...userState, aboutMe })} value={userState.aboutMe} />
            </label>
          </div>
          <div className="jk-row gap">
            <div className="jk-form-item">
              <Input
                label={<div className="jk-row left gap"><CityIcon size="small" /><T className="tt-se">country</T></div>}
                labelPlacement="top"
                onChange={country => setUserState({ ...userState, country })}
                value={userState.country}
              />
            </div>
            <div className="jk-form-item">
              <Input
                label={
                  <div className="jk-row left gap"><LocationOnIcon size="small" /><T className="tt-se">city</T></div>
                }
                labelPlacement="top"
                onChange={city => setUserState({ ...userState, city })}
                value={userState.city}
              />
            </div>
          </div>
          <div className="jk-form-item">
            <Input
              label={
                <div className="jk-row left gap"><SchoolIcon size="small" /><T className="tt-se">institution</T></div>
              }
              labelPlacement="top"
              onChange={institution => setUserState({ ...userState, institution })}
              value={userState.institution}
            />
          </div>
          <div className="fw-bd"><T className="tt-se">nicknames from other judges</T></div>
          {[ [ Judge.CODEFORCES, Judge.CODEFORCES_GYM ], [ Judge.UVA_ONLINE_JUDGE, Judge.CODECHEF ], [ Judge.AT_CODER, Judge.TOPCODER ], [ Judge.JV_UMSA, Judge.JUKI_JUDGE ] ]
            .map(([ judge1, judge2 ]) => (
              <div className="jk-row gap block">
                <JudgeInput judge={JUDGE[judge1]} user={userState} setUser={setUserState} />
                {JUDGE[judge2]
                  ? <JudgeInput judge={JUDGE[judge2]} user={userState} setUser={setUserState} />
                  : <div className="jk-form-item" />}
              </div>
            ))}
        </div>
        <div className="jk-row gap extend right">
          <Button type="light" onClick={onClose}><T>cancel</T></Button>
          <ButtonLoader
            disabled={!validLengthNickname || !validCharNickname}
            onClick={(setLoader) => {
              const body = {
                nickname: userState.nickname,
                givenName: userState.givenName,
                familyName: userState.familyName,
                aboutMe: userState.aboutMe,
                country: userState.country,
                city: userState.city,
                institution: userState.institution,
                handles: userState.handles,
              };
              updateUserProfileData({
                params: { nickname: user.nickname },
                body,
                setLoader,
                onSuccess: async (response) => {
                  loadingRef.current = true;
                  setLoader?.(Status.LOADING);
                  await mutatePing();
                  await mutate(jukiSettings.API.user.getProfile({ params: { nickname: user.nickname } }).url);
                  await onSuccess?.({ body, response });
                  setLoader?.(Status.SUCCESS);
                  loadingRef.current = false;
                  onClose();
                },
              });
            }}
          >
            <T>update</T>
          </ButtonLoader>
        </div>
      </div>
    </Modal>
  );
}
