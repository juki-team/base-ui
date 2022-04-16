import React, { useEffect } from 'react';
import { BugIcon, LoadingIcon } from '../graphics';

export const NotFound = ({ redirectAction }: { redirectAction?: Function }) => {
  
  useEffect(() => {
    if (redirectAction) {
      redirectAction();
    }
  }, [redirectAction]);
  
  return (
    <div className="not-found jk-col center">
      <BugIcon />
      <h3>NOT FOUND</h3>
      <div className="text-xh text-bold">Redirecting...</div>
      <LoadingIcon />
    </div>
  );
};
