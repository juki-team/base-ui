import React, { Children, ReactNode, useState } from 'react';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from '../../../../helpers';
import { useJukiUI, useUserStore } from '../../../../hooks';
import { T } from '../../../atoms';
import { MenuType } from '../../../organisms';
import { ArrowBackIcon, CloseIcon } from '../../../server';
import { HelpSection } from '../../HelpSection';
import { SettingsSection } from '../SettingsSection';

export interface DrawerViewMenuMobileProps {
  onClose: () => void,
  menu: MenuType[],
  logoImageUrl: string,
  moreApps?: ReactNode,
}

export const DrawerViewMenuMobile = ({ onClose, menu, logoImageUrl, moreApps }: DrawerViewMenuMobileProps) => {
  
  const { components: { Image } } = useJukiUI();
  const companyName = useUserStore(state => state.company.name);
  const [ helpOpen, setHelpOpen ] = useState(false);
  
  return (
    <div
      className="jk-drawer-menu-mobile jk-col top nowrap stretch"
      style={{ backgroundColor: 'var(--t-color-white-dark)' }}
    >
      <div
        className="jk-row extend center nowrap bc-we elevation-1 pn-re"
        style={{ height: 'var(--top-horizontal-menu-height)' }}
      >
        <div className="jk-row jk-pg-rl" style={{ position: helpOpen ? undefined : 'absolute', left: 0 }}>
          {helpOpen ? (
            <ArrowBackIcon className="clickable jk-border-radius-inline" onClick={() => setHelpOpen(false)} />
          ) : <CloseIcon className="clickable jk-border-radius-inline" onClick={onClose} />}
        
        </div>
        <div className="jk-row extend">
          {helpOpen ? (
            <div className="jk-row extend left"><T className="tt-se">help</T></div>
          ) : (
            <Image
              src={logoImageUrl}
              alt={companyName}
              height={45}
              width={90}
            />
          )}
        </div>
      </div>
      {helpOpen ? (
        <div className="jk-col gap top jk-pg-rl jk-pg-tb">
          <HelpSection />
        </div>
      ) : (
        <>
          <div className="jk-menu-items jk-col gap stretch top jk-pg-rl jk-pg-tb flex-1">
            {Children.toArray(menu.map(({ selected, icon, label, menuItemWrapper }, index) => {
              const menuItem = (
                <div
                  className={classNames('jk-menu-item jk-row extend gap nowrap left jk-border-radius-inline', {
                    selected: !!selected,
                  })}
                  key={index}
                  onClick={onClose}
                >
                  {icon && <div>{renderReactNodeOrFunction(icon)}</div>}
                  <div className="jk-menu-item-label">{renderReactNodeOrFunction(label)}</div>
                </div>
              );
              
              if (menuItemWrapper) {
                return renderReactNodeOrFunctionP1(menuItemWrapper, {
                  children: menuItem, selected, icon, label, index, isOpenVerticalMenu: false,
                });
              }
              
              return menuItem;
            }))}
          </div>
          <div className="jk-divider jk-pg-rl" style={{ boxSizing: 'border-box' }} />
          <div className="jk-row extend block">
            <div className="jk-col gap jk-pg-rl jk-pg-tb">
              <SettingsSection
                isOpen
                isMobile={true}
                helpOpen={helpOpen}
                setHelpOpen={setHelpOpen}
                popoverPlacement="top"
                moreApps={moreApps}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
