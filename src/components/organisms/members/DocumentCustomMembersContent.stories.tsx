import { EMPTY_DOCUMENT_MEMBERS, EMPTY_ENTITY_MEMBERS } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { DocumentCustomMembersContent } from './DocumentCustomMembersContent';
import { DocumentMembersContent } from './DocumentMembersContent';

const meta: Meta<typeof DocumentCustomMembersContent> = {
  component: DocumentCustomMembersContent,
};

export default meta;

type Story = StoryObj<typeof DocumentCustomMembersContent>;

const Cmp = () => {
  const [ members, setMembers ] = useState(EMPTY_ENTITY_MEMBERS());
  const [ members2, setMembers2 ] = useState(EMPTY_DOCUMENT_MEMBERS());
  return (
    <div className="jk-col gap">
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
      <DocumentMembersContent
        members={members2}
        setMembers={setMembers2}
        documentOwner={{ nickname: 'OscarGauss', imageUrl: '', company: { key: 'juki-app' } }}
      />
    </div>
  );
};

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <Cmp />
    </MockupJukiProvider>
  ),
};
