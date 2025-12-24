import type { Meta, StoryObj } from '@storybook/react-vite';
import { QueryParamKey } from '../../../enums';
import { useRouterStore } from '../../../stores/router/useRouterStore';
import { Button } from '../../atoms';
import { MockupJukiProvider } from '../../mockup';
import { SubmissionModal } from './SubmissionModal/SubmissionModal';

const meta: Meta<typeof SubmissionModal> = {
  component: SubmissionModal,
};

export default meta;

type Story = StoryObj<typeof SubmissionModal>;

const SubmitButton = () => {
  const setSearchParams = useRouterStore(store => store.setSearchParams);
  return (
    <>
      <Button onClick={() => setSearchParams({ name: QueryParamKey.SUBMISSION, value: '67572ac37b782807461b1c1b' })}>
        view Submission
      </Button>
      <Button onClick={() => setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' })}>
        login
      </Button>
      <Button onClick={() => setSearchParams({ name: QueryParamKey.SIGN_UP, value: '1' })}>
        signup
      </Button>
      <Button onClick={() => setSearchParams({ name: QueryParamKey.WELCOME, value: '1' })}>
        welcome
      </Button>
      <Button
        onClick={() => setSearchParams({
          name: QueryParamKey.USER_PREVIEW,
          value: [ 'OscarGauss', 'juki-app' ],
        })}
      >
        user preview
      </Button>
      {/*<SubmissionContentModal*/}
      {/*  submitId="67572ac37b782807461b1c1b"*/}
      {/*  isOpen={open}*/}
      {/*  onClose={() => setOpen(false)}*/}
      {/*/>*/}
    </>
  );
};

export const Regular: Story = {
  render: () => (
    <MockupJukiProvider>
      <div className="jk-col gap">
        <SubmitButton />
        
        {/*<div style={{ width: '100%', height: 600 }}>*/}
        {/*  <SubmitView submitId="67572ac37b782807461b1c1b" />*/}
        {/*</div>*/}
      </div>
    </MockupJukiProvider>
  ),
};

Regular.args = {};
