import { usePageStore } from '../../../stores/page/usePageStore';
import { Button, T } from '../../atoms';
import { ButtonProps } from '../../atoms/Button/Button';
import { sizeTabsInlineIcon } from './utils';

export const TabsInlineButton = ({ size, label, icon, ...props }: Omit<ButtonProps, 'children'> & { label: string }) => {
  
  const { isSmallScreen, isMediumScreen } = usePageStore(store => store.viewPort);
  
  const isSmallMediumScreen = isSmallScreen || isMediumScreen;
  const buttonSize = size || 'regular';
  
  return (
    <Button
      data-tooltip-id="jk-tooltip"
      data-tooltip-place="top-end"
      data-tooltip-content={isSmallMediumScreen ? label : ''}
      size={buttonSize}
      icon={sizeTabsInlineIcon(icon, buttonSize)}
      {...props}
    >
      {!isSmallMediumScreen && <T className="tt-se ws-np">{label}</T>}
    </Button>
  );
};
