import React from 'react';
import { useRouterStore } from '../../hooks';
import { QueryParamKey } from '../../types';
import { Button } from '../atoms';
import { LoginIcon } from '../server';
import { LoginModal } from '../templates/MainMenu/login/LoginModal';

export const MockupLoginButton = () => {
  const { setSearchParams, searchParams, deleteSearchParams, appendSearchParams } = useRouterStore();
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
