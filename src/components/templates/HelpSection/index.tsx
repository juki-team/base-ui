import React from 'react';
import { useJukiUser } from '../../../hooks/useJukiUser';
import { MailIcon, PhoneIcon, T, TelegramIcon } from '../../atoms';

export const HelpSection = () => {
  
  const { company: { contactEmail, contactTelegram, contactCellPhoneNumber } } = useJukiUser();
  
  return (
    <div className="jk-col gap left stretch extend">
      <h3 className="ta-cr"><T className="tt-se ws-np">need help?</T></h3>
      <div className="jk-row left ta-cr"><T className="tt-se ws-np">contact the webmaster</T>:</div>
      <div />
      <div className="jk-row gap nowrap">
        <TelegramIcon />
        <div className="jk-row link fw-bd">
          <a href={contactTelegram} target="_blank" rel="noreferrer">{contactTelegram.replace('https://', '')}</a>
        </div>
      </div>
      <div />
      <div className="jk-row gap nowrap">
        <PhoneIcon />
        <div className="jk-row fw-bd">{contactCellPhoneNumber}</div>
      </div>
      <div />
      <div className="jk-row gap nowrap">
        <MailIcon />
        <div className="jk-row fw-bd">{contactEmail}</div>
      </div>
    </div>
  );
};
