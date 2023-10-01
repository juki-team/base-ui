import React from 'react';
import { MailIcon, PhoneIcon, T, TelegramIcon } from '../../components';
import { useJukiUser } from '../../hooks';

export const HelpSection = () => {
  
  const { isLoading, company: { emailContact } } = useJukiUser();
  
  return (
    <div className="jk-col gap left stretch extend">
      <h3 className="ta-cr"><T className="tt-se ws-np">need help?</T></h3>
      <div className="jk-row left ta-cr"><T className="tt-se ws-np">contact the webmaster</T>:</div>
      <div />
      <div className="jk-row gap nowrap">
        <TelegramIcon />
        <div className="jk-row link fw-bd">
          <a href="https://t.me/OscarGauss" target="_blank" rel="noreferrer">t.me/OscarGauss</a>
        </div>
      </div>
      <div />
      <div className="jk-row gap nowrap">
        <PhoneIcon />
        <div className="jk-row fw-bd">+591 79153358</div>
      </div>
      <div />
      {!isLoading && !!emailContact && (
        <div className="jk-row gap nowrap">
          <MailIcon />
          <div className="jk-row fw-bd">{emailContact}</div>
        </div>
      )}
    </div>
  );
};
