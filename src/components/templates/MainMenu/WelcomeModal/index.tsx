import React from 'react';
import {
  BasicModalProps,
  ButtonLoader,
  ButtonLoaderOnClickType,
  JukiCompleteLaptopImage,
  Modal,
  T,
} from '../../../index';

export interface WelcomeModalProps extends BasicModalProps {
  nickname: string,
  onSeeMyProfile: ButtonLoaderOnClickType,
}

export const WelcomeModal = ({ isOpen, nickname, onClose, onSeeMyProfile }: WelcomeModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    className="modal-welcome"
    closeIcon={false}
  >
    <div className="jk-pad-md jk-row nowrap">
      <div>
        <h2><T>hi</T>&nbsp;<span className="given-name">{nickname}</span>!</h2>
        <h3><T>welcome to the Online Juki Judge</T></h3>
        <div className="jk-col gap stretch">
          <p>
            <T className="tt-se">
              participate in coding contests ranging from beginner level to week-long coding marathons
            </T>
          </p>
          <div className="jk-row-col gap block">
            <ButtonLoader type="light" onClick={onSeeMyProfile} extend>
              <T className="ws-np">see my profile</T>
            </ButtonLoader>
            <ButtonLoader onClick={onClose} extend><T>continue</T></ButtonLoader>
          </div>
        </div>
      </div>
      <div>
        <JukiCompleteLaptopImage />
      </div>
    </div>
  </Modal>
);
