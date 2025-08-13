import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from './constants';
import { MdMathEditor } from './MdMathEditor';
import { MdMathViewer } from './MdMathViewer';
import { MdMathEditorProps } from './types';
import { MemoMdMathViewer } from './viewer/MemoMdMathViewer';

const meta: Meta<typeof MdMathEditor> = {
  component: MdMathEditor,
};

export default meta;

type Story = StoryObj<typeof MdMathEditor>;

console.info({ MemoMdMathViewer });

const Cmp = (props: MdMathEditorProps) => {
  
  const [ md, setMd ] = useState(SAMPLE_MD_CONTENT);
  return (
    <MockupJukiProvider>
      <div style={{ padding: '50px' }} className="jk-row gap nowrap top wh-100 ht-100">
        <div style={{ width: '45%', border: '1pxsolid red' }}>
          <MdMathEditor {...props} value={md} onChange={setMd} />
        </div>
        <MdMathViewer source={md} style={{ width: '45%', border: '1pxsolid red' }} />
        {/*<MdMathEditor initialMd={md} className="ow-ao flex-2" />*/}
        <div style={{ flex: 1 }}>
          <pre>
            <code>
              {md}
            </code>
          </pre>
        </div>
      </div>
    </MockupJukiProvider>
  );
};

export const Regular: Story = {
  render: (args) => (
    <Cmp {...args} />
  ),
};

Regular.args = {
  // sharedButton: true,
  // downloadButton: true,
};
