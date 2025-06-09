import { type Meta, type StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from './constants';
import { MdMathEditor as MdMathEditorComponent } from './MdMathEditor';
import { MdMathEditorProps } from './types';

const meta: Meta<typeof MdMathEditorComponent> = {
  component: MdMathEditorComponent,
  argTypes: {
    uploadImageButton: { control: { type: 'boolean' } },
    informationButton: { control: { type: 'boolean' } },
    // sharedButton: { control: { type: "boolean" } },
    downloadButton: { control: { type: 'boolean' } },
  },
};

export default meta;

type Story = StoryObj<typeof MdMathEditorComponent>;

const Cmp = ({ props }: { props: MdMathEditorProps }) => {
  const [ text, setText ] = useState(SAMPLE_MD_CONTENT);
  return (
    <MockupJukiProvider>
      <div style={{ height: '100%', overflow: 'auto' }} className="jk-pg">
        <MdMathEditorComponent
          {...props}
          source={text}
          onChange={(value) => setText(value)}
        />
        <p>{text}</p>
        <Button onClick={() => setText(SAMPLE_MD_CONTENT)}>clear</Button>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => (
    <Cmp props={args} />
  ),
};
