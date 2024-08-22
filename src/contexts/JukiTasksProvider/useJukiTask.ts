import { useContext } from 'react';
import { TasksContext } from './context';

export const useJukiTask = () => {
  const { listenSubmission, unListenSubmission, submissions } = useContext(TasksContext);
  
  return {
    listenSubmission,
    unListenSubmission,
    submissions,
  };
};
