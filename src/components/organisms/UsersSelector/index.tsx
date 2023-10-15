import { ContentsResponseType, UserSummaryResponseDTO } from '@juki-team/commons';
import React, { useEffect, useMemo, useState } from 'react';
import { UserChip } from '../UserChip';
import { settings } from '../../../config';
import { useFetcher } from '../../../hooks';
import {
  Button,
  LoadingIcon,
  Modal,
  MultiSelectSearchable,
  PeopleIcon,
  Popover,
  ReloadIcon,
  T,
  TextArea,
} from '../../index';

export interface UsersSelectorProps {
  selectedUsers: string[],
  onChangeSelectedUsers: (selectedUsers: UserSummaryResponseDTO[]) => void,
  maxUsersSelection?: number,
  companyKey: string,
}

export const UsersSelector = (props: UsersSelectorProps) => {
  
  const {
    selectedUsers,
    onChangeSelectedUsers: _onChangeSelectedUsers,
    maxUsersSelection = -1,
    companyKey,
  } = props;
  const { isLoading, data, mutate } = useFetcher<ContentsResponseType<UserSummaryResponseDTO>>(
    settings.getAPI().user.summaryList({ params: { companyKey } }).url,
  );
  const [ show, setShow ] = useState(false);
  const [ text, setText ] = useState('');
  const [ textNicknames, setTextNicknames ] = useState<string[]>([]);
  const [ error, setError ] = useState('');
  const users: { [key: string]: UserSummaryResponseDTO } = useMemo(() => {
    const users = {};
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
  }
  if (isLoading) {
    return <div><LoadingIcon /></div>;
  }
  
  const onChangeSelectedUsers = (nicknames: string[]) => {
    const selectedUsers: UserSummaryResponseDTO[] = nicknames.map(nickname => users[nickname]);
    if (maxUsersSelection > 0) {
      _onChangeSelectedUsers(selectedUsers.slice(-maxUsersSelection));
    } else {
      _onChangeSelectedUsers(selectedUsers);
    }
  };
  
  return (
    <div className="jk-row left stretch gap nowrap extend">
      {show && (
        <Modal isOpen={true} onClose={() => setShow(false)}>
          <div className="jk-col stretch left gap jk-pad-md">
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
                type="text"
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
              className="flex-1"
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
      <Popover
        content={<T>reload</T>}
        placement="left"
      >
        <div className="jk-row">
          <ReloadIcon
            className="clickable jk-br-ie"
            onClick={() => mutate()}
          />
        </div>
      </Popover>
      <Popover
        content={<T>add users by nicknames in batches</T>}
        placement="left"
      >
        <div className="jk-row">
          <PeopleIcon
            className="clickable jk-br-ie"
            onClick={() => {
              resetText();
              setShow(true);
            }}
          />
        </div>
      </Popover>
    </div>
  );
};