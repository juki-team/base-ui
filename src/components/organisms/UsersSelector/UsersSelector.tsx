import type { UserSummaryListResponseDTO } from '@juki-team/commons/dto';
import { getUserKey } from '@juki-team/commons/helpers';
import type { ContentsResponse } from '@juki-team/commons/types';
import { useEffect, useMemo, useState } from 'react';
import { jukiApiManager } from '../../../settings';
import { Button } from '../../atoms/Button/Button';
import { Modal } from '../../atoms/Modal/Modal';
import { T } from '../../atoms/T/T';
import { TextArea } from '../../atoms/TextArea/TextArea';
import { useFetcher } from '../../hooks/useFetcher';
import { MultiSelectSearchable } from '../../molecules/MultiSelectSearchable/MultiSelectSearchable';
import { GroupsIcon, RefreshIcon, SpinIcon } from '../../server';
import { UserChip } from '../UserChip/UserChip';
import type { UsersSelectorProps } from './types';

export function UsersSelector(props: UsersSelectorProps) {
  const { selectedUsers, onChangeSelectedUsers: _onChangeSelectedUsers, maxUsersSelection = -1, organizationKey } = props;

  const { isLoading, data, mutate } = useFetcher<ContentsResponse<UserSummaryListResponseDTO>>(
    jukiApiManager.apiV2.user.getSummaryList({ params: { organizationKey: organizationKey } }).url,
  );
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [textNicknames, setTextNicknames] = useState<string[]>([]);
  const [error, setError] = useState('');
  const users = useMemo(() => {
    const users: { [key: string]: UserSummaryListResponseDTO } = {};
    const dataUsers = data?.success ? data?.contents : [];
    for (const user of dataUsers) {
      users[getUserKey(user.nickname, user.organization.key)] = user;
    }
    return users;
  }, [data]);
  const dataUsers = Object.values(users);
  useEffect(() => {
    const nicknames = text
      .split(',')
      .map((text) => text.trim())
      .filter(Boolean);
    let error = '';
    const validNicknames: string[] = [];
    for (const nickname of nicknames) {
      const userKey = getUserKey(nickname, organizationKey);
      if (users[userKey]) {
        validNicknames.push(userKey);
      } else {
        error += `${error ? ', ' : ''}"${nickname}" unknown nickname`;
      }
    }
    setError(error);
    setTextNicknames(validNicknames);
  }, [organizationKey, text, users]);

  const resetText = () => {
    setText(selectedUsers.join(','));
  };
  if (isLoading) {
    return (
      <div>
        <SpinIcon />
      </div>
    );
  }

  const onChangeSelectedUsers = (userKeys: string[]) => {
    const selectedUsers = userKeys.map((userKey) => users[userKey]).filter(Boolean) as UserSummaryListResponseDTO[];
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
              <T className="tt-se">write the nicknames separated by commas</T>&nbsp; (<T>the nicknames are case sensitive</T>)
            </div>
            <TextArea value={text} onChange={setText} />
            <p className="cr-er">{error}</p>
            <div className="jk-row right gap">
              <Button type="secondary" onClick={() => setShow(false)}>
                <T>cancel</T>
              </Button>
              <Button
                disabled={!textNicknames.length}
                onClick={() => {
                  onChangeSelectedUsers(Array.from(new Set([...textNicknames])));
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
        options={dataUsers.map((user) => ({
          label: (
            <UserChip
              nickname={user.nickname}
              organizationKey={user.organization.key}
              imageUrl={user.imageUrl}
              email={user.email}
              familyName={user.familyName}
              givenName={user.givenName}
              className="flex-1 jk-pg-xsm-tb"
            />
          ),
          inputLabel: user.nickname,
          value: getUserKey(user.nickname, user.organization.key),
        }))}
        selectedOptions={selectedUsers.map((user) => ({ value: user }))}
        onChange={(options) => onChangeSelectedUsers(options.map((option) => option.value))}
        optionsPlacement="bottom"
        expand
        rowHeightOption={72}
        onFilter={({ search, option }) => {
          const text = search.toLowerCase();
          const user = users[option.value];
          return (
            !!user &&
            (user.nickname.toLowerCase().indexOf(text) > -1 ||
              user.familyName.toLowerCase().indexOf(text) > -1 ||
              user.givenName.toLowerCase().indexOf(text) > -1 ||
              user.email.toLowerCase().indexOf(text) > -1)
          );
        }}
        multiselect={maxUsersSelection !== 1}
      />
      <Button
        icon={<RefreshIcon />}
        data-tooltip-id="jk-tooltip"
        data-tooltip-content="reload"
        type="secondary"
        size="small"
        onClick={() => mutate()}
      />
      {maxUsersSelection !== 1 && (
        <Button
          icon={<GroupsIcon />}
          data-tooltip-id="jk-tooltip"
          data-tooltip-content="add users by nicknames in batches"
          type="secondary"
          size="small"
          onClick={() => {
            resetText();
            setShow(true);
          }}
        />
      )}
    </div>
  );
}
