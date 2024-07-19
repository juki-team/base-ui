import React from 'react';
import { useJukiRouter } from '../../hooks';
import { QueryParamKey } from '../../types';
import { Button, LoginIcon } from '../atoms';
import { LoginModal } from '../templates/MainMenu/LoginModal';

export const MockupLoginButton = () => {
  const { setSearchParams, searchParams, deleteSearchParams, appendSearchParams } = useJukiRouter();
  return (
    <div style={{ position: 'absolute', right: 48, bottom: 10, zIndex: 10000000 }}>
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
