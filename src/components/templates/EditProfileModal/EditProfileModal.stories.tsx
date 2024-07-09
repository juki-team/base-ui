import { UserStatus } from "@juki-team/commons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";
import { EditProfileModal } from "./EditProfileModal";

const meta: Meta<typeof EditProfileModal> = {
  component: EditProfileModal,
};

export default meta;

type Story = StoryObj<typeof EditProfileModal>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <EditProfileModal {...args} isOpen={true} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  user: {
    companyKey: "",
    aboutMe: "",
    canEditPermissionsData: false,
    canEditProfileData: false,
    canEditSettingsData: false,
    canResetPassword: false,
    canUpdatePassword: false,
    city: "",
    country: "",
    email: "",
    familyName: "",
    givenName: "",
    handles: {},
    imageUrl: "",
    institution: "",
    nickname: "OscarGauss",
    status: UserStatus.ACTIVE,
  },
};
