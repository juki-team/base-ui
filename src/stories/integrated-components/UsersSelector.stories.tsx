import { UserSummaryResponseDTO } from '@juki-team/commons';
import React, { useState } from 'react';
import { UsersSelector as UsersSelectorComponent } from '../../integrated-components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
};

export const UsersSelector = () => {
  
  const [ users, setUsers ] = useState<UserSummaryResponseDTO[]>([]);
  
  return (
    <JukiProvider>
      <div className="jk-pad-lg">
        <UsersSelectorComponent
          selectedUsers={users.map(user => user.nickname)}
          onChangeSelectedUsers={(selectedUsers) => {
            setUsers(selectedUsers)
          }}
          companyKey="juki-judge-dev"
        />
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};
