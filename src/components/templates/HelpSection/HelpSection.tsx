import { useUserStore } from '../../../stores/user/useUserStore';
import { T } from '../../atoms/T/T';
import { ContactPhoneIcon } from '../../atoms/server/icons/google/ContactPhoneIcon';
import { MailIcon } from '../../atoms/server/icons/google/MailIcon';
import { TelegramIcon } from '../../atoms/server/icons/specials/TelegramIcon';

export function HelpSection() {
  const { contactEmail, contactTelegram, contactCellPhoneNumber } = useUserStore((state) => state.organization);

  return (
    <div className="jk-col gap left stretch extend">
      <h3 className="">
        <T className="tt-se ws-np">need help?</T>
      </h3>
      <div className="jk-row left ta-cr">
        <T className="tt-se ws-np">contact the webmaster</T>:
      </div>
      <div />
      <div className="jk-row left gap nowrap">
        <TelegramIcon />
        <div className="jk-row link fw-bd">
          <a href={contactTelegram} target="_blank" rel="noreferrer">
            {contactTelegram.replace('https://', '')}
          </a>
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
}
