import { type SubmissionDataResponseDTO } from '@juki-team/commons';
import { useEffect } from 'react';
import { useJukiTask } from '../../../../contexts/JukiTasksProvider/useJukiTask';
import { useCheckAndStartServices } from '../../../hooks';
import { SubmissionVerdict, type SubmissionVerdictProps } from './SubmissionVerdict';

export interface ListenerVerdictProps extends Omit<SubmissionVerdictProps, 'submissionData'> {
  processedCases?: SubmissionDataResponseDTO['processedCases'],
}

export const SubmissionListenerVerdict = ({
                                            verdict,
                                            points,
                                            status,
                                            submitId,
                                            processedCases,
                                          }: ListenerVerdictProps) => {
  
  const { submissions, listenSubmission, unListenSubmission } = useJukiTask();
  
  useCheckAndStartServices();
  useEffect(() => {
    listenSubmission({
      id: submitId,
      problem: { name: '' },
      contest: { name: '', problemIndex: '' },
    }, false);
    return () => {
      unListenSubmission(submitId);
    };
  }, [ listenSubmission, submitId, unListenSubmission ]);
  
  const submissionData = submissions[submitId];
  
  return (
    <SubmissionVerdict
      verdict={verdict}
      points={points}
      status={status}
      submitId={submitId}
      submissionData={submissionData}
      processedCases={processedCases}
    />
  );
};
