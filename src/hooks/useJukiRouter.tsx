import { useContext } from 'react';
import { RouterContext } from '../contexts/JukiRouterProvider/context';

export const useJukiRouter = () => {
  
  const { searchParams, appendSearchParams, deleteSearchParams, setSearchParams } = useContext(RouterContext);
  
  return {
    searchParams,
    appendSearchParams,
    deleteSearchParams,
    setSearchParams,
  };
};
