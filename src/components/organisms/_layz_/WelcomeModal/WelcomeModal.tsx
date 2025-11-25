import { Status } from '@juki-team/commons';
import { QueryParamKey } from '../../../../enums';
import { useRouterStore } from '../../../../stores/router/useRouterStore';
import { useUIStore } from '../../../../stores/ui/useUIStore';
import { useUserStore } from '../../../../stores/user/useUserStore';
import { Modal, T } from '../../../atoms';
import { ButtonLoader } from '../../../molecules';
import type { ButtonLoaderOnClickType } from '../../../types';
import type { WelcomeModalProps } from './types';

export default function WelcomeModal({ onSeeMyProfile: _onSeeMyProfile }: WelcomeModalProps) {
  
  const { Image } = useUIStore(store => store.components);
  const searchParams = useRouterStore(state => state.searchParams);
  const deleteSearchParams = useRouterStore(state => state.deleteSearchParams);
  const {
    nickname,
  } = useUserStore(state => state.user);
  
  const onSeeMyProfile: ButtonLoaderOnClickType = async (setLoaderStatus) => {
    setLoaderStatus(Status.LOADING);
    await _onSeeMyProfile(nickname);
    deleteSearchParams({ name: QueryParamKey.WELCOME });
    setLoaderStatus(Status.SUCCESS);
  };
  const onClose = () => deleteSearchParams({ name: QueryParamKey.WELCOME });
  
  return (
    <Modal
      isOpen={searchParams.has(QueryParamKey.WELCOME)}
      onClose={onClose}
      className="modal-welcome"
    >
      <div className="jk-pg-md jk-row nowrap">
        <div className="jk-col gap stretch">
          <h2><T className="tt-se">hi</T>&nbsp;<span className="given-name">{nickname}</span>!</h2>
          <h3><T className="tt-se">welcome to the platform!</T></h3>
          <div className="jk-col gap stretch flex-1">
            {/*<p>*/}
            {/*  <T className="tt-se">*/}
            {/*    participate in coding contests ranging from beginner level to week-long coding marathons*/}
            {/*  </T>*/}
            {/*</p>*/}
            <div className="jk-row-col gap block">
              <ButtonLoader type="light" onClick={onSeeMyProfile} expand>
                <T className="ws-np tt-se">see my profile</T>
              </ButtonLoader>
              <ButtonLoader onClick={onClose} expand><T className="tt-se">continue</T></ButtonLoader>
            </div>
          </div>
        </div>
        <div style={{ width: '40%' }} className="pn-re">
          <Image
            className="image-border"
            alt="Juki with laptop image"
            fill
            src="https://images.juki.pub/assets/juki-image-laptop.png"
          />
        </div>
      </div>
    </Modal>
  );
}
