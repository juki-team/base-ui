import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { CodeViewer as CodeViewerComponent, CodeViewerProps, ProgrammingLanguage } from '../../index';

export default {
  title: 'Components/Data Display',
  component: CodeViewerComponent,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<CodeViewerProps> = ({ language, ...args }) => {
  return (
    <div style={{ height: '500px' }}>
      <CodeViewerComponent
        language={ProgrammingLanguage.JAVASCRIPT}
        {...args}
      />
    </div>
  );
};

export const CodeViewer = Template.bind({});

CodeViewer.args = {
  code: 'console.info("Juki!")',
  withLanguageLabel: true,
  withCopyButton: true,
  lineNumbers: true,
};
