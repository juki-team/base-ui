import { ProgrammingLanguage, SubmissionRunStatus } from '@juki-team/commons';
import { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { CodeRunnerEditor, CodeRunnerEditorPropertiesType, CodeRunnerEditorProps } from '../../../index';
import { MockupJukiProvider } from '../../mockup';

const meta: Meta<typeof CodeRunnerEditor> = {
  component: CodeRunnerEditor,
  argTypes: {
    // type: {
    //   control: {
    //     type: 'radio',
    //     options: [ 'default', 'primary', 'text', 'ghost' ],
    //     disable: true,
    //   },
    //   disable: true,
    // },
  },
};

const Template = (args: CodeRunnerEditorProps<string>) => {
  
  const [ props, setProps ] = useState<CodeRunnerEditorPropertiesType<ProgrammingLanguage> & {
    language: string,
    sourceCode: string
  }>({
    language: ProgrammingLanguage.JAVASCRIPT,
    sourceCode: 'console.info("Juki!")',
  });
  
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px' }}>
        <CodeRunnerEditor
          {...args}
          {...props}
          onChange={(props: any) => {
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
    </MockupJukiProvider>
  );
};

export default meta;

type Story = StoryObj<typeof CodeRunnerEditor<string>>;

export const CodeRunnerEditorNormal: Story = {
  render: (args) => (
    <Template {...args} />
  ),
};

CodeRunnerEditorNormal.args = {
  readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<CodeRunnerEditorProps, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};

export const CodeRunnerEditorWithIo: Story = {
  render: (args) => (
    <Template {...args} />
  ),
};

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

export const CodeRunnerEditorWithCustomLanguages: Story = {
  render: (args) => (
    <Template {...args} />
  ),
};

CodeRunnerEditorWithCustomLanguages.args = {
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
  languages: [
    { value: '43', label: 'GNU GCC C11 5.1.0' },
    { value: '65', label: 'C# 8, .NET Core 3.1' },
  ],
};
