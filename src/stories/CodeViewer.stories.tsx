import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { CodeViewer, CodeViewerProps, JukiBaseUiProvider, ProgrammingLanguage } from '../index';
import { COMPONENTS_WRITING_TOOLS } from './constants';

export default {
  title: COMPONENTS_WRITING_TOOLS,
  component: CodeViewer,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<CodeViewerProps> = ({ language, ...args }) => {
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://prod-v1-utils-back.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
    >
      <div style={{ height: '500px' }}>
        <CodeViewer
          language={ProgrammingLanguage.JAVASCRIPT}
          {...args}
        />
      </div>
    </JukiBaseUiProvider>
  );
};

export const CodeViewerNormal = Template.bind({});

CodeViewerNormal.args = {
  code: 'console.info("Juki!")',
  withLanguageLabel: true,
  withCopyButton: true,
  lineNumbers: true,
};
