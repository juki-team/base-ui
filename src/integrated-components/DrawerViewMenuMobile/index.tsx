import { ArrowBackIcon, CloseIcon, HelpSection, Image, T } from 'components';
import { classNames, renderReactNodeOrFunction, renderReactNodeOrFunctionP1 } from 'helpers';
import { useJukiUser } from 'hooks';
import React, { Children, useState } from 'react';
import { SettingsSection } from './SettingsSection';

export const DrawerViewMenuMobile = ({ close, menu, logoImageUrl }) => {
  
  const { company: { name } } = useJukiUser();
  const [helpOpen, setHelpOpen] = useState(false);
  
  return (
    <div
      className="jk-drawer-menu-mobile jk-col top nowrap stretch"
      style={{ backgroundColor: 'var(--t-color-white-2)' }}
    >
      <div
        className="jk-row extend center nowrap bc-we elevation-1 pn-re"
        style={{ height: 'var(--top-horizontal-menu-height)' }}
      >
        <div className="jk-row pad-left-right" style={{ position: helpOpen ? undefined : 'absolute', left: 0 }}>
          {helpOpen ? (
            <ArrowBackIcon className="clickable jk-border-radius-inline" onClick={() => setHelpOpen(false)} />
          ) : <CloseIcon className="clickable jk-border-radius-inline" onClick={close} />}

        </div>
        <div className="jk-row extend">
          {helpOpen ? (
            <div className="jk-row extend left"><T className="tt-se">help</T></div>
          ) : (
            <Image
              src={logoImageUrl}
              alt={name}
              height={45}
              width={90}
            />
          )}
        </div>
      </div>
      {helpOpen ? (
        <div className="jk-col gap top pad-left-right pad-top-bottom">
          <HelpSection />
        </div>
      ) : (
        <>
          <div className="jk-menu-items jk-col gap stretch top pad-left-right pad-top-bottom flex-1">
            {Children.toArray(menu.map((menu, index) => {
              const menuItem = (
                <div
                  className={classNames('jk-menu-item jk-row extend gap nowrap left jk-border-radius-inline', {
                    selected: menu.selected,
                  })}
                  key={index}
                  onClick={close}
                >
                  {menu.icon && <div className="">{renderReactNodeOrFunction(menu.icon)}</div>}
                  <div className="jk-menu-item-label">{renderReactNodeOrFunction(menu.label)}</div>
                </div>
              );
              return renderReactNodeOrFunctionP1(menu.menuItemWrapper, menuItem);
            }))}
          </div>
          <div className="jk-divider pad-left-right" style={{ boxSizing: 'border-box' }} />
          <div className="jk-row extend block">
            <div className="jk-col gap pad-left-right pad-top-bottom">
              <SettingsSection isOpen isMobile={true} helpOpen={helpOpen} setHelpOpen={setHelpOpen} popoverPlacement="top" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
