import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { Button, MdMathEditor as MdMathEditorComponent, MdMathEditorProps, SAMPLE_MD_CONTENT } from '../../../index';
import { MockupJukiProvider } from '../../../mockup/MockupJukiProvider';
import { MockupToggleThemeButton } from '../../../mockup/MockupToggleThemeButton';

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

export const MdMathEditor: Story<MdMathEditorProps> = (props) => {
  // const example = '# Titulo ```\n## [titulo 2](#titulo-2)\n#include <bits/stdc++.h>\n\nusing namespace std; \n\n|A | B| C|\n|--|--|--|\n|1|2|3|\n|4|5|6|';
  const example = SAMPLE_MD_CONTENT;
  const [ text, setText ] = useState(example);
  return (
    <MockupJukiProvider>
      <div>
        <MdMathEditorComponent
          {...props}
          source={text}
          onChange={(value) => setText(value)}
        />
        <p>{text}</p>
        <Button onClick={() => setText(example)}>clear</Button>
        <MockupToggleThemeButton />
      </div>
    </MockupJukiProvider>
  );
};
