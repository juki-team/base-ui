import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { CodeViewer, CodeViewerProps, JukiBaseUiProvider, ProgrammingLanguage } from '../index';

export default {
  title: 'Components/CodeViewer',
  component: CodeViewer,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<CodeViewerProps> = (args) => {
  const [props] = useState<CodeViewerProps>({
    code: 'console.log("Juki!")',
    language: ProgrammingLanguage.JAVASCRIPT,
    lineNumbers: true,
    // height
  });
  return (
    <JukiBaseUiProvider
      utilsServiceUrl="https://prod-v1-utils-back.juki.app"
      apiVersion="api/v1"
      utilsUiUrl="http://localhost:3001"
    >
      <div style={{ height: '500px' }}>
        <CodeViewer
          {...args}
          {...props}
        />
      </div>
    </JukiBaseUiProvider>
  );
};

export const CodeViewerNormal = Template.bind({});

CodeViewerNormal.args = {
  // readOnly: false, // op
  // languages?: ProgrammingLanguage[],
  // className?: string,
  // middleButtons?: (props: Omit<CodeViewerProps, 'onChange' | 'className' | 'middleButtons'>) => ReactNode,
};
