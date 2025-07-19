import { EMPTY_DOCUMENT_MEMBERS, EMPTY_ENTITY_MEMBERS } from '@juki-team/commons';
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
  const [ members2, setMembers2 ] = useState(EMPTY_DOCUMENT_MEMBERS());
  const dummyOwner = { nickname: 'OscarGauss', imageUrl: '', company: { key: 'juki-app' } };
  console.info({ args });
  return (
    <div className="jk-col gap">
      <DocumentMembersButton
        documentName="testing"
        documentMembers={members2}
        documentOwner={dummyOwner}
        saveUrl=""
        copyLink={() => 'asf'}
      />
      <DocumentCustomMembersContent
        members={members}
        setMembers={setMembers}
        documentOwner={{ nickname: 'OscarGauss', imageUrl: '', company: { key: 'juki-app' } }}
        administrators={{}}
        managers={{}}
        participants={{ closeable: true }}
        guests={{ closeable: true }}
        spectators={{}}
      />
      <DocumentMembersButton
        documentName="testing"
        documentMembers={members2}
        documentOwner={{ ...dummyOwner, nickname: '' }}
        saveUrl=""
        copyLink={() => 'asf'}
      />
      <DocumentMembersContent
        members={members2}
        setMembers={setMembers2}
        documentOwner={dummyOwner}
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
