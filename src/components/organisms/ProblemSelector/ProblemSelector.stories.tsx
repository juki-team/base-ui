import { action } from '@storybook/addon-actions';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';
import { ProblemSelector as ProblemSelectorComponent } from './index';

export default {
  component: ProblemSelectorComponent,
};

export const ProblemSelector = () => {
  return (
    <MockupJukiProvider>
      <div className="jk-pad-lg">
        <ProblemSelectorComponent onSelect={action('onSelect')} />
      </div>
    </MockupJukiProvider>
  );
};
