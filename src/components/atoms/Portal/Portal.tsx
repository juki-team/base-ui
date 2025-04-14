// https://stackoverflow.com/questions/49426474/can-a-react-portal-be-used-in-a-stateless-functional-component-sfc
import { ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useJukiUI } from '../../../hooks';
import { PortalProps } from './types';

export const Portal = ({ children }: PortalProps): ReactNode => {
  
  const { jukiAppDivRef } = useJukiUI();
  
  if (jukiAppDivRef.current) {
    return ReactDOM.createPortal(children, jukiAppDivRef.current);
  }
  
  return null;
};
