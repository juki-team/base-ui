import { EMPTY_ENTITY_MEMBERS, getDocumentAccess } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { DocumentCustomMembersContent } from './DocumentCustomMembersContent';
import { DocumentMembersButton } from './DocumentMembersButton';
import { DocumentMembersContent } from './DocumentMembersContent';
import { DocumentCustomMembersContentProps } from './types';

const meta: Meta<typeof DocumentCustomMembersContent> = {
  component: DocumentCustomMembersContent,
};

export default meta;

type Story = StoryObj<typeof DocumentCustomMembersContent>;

const Cmp = (args: DocumentCustomMembersContentProps) => {
  const [ members, setMembers ] = useState(EMPTY_ENTITY_MEMBERS());
  const dummyOwner = { nickname: 'OscarGauss', imageUrl: '', company: { key: 'juki-app' } };
  const documentAccess = getDocumentAccess({ members });
  console.info({ args, members, documentAccess });
  return (
    <div className="jk-col gap">
      <DocumentMembersButton
        isAdministrator
        documentName="testing"
        members={members}
        documentOwner={dummyOwner}
        saveUrl=""
        copyLink={() => 'asf'}
      />
      {/*<DocumentCustomMembersContent*/}
      {/*  members={members}*/}
      {/*  setMembers={setMembers}*/}
      {/*  documentOwner={{ nickname: 'OscarGauss', imageUrl: '', company: { key: 'juki-app' } }}*/}
      {/*  administrators={{}}*/}
      {/*  managers={{}}*/}
      {/*  participants={{ closeable: true }}*/}
      {/*  guests={{ closeable: true }}*/}
      {/*  spectators={{}}*/}
      {/*/>*/}
      <DocumentMembersButton
        isAdministrator={false}
        documentName="testing"
        members={members}
        documentOwner={{ ...dummyOwner, nickname: '' }}
        saveUrl=""
        copyLink={() => 'asf'}
      />
      <DocumentMembersContent
        members={members}
        setMembers={setMembers}
        documentOwner={dummyOwner}
        administrators={{}}
        managers={{}}
        guests={{ closeable: true }}
        spectators={{}}
        participants={{ closeable: true }}
      />
    </div>
  );
};

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <Cmp  {...args} />
    </MockupJukiProvider>
  ),
};
