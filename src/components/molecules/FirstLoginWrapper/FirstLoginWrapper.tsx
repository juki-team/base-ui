import React, { cloneElement, ReactElement } from 'react';
import { useJukiNotification, useJukiRouter, useJukiUser } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { T } from '../../atoms';

export const FirstLoginWrapper = ({ children }: { children: ReactElement; }) => {
  const { user: { isLogged } } = useJukiUser();
  const { setSearchParams } = useJukiRouter();
  const { addWarningNotification } = useJukiNotification();
  if (isLogged) {
    return children;
  }
  
  const onClick = () => {
    addWarningNotification(<T className="tt-se">you must log in</T>);
    setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' });
  };
  
  return cloneElement(children, { onClick });
};
