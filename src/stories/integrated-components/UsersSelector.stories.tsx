import { UserSummaryResponseDTO } from '@juki-team/commons';
import React, { useState } from 'react';
import { UsersSelector as UsersSelectorComponent } from '../../components';
import { MockupJukiProvider, MockupToggleThemeButton } from '../../components/mockup';

export default {
  title: 'Components/Integrated Components',
};

export const UsersSelector = () => {
  
  const [ users, setUsers ] = useState<UserSummaryResponseDTO[]>([]);
  
  return (
    <MockupJukiProvider>
      <div className="jk-pad-lg">
        <UsersSelectorComponent
          selectedUsers={users.map(user => user.nickname)}
          onChangeSelectedUsers={(selectedUsers) => {
            setUsers(selectedUsers)
          }}
          companyKey="juki-judge-dev"
        />
        <MockupToggleThemeButton />
      </div>
    </MockupJukiProvider>
  );
};
