import { useContext } from 'react';
import { TasksContext } from './context';

export const useJukiTask = () => {
  const { listenSubmission, submissions } = useContext(TasksContext);
  
  return {
    listenSubmission,
    submissions,
  };
};
