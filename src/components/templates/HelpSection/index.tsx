import React from 'react';
import { useUserStore } from '../../../stores/user/useUserStore';
import { ContactPhoneIcon, MailIcon, T, TelegramIcon } from '../../atoms';

export const HelpSection = () => {
  
  const { contactEmail, contactTelegram, contactCellPhoneNumber } = useUserStore(state => state.company);
  
  return (
    <div className="jk-col gap left stretch extend">
      <h3 className=""><T className="tt-se ws-np">need help?</T></h3>
      <div className="jk-row left ta-cr"><T className="tt-se ws-np">contact the webmaster</T>:</div>
      <div />
      <div className="jk-row left gap nowrap">
        <TelegramIcon />
        <div className="jk-row link fw-bd">
          <a href={contactTelegram} target="_blank" rel="noreferrer">{contactTelegram.replace('https://', '')}</a>
        </div>
      </div>
      <div />
      <div className="jk-row left gap nowrap">
        <ContactPhoneIcon />
        <div className="jk-row fw-bd">{contactCellPhoneNumber}</div>
      </div>
      <div />
      <div className="jk-row left gap nowrap">
        <MailIcon />
        <div className="jk-row fw-bd">{contactEmail}</div>
      </div>
    </div>
  );
};
