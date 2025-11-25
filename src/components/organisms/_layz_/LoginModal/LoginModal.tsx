import { useState } from 'react';
import { QueryParamKey } from '../../../../enums';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { SetLoaderStatusOnClickType } from '../../../types';
import { LoginModalTemplate } from './LoginModalTemplate';
import { LoginFormType } from './LoginModalTemplate/types';
import { LoginModalProps } from './types';

export default function LoginModal({ multiCompanies }: LoginModalProps) {
  
  const { signIn } = useJukiUser();
  const { osLabel, label } = useUserStore(state => state.device);
  const [ highlightForgotPassword, setHighlightForgotPassword ] = useState(false);
  const searchParams = useRouterStore(state => state.searchParams);
  const appendSearchParams = useRouterStore(state => state.appendSearchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  const onError = () => setHighlightForgotPassword(true);
  
  const onSubmit = ({ companyKey, ...data }: LoginFormType, setLoader: SetLoaderStatusOnClickType) => signIn({
    params: companyKey ? { companyKey } : undefined,
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onError,
  });
  
  return (
    <LoginModalTemplate
      isOpen={searchParams.has(QueryParamKey.SIGN_IN)}
      onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_IN })}
      onSignUpButton={() => {
        deleteSearchParams({ name: QueryParamKey.SIGN_IN });
        appendSearchParams({ name: QueryParamKey.SIGN_UP, value: '1' });
      }}
      onSubmit={onSubmit}
      highlightForgotPassword={highlightForgotPassword}
      multiCompanies={multiCompanies}
    />
  );
};
