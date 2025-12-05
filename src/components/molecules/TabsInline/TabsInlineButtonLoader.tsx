import { usePageStore } from '../../../stores/page/usePageStore';
import { T } from '../../atoms';
import { ButtonLoader } from '../ButtonLoader/ButtonLoader';
import { ButtonLoaderProps } from '../ButtonLoader/types';

export const TabsInlineButtonLoader = ({ size, label, ...props }: Omit<ButtonLoaderProps, 'children'> & {
  label: string
}) => {
  
  const { isSmallScreen, isMediumScreen, isHugeScreen } = usePageStore(store => store.viewPort);
  
  const isSmallMediumScreen = isSmallScreen || isMediumScreen;
  
  return (
    <ButtonLoader
      data-tooltip-id="jk-tooltip"
      data-tooltip-place="top-end"
      data-tooltip-content={isSmallMediumScreen ? label : ''}
      size={size || (isHugeScreen ? 'regular' : 'small')}
      {...props}
    >
      {!isSmallMediumScreen && <T className="tt-se ws-np">{label}</T>}
    </ButtonLoader>
  );
};
