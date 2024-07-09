import { UserSummaryResponseDTO } from "@juki-team/commons";
import React, { useState } from "react";
import { UsersSelector as UsersSelectorComponent } from "../../index";
import { MockupJukiProvider } from "../../mockup";

export default {
  component: UsersSelectorComponent,
};

export const UsersSelector = () => {
  const [users, setUsers] = useState<UserSummaryResponseDTO[]>([]);

  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg">
        <UsersSelectorComponent
          selectedUsers={users.map((user) => user.nickname)}
          onChangeSelectedUsers={(selectedUsers) => {
            setUsers(selectedUsers);
          }}
          companyKey="juki-judge-dev"
        />
      </div>
    </MockupJukiProvider>
  );
};
