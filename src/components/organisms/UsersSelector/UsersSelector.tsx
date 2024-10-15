import { ContentsResponseType, UserSummaryListResponseDTO } from '@juki-team/commons';
import React, { useEffect, useMemo, useState } from 'react';
import { jukiSettings } from '../../../config';
import { useFetcher } from '../../../hooks/useFetcher';
import { Button, Modal, PeopleIcon, ReloadIcon, SpinIcon, T, TextArea } from '../../atoms';
import { MultiSelectSearchable } from '../../molecules';
import { UserChip } from '../UserChip';
import { UsersSelectorProps } from './types';

export const UsersSelector = (props: UsersSelectorProps) => {
  
  const {
    selectedUsers,
    onChangeSelectedUsers: _onChangeSelectedUsers,
    maxUsersSelection = -1,
    companyKey,
  } = props;
  
  const { isLoading, data, mutate } = useFetcher<ContentsResponseType<UserSummaryListResponseDTO>>(
    jukiSettings.API.user.getSummaryList({ params: { companyKey } }).url,
  );
  const [ show, setShow ] = useState(false);
  const [ text, setText ] = useState('');
  const [ textNicknames, setTextNicknames ] = useState<string[]>([]);
  const [ error, setError ] = useState('');
  const users = useMemo(() => {
    const users: { [key: string]: UserSummaryListResponseDTO } = {};
    const dataUsers = (data?.success ? data?.contents : []);
    dataUsers.forEach(user => {
      users[user.nickname] = user;
    });
    return users;
  }, [ data ]);
  const dataUsers = Object.values(users);
  useEffect(() => {
    const nicknames = text.split(',').map(text => text.trim()).filter(text => !!text);
    let error = '';
    const validNicknames: string[] = [];
    nicknames.forEach(nickname => {
      if (users[nickname]) {
        validNicknames.push(nickname);
      } else {
        error += `${error ? ', ' : ''}"${nickname}" unknown nickname`;
      }
    });
    setError(error);
    setTextNicknames(validNicknames);
  }, [ text, users ]);
  
  const resetText = () => {
    setText(selectedUsers.join(','));
  };
  if (isLoading) {
    return <div><SpinIcon /></div>;
  }
  
  const onChangeSelectedUsers = (nicknames: string[]) => {
    const selectedUsers: UserSummaryListResponseDTO[] = nicknames.map(nickname => users[nickname]);
    if (maxUsersSelection > 0) {
      _onChangeSelectedUsers(selectedUsers.slice(-maxUsersSelection));
    } else {
      _onChangeSelectedUsers(selectedUsers);
    }
  };
  
  return (
    <div className="jk-row left gap nowrap extend">
      {show && (
        <Modal isOpen={true} onClose={() => setShow(false)}>
          <div className="jk-col stretch left gap jk-pg-md">
            <div className="jk-row left">
              <T className="tt-se">write the nicknames separated by commas</T>&nbsp;
              (<T>the nicknames are case sensitive</T>)
            </div>
            <TextArea
              value={text}
              onChange={setText}
            />
            <p className="cr-er">{error}</p>
            <div className="jk-row right gap">
              <Button
                type="light"
                onClick={() => setShow(false)}
              >
                <T>cancel</T>
              </Button>
              <Button
                disabled={!textNicknames.length}
                onClick={() => {
                  onChangeSelectedUsers(Array.from(new Set([ ...textNicknames ])));
                  setShow(false);
                }}
              >
                <T>add valid users</T>
              </Button>
            </div>
          </div>
        </Modal>
      )}
      <MultiSelectSearchable
        options={dataUsers.map(user => ({
          label: (
            <UserChip
              nickname={user.nickname}
              imageUrl={user.imageUrl}
              email={user.email}
              familyName={user.familyName}
              givenName={user.givenName}
              className="flex-1 jk-pg-sm-tb"
            />
          ),
          inputLabel: user.nickname,
          value: user.nickname,
        }))}
        selectedOptions={selectedUsers.map(user => ({ value: user }))}
        onChange={options => onChangeSelectedUsers(options.map(option => option.value))}
        optionsPlacement="bottom"
        extend
        rowHeightOption={72}
        onFilter={({ search, option }) => {
          const text = search.toLowerCase();
          const user = users[option.value];
          return (
            user.nickname.toLowerCase().indexOf(text) > -1 ||
            user.familyName.toLowerCase().indexOf(text) > -1 ||
            user.givenName.toLowerCase().indexOf(text) > -1 ||
            user.email.toLowerCase().indexOf(text) > -1
          );
        }}
        multiselect={maxUsersSelection !== 1}
      />
      <div
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="reload"
        data-tooltip-t-class-name="tt-se"
        className="jk-button light only-icon"
      >
        <ReloadIcon onClick={() => mutate()} />
      </div>
      {maxUsersSelection !== 1 && (
        <div
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="add users by nicknames in batches"
          data-tooltip-t-class-name="tt-se"
          className="jk-button light only-icon"
        >
          <PeopleIcon
            onClick={() => {
              resetText();
              setShow(true);
            }}
          />
        </div>
      )}
    </div>
  );
};
