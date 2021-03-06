import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import {
  CodeRunnerEditor,
  CodeRunnerEditorPropertiesType,
  CodeRunnerEditorProps,
  JukiBaseUiProvider,
  ProgrammingLanguage,
  SubmissionRunStatus,
} from '../../index';

export default {
  title: 'Components/Data Entry',
  component: CodeRunnerEditor,
  argTypes: {
    type: {
      control: {
        type: 'radio',
        options: ['default', 'primary', 'text', 'ghost'],
        disable: true,
      },
      disable: true,
    },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<CodeRunnerEditorProps> = (args) => {
  const [props, setProps] = useState<CodeRunnerEditorPropertiesType & { language: string, sourceCode: string }>({
    language: ProgrammingLanguage.JAVASCRIPT,
    sourceCode: 'console.info("Juki!")',
  });
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://utils-back-v1.juki.app"
      // utilsServiceUrl="http://prodv1utilsbackjukiappapp-env.eba-v2iz3isa.us-east-1.elasticbeanstalk.com"
      // utilsServiceUrl="http://localhost:3003"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
    >
      <div style={{ height: '500px' }}>
        <CodeRunnerEditor
          {...args}
          {...props}
          onChange={(props) => {
            setProps(prevState => ({ ...prevState, ...props }));
          }}
          middleButtons={({ widthContainer }) => <div>width:{widthContainer}</div>}
          expandPosition={{
            width: '800px',
            height: '800px',
            top: '50px',
            left: '50px',
          }}
        />
      </div>
    </JukiBaseUiProvider>
  );
};

export const CodeRunnerEditorNormal = Template.bind({});

CodeRunnerEditorNormal.args = {
  readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<CodeRunnerEditorProps, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};

export const CodeRunnerEditorWithIo = Template.bind({});

CodeRunnerEditorWithIo.args = {
  readOnly: false, // op
  testCases: {
    'test-empty': {
      key: 'test-empty',
      index: 0,
      in: '',
      out: '',
      err: '',
      log: '',
      sample: false,
      status: SubmissionRunStatus.NONE,
    },
  },
};
