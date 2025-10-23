// https://stackoverflow.com/questions/49426474/can-a-react-portal-be-used-in-a-stateless-functional-component-sfc
import { type ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { useUIStore } from '../../../stores/ui/useUIStore';
import type { PortalProps } from './types';

export function Portal({ children }: PortalProps): ReactNode {
  
  const jukiAppDivRef = useUIStore(store => store.jukiAppDivRef);
  
  console.log({ jukiAppDivRef });
  if (jukiAppDivRef.current) {
    return ReactDOM.createPortal(children, jukiAppDivRef.current);
  }
  
  return null;
};
