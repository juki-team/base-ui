import { SubmissionDataResponseDTO } from '@juki-team/commons';
import React, { useEffect } from 'react';
import { useJukiTask } from '../../../contexts/JukiTasksProvider/useJukiTask';
import { useRunnerServicesWakeUp } from '../../../hooks';
import { SubmissionVerdict, SubmissionVerdictProps } from './SubmissionVerdict';

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
  
  useRunnerServicesWakeUp();
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
