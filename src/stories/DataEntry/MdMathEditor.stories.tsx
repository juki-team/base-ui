import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

import { Button, MdMathEditor as MdMathEditorComponent, MdMathEditorProps, SAMPLE_MD_CONTENT } from '../../index';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

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
  // const example = '# Titulo ```\n## [titulo 2](#titulo-2)\n#include <bits/stdc++.h>\n\nusing namespace std; \n\n|A | B| C|\n|--|--|--|\n|1|2|3|\n|4|5|6|';
  const example = SAMPLE_MD_CONTENT;
  const [text, setText] = useState(example);
  return (
    <JukiProvider>
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
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};
