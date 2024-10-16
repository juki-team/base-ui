import React, { PropsWithChildren, useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { renderChildrenWithProps, renderReactNodeOrFunction } from '../../../helpers';
import { Portal } from '../Portal';
import { TooltipProps } from './types';

export const TooltipOld = (props: PropsWithChildren<TooltipProps>) => {
  
  const {
    clickable = true,
    content,
    placement = 'top',
    children,
    visible,
    withPortal,
    className,
    classNameArrow,
  } = props;
  
  const id = useId();
  
  if (withPortal) {
    return (
      <>
        {renderChildrenWithProps(children, { 'data-tooltip-id': id })}
        <Portal>
          <ReactTooltip
            id={`${id}`}
            clickable={clickable}
            place={placement}
            isOpen={visible}
            opacity={1}
            positionStrategy="fixed"
            className={className}
            classNameArrow={classNameArrow}
          >
            {renderReactNodeOrFunction(content)}
          </ReactTooltip>
        </Portal>
      </>
    );
  }
  
  return (
    <>
      {renderChildrenWithProps(children, { 'data-tooltip-id': id })}
      <ReactTooltip
        id={`${id}`}
        clickable={clickable}
        place={placement}
        isOpen={visible}
        opacity={1}
        positionStrategy="fixed"
        className={className}
        classNameArrow={classNameArrow}
      >
        {renderReactNodeOrFunction(content)}
      </ReactTooltip>
    </>
  );
};
