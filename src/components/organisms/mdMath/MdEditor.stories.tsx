import { Meta, StoryObj } from '@storybook/react-webpack5';
import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { SAMPLE_MD_CONTENT } from './constants';
import { MdMathEditor } from './MdMathEditor';
import { MemoMdMathViewer } from './viewer/MemoMdMathViewer';

const meta: Meta<typeof MdMathEditor> = {
  component: MdMathEditor,
};

export default meta;

type Story = StoryObj<typeof MdMathEditor>;

console.info({ MemoMdMathViewer });

const Cmp = (props: any) => {
  
  const [ md, setMd ] = useState(SAMPLE_MD_CONTENT);
  
  return (
    <MockupJukiProvider>
      <div style={{ padding: '50px' }} className="jk-row gap nowrap wh-100 ht-100">
        <MdMathEditor initialMd={SAMPLE_MD_CONTENT} onChange={setMd} className="ow-ao flex-2" />
        {/*<MemoMdMathViewer source={md} style={{ flex: 1, overflow: 'auto' }} />*/}
        {/*<MdMathEditor initialMd={md} className="ow-ao flex-2" />*/}
        <div style={{ flex: 1, overflow: 'auto' }}>
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
