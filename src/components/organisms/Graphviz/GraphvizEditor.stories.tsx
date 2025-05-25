import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { GraphvizEditor } from './GraphvizEditor';
import { GraphvizEditorProps } from './types';

const meta: Meta<typeof GraphvizEditor> = {
  component: GraphvizEditor,
};

export default meta;

type Story = StoryObj<typeof GraphvizEditor>;

const Cmp = (props: GraphvizEditorProps) => {
  const [ value, setValue ] = useState(`digraph {
    rankdir=LR
    a -> b
    b -> c
    b -> d*&()
    c -> e
    d -> e
    e -> a
}`);
  
  return (
    <div className="jk-col gap">
      <GraphvizEditor value={value} onSave={setValue} />
    </div>
  );
};

export const Regular: Story = {
  render: (args) => (
    <MockupJukiProvider>
      <Cmp {...args} />
    </MockupJukiProvider>
  ),
};
