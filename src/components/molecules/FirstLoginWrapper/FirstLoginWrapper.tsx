import React, { cloneElement, ReactElement } from 'react';
import { useJukiRouter, useJukiUser, useNotification } from '../../../hooks';
import { QueryParamKey } from '../../../types';
import { T } from '../../atoms';

export const FirstLoginWrapper = ({ children }: { children: ReactElement; }) => {
  const { user: { isLogged } } = useJukiUser();
  const { setSearchParams } = useJukiRouter();
  const { addWarningNotification } = useNotification();
  const onClick = () => {
    if (!isLogged) {
      addWarningNotification(<T className="tt-se">first login</T>);
      setSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' });
    }
  };
  return cloneElement(children, { onClick });
};
