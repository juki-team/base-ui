import { CodeLanguage, SubmissionRunStatus } from '@juki-team/commons';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { CodeRunnerEditor } from './CodeRunnerEditor';
import { CodeRunnerEditorPropertiesType, CodeRunnerEditorProps } from './types';

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

const sourceCode = `#include <bits/stdc++.h>

using namespace std;

int main() {
    int n, a, b;
    cin >> n;
    int m = n;
    if (n == 3) {
        m = 10000000;
    }
    int sum = 0;
    for (int i = 0; i < m; i++) {
        cin >> a;
        sum += a;
    }
    cout << sum << "\\n";
    return 0;
}`;

const Template = (args: CodeRunnerEditorProps<string>) => {
  const [ props, setProps ] = useState<
    CodeRunnerEditorPropertiesType<CodeLanguage> & {
    language: string;
    sourceCode: string;
  }
  >({
    language: CodeLanguage.JAVASCRIPT,
    sourceCode: sourceCode,
  });
  
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px', padding: 20 }}>
        <CodeRunnerEditor
          {...args}
          {...props}
          onChange={(props: any) => {
            setProps((prevState) => ({ ...prevState, ...props }));
          }}
          centerButtons={({ widthContainer }) => (
            <div>width:{widthContainer}</div>
          )}
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
  render: (args) => <Template {...args} />,
};

CodeRunnerEditorNormal.args = {
  readOnly: false, // op
  // languages?: CodeLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<CodeRunnerEditorProps, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};

export const CodeRunnerEditorWithIo: Story = {
  render: (args) => <Template {...args} />,
};

CodeRunnerEditorWithIo.args = {
  readOnly: false, // op
  // enableAddSampleCases: true,
  enableAddCustomSampleCases: true,
  testCases: {
    'test-empty-with-PE': {
      key: 'test-empty-with-PE',
      index: 0,
      in: '2\n1 5',
      out: '',
      testOut: '6\n',
      withPE: true,
      err: '',
      log: '',
      sample: true,
      hidden: false,
      status: SubmissionRunStatus.NONE,
      messageTimestamp: 0,
    },
    'test-empty-without-PE': {
      key: 'test-empty-without-PE',
      index: 1,
      in: '2\n1 5',
      out: '',
      testOut: '6',
      withPE: false,
      err: '',
      log: '',
      sample: true,
      hidden: false,
      status: SubmissionRunStatus.NONE,
      messageTimestamp: 0,
    },
    'test-empty': {
      key: 'test-empty',
      index: 2,
      in: '3\n1 2 -9 9 -19 8',
      out: '',
      testOut: '3\n0\n-11\n',
      withPE: true,
      err: '',
      log: '',
      sample: true,
      hidden: false,
      status: SubmissionRunStatus.NONE,
      messageTimestamp: 0,
    },
    'test-empty-1': {
      key: 'test-empty-1',
      index: 3,
      in: '5\n1 2\n-9 9\n-19 8\n0 0\n1 1',
      out: '',
      testOut: '3\n0\n-11\n0\n2\n',
      withPE: true,
      err: '',
      log: '',
      sample: true,
      hidden: false,
      status: SubmissionRunStatus.NONE,
      messageTimestamp: 0,
    },
  },
};

export const CodeRunnerEditorWithCustomLanguages: Story = {
  render: (args) => <Template {...args} />,
};

CodeRunnerEditorWithCustomLanguages.args = {
  readOnly: false, // op
  enableAddCustomSampleCases: true,
  enableAddSampleCases: true,
  testCases: {
    'test-empty': {
      key: 'test-empty',
      index: 0,
      in: '4\n2\n24242\n',
      out: '5\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 1',
      testOut:
        '5\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 15\n1 2\n-9 9\n-19 8\n0 0\n1 1',
      withPE: true,
      err: `int main() {
    int n, a, b;
    cin >> n;
    int m = n;
    if (n == 3) {
        m = 10000000;
    }
    for (int i = 0; i < m; i++) {
        cin >> a >> b;
        cout << a + b << "\\n";
    }`,
      log: '',
      sample: true,
      hidden: false,
      status: SubmissionRunStatus.NONE,
      messageTimestamp: 0,
    },
  },
  languages: [
    { value: '43', label: 'GNU GCC C11 5.1.0' },
    { value: '65', label: 'C# 8, .NET Core 3.1' },
  ],
};
