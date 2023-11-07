import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button } from '../../../atoms';
import { MockupJukiProvider } from '../../../mockup';
import { SAMPLE_MD_CONTENT } from '../constants';
import { MdMathEditor as MdMathEditorComponent, MdMathEditorProps } from './';

export default {
  component: MdMathEditorComponent,
  argTypes: {
    uploadImageButton: { control: { type: 'boolean' } },
    informationButton: { control: { type: 'boolean' } },
    sharedButton: { control: { type: 'boolean' } },
    downloadButton: { control: { type: 'boolean' } },
  },
};

export const MdMathEditor: Story<MdMathEditorProps> = (props) => {
  
  const [ text, setText ] = useState(SAMPLE_MD_CONTENT);
  
  return (
    <MockupJukiProvider>
      <div>
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
