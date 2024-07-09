import { Judge, UserStatus } from "@juki-team/commons";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MockupJukiProvider } from "../../mockup";
import { UserProfile } from "./UserProfile";

const meta: Meta<typeof UserProfile> = {
  component: UserProfile,
};

export default meta;

type Story = StoryObj<typeof UserProfile>;

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <UserProfile {...args} />
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {
  user: {
    companyKey: "juki-app",
    email: "me@oscargauss.com",
    familyName: "family name",
    givenName: "given name",
    imageUrl:
      "https://images.juki.pub/u/7e6d1385-9a31-4a97-9d25-abdd7fd4f773.png",
    nickname: "OscarGauss",
    status: UserStatus.ACTIVE,
    aboutMe: "about me",
    city: "La Paz",
    country: "Bolivia",
    institution: "UMSA",
    handles: {
      [Judge.CODEFORCES]: "OscarGauss",
    },
    canEditProfileData: true,
    canEditSettingsData: true,
    canEditPermissionsData: true,
    canUpdatePassword: true,
    canResetPassword: true,
  },
};
