// https://stackoverflow.com/questions/49426474/can-a-react-portal-be-used-in-a-stateless-functional-component-sfc
import { PropsWithChildren, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({
  children,
  className,
  el = 'div',
}: PropsWithChildren<{ className?: string, el?: string }>) => {
  
  const [container, setContainer] = useState<HTMLElement | null>(() => {
    // This will be executed only on the initial render
    // https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
    return null;
  });
  
  useEffect(() => {
    setContainer(document.createElement(el));
  }, [el]);
  
  useEffect(() => {
    if (container) {
      if (className) {
        container.classList.add(className);
      }
      document.body.appendChild(container);
    }
    return () => {
      if (container) {
        document.body.removeChild(container);
      }
    };
  }, [className, container]);
  
  if (container) {
    return ReactDOM.createPortal(children, container);
  }
  
  return null;
};
