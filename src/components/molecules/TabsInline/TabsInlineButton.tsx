import { usePageStore } from '../../../stores/page/usePageStore';
import { Button, T } from '../../atoms';
import { ButtonProps } from '../../atoms/Button/Button';

export const TabsInlineButton = ({ size, label, ...props }: Omit<ButtonProps, 'children'> & { label: string }) => {
  
  const { isSmallScreen, isMediumScreen } = usePageStore(store => store.viewPort);
  
  const isSmallMediumScreen = isSmallScreen || isMediumScreen;
  
  return (
    <Button
      {...props}
      data-tooltip-id="jk-tooltip"
      data-tooltip-place="top-end"
      data-tooltip-content={isSmallMediumScreen ? label : ''}
      size={size || (isSmallMediumScreen ? 'small' : 'regular')}
    >
      {!isSmallMediumScreen && <T className="tt-se ws-np">{label}</T>}
    </Button>
  );
};
