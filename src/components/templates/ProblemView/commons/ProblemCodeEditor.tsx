import { CodeEditorTestCasesType, ProblemDataResponseDTO, SubmissionRunStatus } from '@juki-team/commons';
import { useJudge } from '../../../../hooks';
import { UserCodeEditor } from '../../../organisms';
import { CodeEditorExpandPositionType, UserCodeEditorProps } from '../../../organisms/types';

interface ProblemCodeEditorProps<T> {
  problem: ProblemDataResponseDTO,
  codeEditorLeftButtons?: UserCodeEditorProps<T>['leftButtons'],
  codeEditorCenterButtons?: UserCodeEditorProps<T>['centerButtons'],
  codeEditorRightButtons?: UserCodeEditorProps<T>['rightButtons'],
  codeEditorStoreKey: string,
  expandPosition?: CodeEditorExpandPositionType,
}

export const ProblemCodeEditor = <T, >(props: ProblemCodeEditorProps<T>) => {
  
  const {
    problem,
    codeEditorLeftButtons,
    codeEditorCenterButtons,
    codeEditorRightButtons,
    codeEditorStoreKey,
    expandPosition,
  } = props;
  
  const initialTestCases: CodeEditorTestCasesType = {};
  problem.statement.sampleCases?.forEach((sample, index) => {
    const key = 'sample-' + index;
    initialTestCases[key] = {
      key,
      log: '',
      sample: true,
      status: SubmissionRunStatus.NONE,
      err: '',
      out: '',
      index,
      in: sample.input,
      withPE: problem.settings.withPE,
      testOut: sample.output,
      hidden: false,
      messageTimestamp: 0,
    };
  });
  
  const { languages } = useJudge<T>({ key: problem.judge.key, isExternal: problem.judge.isExternal });
  
  return (
    <UserCodeEditor<T>
      languages={languages}
      storeKey={codeEditorStoreKey}
      leftButtons={codeEditorLeftButtons}
      centerButtons={codeEditorCenterButtons}
      rightButtons={codeEditorRightButtons}
      initialTestCases={!problem.judge.isExternal
        ? initialTestCases
        : undefined}
      enableAddCustomSampleCases={!problem.judge.isExternal}
      expandPosition={expandPosition}
      withoutRunCodeButton={problem.judge.isExternal}
      onlyCodeEditor={problem.judge.isExternal}
    />
  );
};
