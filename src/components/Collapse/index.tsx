import React, { PropsWithChildren, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { classNames, renderReactNodeOrFunctionP1 } from '../../helpers';
import { CollapseProps } from './types';

export const Collapse = ({ children, header, className }: PropsWithChildren<CollapseProps>) => {
  
  const [isOpen, setIsOpen] = useState(false);
  const { height = 0, ref } = useResizeDetector();
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prevState => !prevState);
  
  return (
    <div className={classNames('jk-collapse-container jk-col stretch', className, { collapsed: !isOpen })}>
      {renderReactNodeOrFunctionP1(header, { isOpen, close, open, toggle })}
      <div style={{ height: isOpen ? height : 0 }} className="jk-collapse-collapsible jk-col block stretch">
        <div ref={ref} style={{ height: isOpen ? undefined : 0 }}>
          {renderReactNodeOrFunctionP1(children, { isOpen, close, open })}
        </div>
      </div>
    </div>
  );
};

export * from './types';
