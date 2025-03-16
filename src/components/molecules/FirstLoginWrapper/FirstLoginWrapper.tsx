import React, { cloneElement, PropsWithChildren, ReactElement } from 'react';
import { useJukiNotification, useJukiUser, useRouterStore } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { T } from '../../atoms';

export const FirstLoginWrapper = ({ children }: PropsWithChildren) => {
  const { user: { isLogged } } = useJukiUser();
  const setSearchParams = useRouterStore(state => state.setSearchParams);
  const { addWarningNotification } = useJukiNotification();
  if (isLogged) {
    return children;
  }
  
  const onClick = () => {
    addWarningNotification(<T className="tt-se">you must log in</T>);
    setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' });
  };
  
  return cloneElement(children as ReactElement, { onClick } as ReactElement<{}>['props']);
};
