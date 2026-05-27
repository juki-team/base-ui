import type { UserSummaryListResponseDTO } from '@juki-team/commons/dto';
import { getUserKey } from '@juki-team/commons/helpers';
import { useState } from 'react';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { UsersSelector as UsersSelectorComponent } from './UsersSelector';

export default {
  component: UsersSelectorComponent,
};

export const UsersSelector = () => {
  const [users, setUsers] = useState<UserSummaryListResponseDTO[]>([]);

  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg">
        <UsersSelectorComponent
          selectedUsers={users.map((user) => getUserKey(user.nickname, user.organization.key))}
          onChangeSelectedUsers={(selectedUsers) => {
            setUsers(selectedUsers);
          }}
          // organizationKey="juki-judge-dev"
          organizationKey="juki-app"
        />
      </div>
    </MockupJukiProvider>
  );
};

// UsersSelector.parameters = {
//   msw: {
//     handlers: [],
//   },
// };
