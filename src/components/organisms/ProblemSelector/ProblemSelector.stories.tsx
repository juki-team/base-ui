import { action } from 'storybook/actions';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { ProblemSelector as ProblemSelectorComponent } from './ProblemSelector';

export default {
  component: ProblemSelectorComponent,
};

export const ProblemSelector = () => {
  return (
    <MockupJukiProvider>
      <div className="jk-pg-lg">
        <ProblemSelectorComponent onSelect={action('onSelect')} />
      </div>
    </MockupJukiProvider>
  );
};
