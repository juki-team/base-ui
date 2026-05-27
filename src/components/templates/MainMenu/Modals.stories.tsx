import { useState } from 'react';
import { Button } from '../../atoms/Button/Button';
import { MockupJukiProvider } from '../../mockup/MockupJukiProvider';
import { CalendarMonthIcon } from '../../atoms/server/icons/google/CalendarMonthIcon';
import { EventIcon } from '../../atoms/server/icons/google/EventIcon';
import { DrawerViewMenuMobile as DrawerViewMenuMobileCmp } from './DrawerViewMenuMobile/DrawerViewMenuMobile';

export default {
  component: DrawerViewMenuMobileCmp,
};

export const DrawerViewMenuMobile = () => {
  const [open, setOpen] = useState(false);

  return (
    <MockupJukiProvider>
      {open && (
        <DrawerViewMenuMobileCmp
          menu={[
            {
              icon: <CalendarMonthIcon />,
              label: 'calendar menu',
              selected: true,
              menuItemWrapper: ({ children }) => <>{children}</>,
            },
            {
              icon: <EventIcon />,
              label: 'calendar menu',
              selected: false,
              menuItemWrapper: ({ children }) => (
                <a href="/" target="_blank" rel="noopener">
                  {children}
                </a>
              ),
            },
          ]}
          onClose={() => setOpen(false)}
          logoImageUrl="https://images.juki.pub/c/juki-judge-horizontal-color-logo.svg"
        />
      )}
      <Button onClick={() => setOpen(true)}>open</Button>
    </MockupJukiProvider>
  );
};
