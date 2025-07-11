import { CodeLanguage } from '@juki-team/commons';
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider, MockupToggleThemeButton } from '../../mockup';
import { CodeViewer } from './CodeViewer';

const codeTemplate = `
#include <bits/stdc++.h>
using namespace std;

int main()
{
  
  int a,b,c=0,x=0,f=0;
  cin>>a;
  vector<int>d;
    for(int i=0;i<a;i++)
    {
        cin>>b;
        d.push_back(b);
    }
    c=d[0];
    for(int i=0;i<d.size();i++)
    {
        if(d[i]<c)
        {
            c=d[i];
            f=i;
            break;
        }
    }
    for(int i=f;i<d.size();i++)
    {
        if(d[i]>c && d[i]!=d[i-1])
        {
            x++;
        }
    }
    cout<<x;
  return 0;
`;

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
