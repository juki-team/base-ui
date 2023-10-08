import React, { PropsWithChildren, useId } from 'react';
import { PlacesType, Tooltip as ReactTooltip } from 'react-tooltip';
import { renderChildrenWithProps, renderReactNodeOrFunction } from '../../helpers';
import { ReactNodeOrFunctionType } from '../../types';

export interface TooltipProps {
  clickable?: boolean,
  content: ReactNodeOrFunctionType,
  placement?: PlacesType,
  visible?: boolean,
}

export const Tooltip = (props: PropsWithChildren<TooltipProps>) => {
  
  const {
    clickable = true,
    content,
    placement = 'top',
    children,
    visible,
  } = props;
  
  const id = useId();
  
  return (
    <>
      {renderChildrenWithProps(children, { 'data-tooltip-id': id })}
      <ReactTooltip id={`${id}`} clickable={clickable} place={placement} isOpen={visible}>
        {renderReactNodeOrFunction(content)}
      </ReactTooltip>
    </>
  );
}