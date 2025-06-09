import { ContentsResponseType, getUserKey, UserSummaryListResponseDTO } from '@juki-team/commons';
import React, { useEffect, useMemo, useState } from 'react';
import { useFetcher } from '../../../hooks/useFetcher';
import { jukiApiSocketManager } from '../../../settings';
import { Button, Modal, T, TextArea } from '../../atoms';
import { MultiSelectSearchable } from '../../molecules';
import { GroupsIcon, RefreshIcon, SpinIcon } from '../../server';
import { UserChip } from '../UserChip/UserChip';
import { UsersSelectorProps } from './types';

export const UsersSelector = (props: UsersSelectorProps) => {
  
  const {
    selectedUsers,
    onChangeSelectedUsers: _onChangeSelectedUsers,
    maxUsersSelection = -1,
    companyKey,
  } = props;
  
  const { isLoading, data, mutate } = useFetcher<ContentsResponseType<UserSummaryListResponseDTO>>(
    jukiApiSocketManager.API_V1.user.getSummaryList({ params: { companyKey } }).url,
  );
  const [ show, setShow ] = useState(false);
  const [ text, setText ] = useState('');
  const [ textNicknames, setTextNicknames ] = useState<string[]>([]);
  const [ error, setError ] = useState('');
  const users = useMemo(() => {
    const users: { [key: string]: UserSummaryListResponseDTO } = {};
    const dataUsers = (data?.success ? data?.contents : []);
    dataUsers.forEach(user => {
      users[getUserKey(user.nickname, user.company.key)] = user;
    });
    return users;
  }, [ data ]);
  const dataUsers = Object.values(users);
  useEffect(() => {
    const nicknames = text.split(',').map(text => text.trim()).filter(text => !!text);
    let error = '';
    const validNicknames: string[] = [];
    nicknames.forEach(nickname => {
      const userKey = getUserKey(nickname, companyKey);
      if (users[userKey]) {
        validNicknames.push(userKey);
      } else {
        error += `${error ? ', ' : ''}"${nickname}" unknown nickname`;
      }
    });
    setError(error);
    setTextNicknames(validNicknames);
  }, [ companyKey, text, users ]);
  
  const resetText = () => {
    setText(selectedUsers.join(','));
  };
  if (isLoading) {
    return <div><SpinIcon /></div>;
  }
  
  const onChangeSelectedUsers = (userKeys: string[]) => {
    const selectedUsers: UserSummaryListResponseDTO[] = userKeys.map(userKey => users[userKey]);
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
              companyKey={companyKey}
              imageUrl={user.imageUrl}
              email={user.email}
              familyName={user.familyName}
              givenName={user.givenName}
              className="flex-1 jk-pg-xsm-tb"
            />
          ),
          inputLabel: user.nickname,
          value: getUserKey(user.nickname, user.company.key),
        }))}
        selectedOptions={selectedUsers.map(user => ({ value: user }))}
        onChange={options => onChangeSelectedUsers(options.map(option => option.value))}
        optionsPlacement="bottom"
        expand
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
        <RefreshIcon onClick={() => mutate()} />
      </div>
      {maxUsersSelection !== 1 && (
        <div
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="add users by nicknames in batches"
          data-tooltip-t-class-name="tt-se"
          className="jk-button light only-icon"
        >
          <GroupsIcon
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
