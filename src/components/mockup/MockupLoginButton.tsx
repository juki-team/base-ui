import React from 'react';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { QueryParamKey } from '../../types';
import { Button } from '../atoms';
import { LoginIcon } from '../server';
import { LoginModal } from '../templates/MainMenu/login/LoginModal';

export const MockupLoginButton = () => {
  
  const setSearchParams = useRouterStore(store => store.setSearchParams);
  const searchParams = useRouterStore(store => store.searchParams);
  const deleteSearchParams = useRouterStore(store => store.deleteSearchParams);
  const appendSearchParams = useRouterStore(store => store.appendSearchParams);
  
  return (
    <div className="jk-pg" style={{ position: 'absolute', right: 48, bottom: 10, zIndex: 10000000 }}>
      <LoginModal
        isOpen={searchParams.has(QueryParamKey.SIGN_IN)}
        onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_IN })}
        onSignUpButton={() => {
          deleteSearchParams({ name: QueryParamKey.SIGN_IN });
          appendSearchParams({ name: QueryParamKey.SIGN_UP, value: '1' });
        }}
        multiCompanies
      />
      <Button
        onClick={() => {
          setSearchParams({ name: QueryParamKey.SIGN_IN, value: 'true' });
        }}
        icon={<LoginIcon />}
      />
    </div>
  );
};
