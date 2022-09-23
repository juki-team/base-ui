import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Button, JukiBaseUiProvider, MdMathEditor as MdMathEditorComponent, MdMathEditorProps } from '../../index';

export default {
  title: 'Components/Data Entry',
  component: MdMathEditorComponent,
  argTypes: {
    uploadImageButton: { control: { type: 'boolean' } },
    informationButton: { control: { type: 'boolean' } },
    sharedButton: { control: { type: 'boolean' } },
    downloadButton: { control: { type: 'boolean' } },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const MdMathEditor: Story<MdMathEditorProps> = ({
  uploadImageButton,
  informationButton,
  sharedButton,
  downloadButton,
}) => {
  const example = '# Titulo ```\n#include <bits/stdc++.h>\n\nusing namespace std;';
  const [text, setText] = useState(example);
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://utils-back-v1.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
      tokenName="juki-token"
    >
      <div>
        <MdMathEditorComponent
          source={text}
          onChange={(value) => setText(value)}
          uploadImageButton={uploadImageButton}
          informationButton={informationButton}
          sharedButton={sharedButton}
          downloadButton={downloadButton}
        />
        <p>{text}</p>
        <Button onClick={() => setText(example)}>clear</Button>
      </div>
    </JukiBaseUiProvider>
  );
};
