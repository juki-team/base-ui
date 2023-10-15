import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { MdMathViewer, MdMathViewerProps, SAMPLE_MD_CONTENT } from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';
// import { JukiProvider } from '../JukiProvider';

export default {
  title: 'Components/Data Display',
  component: MdMathViewer,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const MdMathViewerComponent: Story<MdMathViewerProps> = (props) => {
  return (
    // <JukiProvider>
    <div>
      <MdMathViewer {...props} source={SAMPLE_MD_CONTENT} />
      <ToggleThemeButton />
    </div>
    // </JukiProvider>
  );
};

export const MdMathViewerClassic = MdMathViewerComponent.bind({});

MdMathViewerClassic.args = { sharedButton: true, downloadButton: true };
