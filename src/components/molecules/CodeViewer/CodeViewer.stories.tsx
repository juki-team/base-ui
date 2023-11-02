import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
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
  },
};

export default meta;

type Story = StoryObj<typeof CodeViewer>;

export const Regular: Story = {
  render: ({ code = codeTemplate, ...args }) => <CodeViewer code={code} {...args} />,
};
