import { Modal, T } from '../../../atoms';
import { useJukiUI } from '../../../hooks/useJukiUI';
import { ButtonLoader } from '../../../molecules';
import type { WelcomeModalProps } from './types';

export function WelcomeModal({ isOpen, nickname, onClose, onSeeMyProfile }: WelcomeModalProps) {
  
  const { components: { Image } } = useJukiUI();
  
  return (
    <Modal
      isOpen={isOpen}
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
        <div style={{ width: '40%' }}>
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
