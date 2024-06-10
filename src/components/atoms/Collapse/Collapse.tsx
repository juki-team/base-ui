import React, { useState } from 'react';
import { Collapse as ReactCollapse } from 'react-collapse';
import { classNames, renderReactNodeOrFunctionP1 } from '../../../helpers';
import { useHandleState } from '../../../hooks/useHandleState';
import { ExpandLessIcon, ExpandMoreIcon } from '../icons';
import { CollapseProps } from './types';

export const Collapse = (props: CollapseProps) => {
  
  const {
    children,
    header,
    className,
    showContent: _showContent,
    onChangeShowContent: _onChangeShowContent,
    startsShowing = false,
  } = props;
  
  const [ isOpen, setIsOpen ] = useHandleState(startsShowing, _showContent, _onChangeShowContent);
  const [ isFullyClosed, setIsFullyClosed ] = useState(false);
  const [ isFullyOpened, setIsFullyOpened ] = useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prevState => !prevState);
  
  const currentIsFullyClosed = isOpen ? false : isFullyClosed;
  const currentIsFullyOpened = !isOpen ? false : isFullyOpened;
  
  return (
    <div
      className={classNames('jk-collapse-container jk-col stretch', className, {
        collapsed: !isOpen,
        'is-fully-opened': currentIsFullyOpened,
        'is-fully-closed': currentIsFullyClosed,
      })}
    >
      {renderReactNodeOrFunctionP1(header, {
        isOpen,
        close,
        open,
        toggle,
        isFullyClosed: currentIsFullyClosed,
        isFullyOpened: currentIsFullyOpened,
        icon: isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />,
      })}
      <ReactCollapse
        isOpened={isOpen}
        onRest={({ isFullyOpened, isFullyClosed }) => {
          setIsFullyOpened(isFullyOpened);
          setIsFullyClosed(isFullyClosed);
        }}
      >
        <div className="jk-collapse-collapsible- jk-col block stretch">
          {renderReactNodeOrFunctionP1(children, {
            isOpen,
            close,
            open,
            toggle,
            isFullyClosed: currentIsFullyClosed,
            isFullyOpened: currentIsFullyOpened,
          })}
        </div>
      </ReactCollapse>
    </div>
  );
};
