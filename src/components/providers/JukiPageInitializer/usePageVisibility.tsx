// https://github.com/pgilad/react-page-visibility
// https://github.com/pgilad/react-page-visibility/blob/master/src/utils.js
import { useEffect } from 'react';
import { usePageStore } from '../../../stores/page/usePageStore';
import { getHandlerArgs, isSupported, visibility } from '../../helpers/visibility';

const isSupportedLocal = isSupported && !!visibility;

export const usePageVisibility = () => {
  const setIsVisible = usePageStore((store) => store.setIsVisible);

  useEffect(() => {
    if (!(isSupportedLocal && visibility)) {
      return;
    }
    const { event } = visibility;
    const handler = () => {
      const [currentlyVisible] = getHandlerArgs();
      setIsVisible(currentlyVisible);
    };

    handler();

    document.addEventListener(event, handler);

    return () => {
      document.removeEventListener(event, handler);
    };
  }, [setIsVisible]);
};
