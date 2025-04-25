import { getUserKey, UserSummaryListResponseDTO } from '@juki-team/commons';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { UsersSelector as UsersSelectorComponent } from './UsersSelector';

export default {
  component: UsersSelectorComponent,
};

export const UsersSelector = () => {
  const [ users, setUsers ] = useState<UserSummaryListResponseDTO[]>([]);
  
  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg">
        <UsersSelectorComponent
          selectedUsers={users.map((user) => getUserKey(user.nickname, user.company.key))}
          onChangeSelectedUsers={(selectedUsers) => {
            setUsers(selectedUsers);
          }}
          companyKey="juki-judge-dev"
        />
      </div>
    </MockupJukiProvider>
  );
};
