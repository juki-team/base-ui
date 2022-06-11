import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { SAMPLE_MD_CONTENT } from '../constants';
import { JukiBaseUiProvider, MdMathViewer, MdMathViewerProps } from '../index';
import { COMPONENTS_WRITING_TOOLS } from './constants';

export default {
  title: COMPONENTS_WRITING_TOOLS,
  component: MdMathViewer,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const MdMathViewerComponent: Story<MdMathViewerProps> = (props) => {
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://utils-back-v1.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="https://utils.juki.app"
    >
      <div>
        <MdMathViewer {...props} source={SAMPLE_MD_CONTENT} />
      </div>
    </JukiBaseUiProvider>
  );
};

export const MdMathViewerClassic = MdMathViewerComponent.bind({});

MdMathViewerClassic.args = { sharedButton: true, downloadButton: true };
