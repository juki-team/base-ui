import { createContext } from 'react';
import { SocketSubmissions, SubmissionToCheck } from './types';

export const TasksContext = createContext<{
  unListenSubmission: (submissionId: string) => void,
  listenSubmission: (submissionToCheck: SubmissionToCheck, withNotification: boolean) => void,
  submissions: SocketSubmissions,
}>({ submissions: {}, unListenSubmission: () => null, listenSubmission: () => null });
