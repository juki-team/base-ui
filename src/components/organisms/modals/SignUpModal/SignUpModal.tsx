import { QueryParamKey } from '../../../../enums';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { SignUpModalTemplate } from './SignUpModalTemplate';
import type { SignUpModalComponentProps } from './SignUpModalTemplate/types';

export function SignUpModal() {
  
  const { osLabel, label } = useUserStore(state => state.device);
  const searchParams = useRouterStore(state => state.searchParams);
  const appendSearchParams = useRouterStore(state => state.appendSearchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  const { signUp } = useJukiUser();
  
  const onSubmit: SignUpModalComponentProps['onSubmit'] = (data, setLoader) => signUp({
    body: { ...data, osName: osLabel, deviceName: label },
    setLoader,
    onSuccess: () => {
      deleteSearchParams({ name: QueryParamKey.SIGN_UP });
      appendSearchParams({ name: QueryParamKey.WELCOME, value: '1' });
    },
  });
  
  return (
    <SignUpModalTemplate
      isOpen={searchParams.has(QueryParamKey.SIGN_UP)}
      onClose={() => deleteSearchParams({ name: QueryParamKey.SIGN_UP })}
      onSignInButton={() => {
        deleteSearchParams({ name: QueryParamKey.SIGN_UP });
        appendSearchParams({ name: QueryParamKey.SIGN_IN, value: '1' });
      }}
      onSubmit={onSubmit}
    />
  );
};
