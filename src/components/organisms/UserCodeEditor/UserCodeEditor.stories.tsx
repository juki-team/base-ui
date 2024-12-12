import { ProgrammingLanguage } from '@juki-team/commons';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { UserCodeEditor as UserCodeEditorCmp } from './index';

export default {
  component: UserCodeEditorCmp,
};

export const UserCodeEditor = () => {
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px', padding: 20 }}>
        <UserCodeEditorCmp<ProgrammingLanguage>
          // languages={[{ value: "A", label: "A" }]}
          languages={[ { value: ProgrammingLanguage.CPP17, label: ProgrammingLanguage.CPP17 as string },
            { value: ProgrammingLanguage.JAVASCRIPT, label: ProgrammingLanguage.JAVASCRIPT as string } ]}
          sourceStoreKey={'testing'}
          enableAddCustomSampleCases
        />
      </div>
    </MockupJukiProvider>
  );
};
