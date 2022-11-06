import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { SAMPLE_MD_CONTENT } from '../../constants';
import { MdMathViewer, MdMathViewerProps } from '../../index';
import { JukiProvider } from '../JukiProvider';

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
    <JukiProvider>
      <div>
        <MdMathViewer {...props} source={SAMPLE_MD_CONTENT} />
      </div>
    </JukiProvider>
  );
};

export const MdMathViewerClassic = MdMathViewerComponent.bind({});

MdMathViewerClassic.args = { sharedButton: true, downloadButton: true };
