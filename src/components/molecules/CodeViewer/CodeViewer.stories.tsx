import { CodeLanguage } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider, MockupToggleThemeButton } from '../../mockup';
import { CodeViewer } from './CodeViewer';

const codeTemplate = `
#include <bits/stdc++.h>

using namespace std;

int main() {
  
  int l,r;
  cin >> l >> r;
  
  cout << (l == 1 ? 1 : 0) << "\\\\n";
  return 0;
}`;

const meta: Meta<typeof CodeViewer> = {
  component: CodeViewer,
  args: {
    code: codeTemplate,
    language: CodeLanguage.CPP,
  },
  argTypes: {
    language: {
      options: Object.values(CodeLanguage),   // convierte el enum en array de valores
      control: { type: 'select' },
    },
    code: {
      control: { type: 'text' },
    },
  },
};

export default meta;

type Story = StoryObj<typeof CodeViewer>;

export const Regular: Story = {
  render: ({ code = codeTemplate, ...args }) => (
    <MockupJukiProvider>
      <div className="jk-pg">
        <CodeViewer code={code} {...args} />
      </div>
      <MockupToggleThemeButton />
    </MockupJukiProvider>
  ),
};
