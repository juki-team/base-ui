import { createContext } from 'react';
import { SocketSubmissions, SubmissionToCheck } from './types';

export const TasksContext = createContext<{
  listenSubmission: (submissionToCheck: SubmissionToCheck) => void, submissions: SocketSubmissions,
}>({ submissions: {}, listenSubmission: () => null });
