import { QueryParamKey } from '../../enums';
import { useRouterStore } from '../../stores/router/useRouterStore';
import { Button } from '../atoms';
import { LoginModal } from '../organisms';
import { LoginIcon } from '../server';

export const MockupLoginButton = () => {
  
  const setSearchParams = useRouterStore(store => store.setSearchParams);
  
  return (
    <div style={{ position: 'fixed', right: 64, bottom: 0, zIndex: 10000000, margin: 24 }}>
      <LoginModal multiCompanies />
      <Button
        onClick={() => {
          setSearchParams({ name: QueryParamKey.SIGN_IN, value: 'true' });
        }}
        icon={<LoginIcon />}
      />
    </div>
  );
};
