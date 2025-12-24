import { TourProvider, useTour } from '@reactour/tour';
import { useState } from 'react';
import { QueryParamKey } from '../../../../enums';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { T } from '../../../atoms';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { SetLoaderStatusOnClickType } from '../../../types';
import { ForgotPasswordModal, LoginModalTemplate } from './LoginModalTemplate';
import { LoginFormType } from './LoginModalTemplate/types';
import { LoginModalProps } from './types';

const ContentForgotPassword = () => {
  return (
    <div>
      <T className="tt-se fw-bd">forgot your password? Recover it here</T>
    </div>
  );
};

const steps = [
  {
    selector: '[data-tour-key="forgot-password"]',
    content: ContentForgotPassword,
  },
];

export function LoginModalCmp({
                                multiCompanies,
                                openForgotPasswordModal,
                                setOpenForgotPasswordModal,
                              }: LoginModalProps) {
  
  const { signIn } = useJukiUser();
  const { osLabel, label } = useUserStore(state => state.device);
  const searchParams = useRouterStore(state => state.searchParams);
  const appendSearchParams = useRouterStore(state => state.appendSearchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  const [ passwordTourOpened, setPasswordTourOpened ] = useState(false);
  const onError = () => {
    if (!passwordTourOpened) {
      setIsOpen(true);
      setPasswordTourOpened(true);
    }
  };
  const { setIsOpen } = useTour();
  
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
      openForgotPasswordModal={openForgotPasswordModal}
      setOpenForgotPasswordModal={setOpenForgotPasswordModal}
      multiCompanies={multiCompanies}
    />
  );
}

export function LoginModal(props: LoginModalProps) {
  const [ openForgotPasswordModal, setOpenForgotPasswordModal ] = useState(false);
  
  return (
    <>
      <ForgotPasswordModal
        isOpen={openForgotPasswordModal}
        onClose={() => setOpenForgotPasswordModal(false)}
      />
      <TourProvider
        steps={steps}
        onClickHighlighted={(_, { setIsOpen }) => {
          setIsOpen(false);
          setOpenForgotPasswordModal(true);
        }}
        maskClassName="jk-tour-mask-opacity-0"
        disableInteraction
        showBadge={false}
        showNavigation={false}
        showCloseButton={false}
      >
        <LoginModalCmp {...props} />
      </TourProvider>
    </>
  );
}
