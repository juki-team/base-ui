// https://github.com/pgilad/react-page-visibility
// https://github.com/pgilad/react-page-visibility/blob/master/src/utils.js
import { useEffect, useState } from 'react';

const hasDocument = typeof document !== 'undefined';

const vendorEvents = [
  {
    hidden: 'hidden',
    event: 'visibilitychange',
    state: 'visibilityState',
  },
  {
    hidden: 'webkitHidden',
    event: 'webkitvisibilitychange',
    state: 'webkitVisibilityState',
  },
  {
    hidden: 'mozHidden',
    event: 'mozvisibilitychange',
    state: 'mozVisibilityState',
  },
  {
    hidden: 'msHidden',
    event: 'msvisibilitychange',
    state: 'msVisibilityState',
  },
  {
    hidden: 'oHidden',
    event: 'ovisibilitychange',
    state: 'oVisibilityState',
  },
];

const isSupported = hasDocument && Boolean(document.addEventListener);

const visibility = (() => {
  if (!isSupported) {
    return null;
  }
  for (let event of vendorEvents) {
    if (event.hidden in document) {
      return event;
    }
  }
  // otherwise it's not supported
  return null;
})();

const getHandlerArgs = () => {
  if (!visibility) {
    return [ true, 'visible' ];
  }
  const { hidden, state } = visibility;
  // @ts-ignore
  return [ !document[hidden], document[state] ];
};

const isSupportedLocal = isSupported && visibility;

export const usePageVisibility = () => {
  const [ initiallyVisible ] = getHandlerArgs();
  
  const [ isVisible, setIsVisible ] = useState(initiallyVisible);
  
  useEffect(() => {
    if (isSupportedLocal) {
      const handler = () => {
        const [ currentlyVisible ] = getHandlerArgs();
        
        setIsVisible(currentlyVisible);
      };
      
      document.addEventListener(visibility?.event!, handler);
      
      return () => {
        document.removeEventListener(visibility?.event!, handler);
      };
    }
    return () => null;
  }, []);
  
  return isVisible;
};
