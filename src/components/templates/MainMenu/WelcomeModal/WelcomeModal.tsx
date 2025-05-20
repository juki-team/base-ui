import React from 'react';
import { Modal, T } from '../../../atoms';
import { ButtonLoader } from '../../../molecules';
import { JukiCompleteLaptopImage } from '../../../server';
import { WelcomeModalProps } from './types';

export const WelcomeModal = ({ isOpen, nickname, onClose, onSeeMyProfile }: WelcomeModalProps) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
    className="modal-welcome"
  >
    <div className="jk-pg-md jk-row nowrap">
      <div>
        <h2><T>hi</T>&nbsp;<span className="given-name">{nickname}</span>!</h2>
        <h3><T>welcome to the platform!</T></h3>
        <div className="jk-col gap stretch">
          {/*<p>*/}
          {/*  <T className="tt-se">*/}
          {/*    participate in coding contests ranging from beginner level to week-long coding marathons*/}
          {/*  </T>*/}
          {/*</p>*/}
          <div className="jk-row-col gap block">
            <ButtonLoader type="light" onClick={onSeeMyProfile} expand>
              <T className="ws-np">see my profile</T>
            </ButtonLoader>
            <ButtonLoader onClick={onClose} expand><T>continue</T></ButtonLoader>
          </div>
        </div>
      </div>
      <div>
        <JukiCompleteLaptopImage />
      </div>
    </div>
  </Modal>
);
