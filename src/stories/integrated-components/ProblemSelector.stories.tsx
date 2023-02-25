import React from 'react';
import { ProblemSelector as ProblemSelectorComponent } from '../../integrated-components';
import { JukiProvider } from '../JukiProvider';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/Integrated Components',
  // component: SignUpModal,
  component: ProblemSelectorComponent,
  argTypes: {
    highlightForgotPassword: { control: { type: 'boolean' } },
  },
};

export const ProblemSelector = () => {
  return (
    <JukiProvider>
      <div>
        holi
        <ToggleThemeButton />
      </div>
    </JukiProvider>
  );
};
