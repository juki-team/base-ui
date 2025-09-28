import { CodeLanguage, SubmissionRunStatus } from '@juki-team/commons';
import { MockupJukiProvider } from '../../../mockup';
import { UserCodeEditor as UserCodeEditorCmp } from './';

export default {
  component: UserCodeEditorCmp,
};

const initialTestCases = {
  'test-empty-with-PE': {
    key: 'test-empty-with-PE',
    index: 0,
    in: '2\n1 5',
    out: '',
    testOut: '6\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-without-PE': {
    key: 'test-empty-without-PE',
    index: 1,
    in: '2\n1 5',
    out: '',
    testOut: '6',
    withPE: false,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty': {
    key: 'test-empty',
    index: 2,
    in: '3\n1 2 -9 9 -19 8',
    out: '',
    testOut: '3\n0\n-11\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-1': {
    key: 'test-empty-1',
    index: 3,
    in: '5\n1 2\n-9 9\n-19 8\n0 0\n1 1',
    out: '',
    testOut: '3\n0\n-11\n0\n2\n',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
  'test-empty-2': {
    key: 'test-empty-2',
    index: 4,
    in: '5\n1 2\n-9 9\n-19 8\n0 0\n1 1',
    out: '',
    testOut: '',
    withPE: true,
    err: '',
    log: '',
    sample: true,
    hidden: false,
    status: SubmissionRunStatus.NONE,
    messageTimestamp: 0,
  },
};

export const UserCodeEditor = () => {
  return (
    <MockupJukiProvider>
      <div style={{ height: '500px', padding: 20 }}>
        <UserCodeEditorCmp<CodeLanguage>
          // languages={[{ value: "A", label: "A" }]}
          initialTestCases={initialTestCases}
          languages={[
            { value: CodeLanguage.CPP17, label: CodeLanguage.CPP17 as string },
            { value: CodeLanguage.JAVASCRIPT, label: CodeLanguage.JAVASCRIPT as string },
            { value: CodeLanguage.CPP17, label: CodeLanguage.CPP17 as string },
          ]}
          storeKey={'testing'}
          enableAddCustomSampleCases
          enableAddSampleCases
        />
      </div>
    </MockupJukiProvider>
  );
};
