import React, { PropsWithChildren, useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';
import { renderChildrenWithProps, renderReactNodeOrFunction } from '../../../helpers';
import { TooltipProps } from './types';

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
      {renderChildrenWithProps(children, {
        'data-tooltip-id': id,
        'data-tooltip-position-strategy': 'fixed',
      })}
      <ReactTooltip id={`${id}`} clickable={clickable} place={placement} isOpen={visible} opacity={1}>
        {renderReactNodeOrFunction(content)}
      </ReactTooltip>
    </>
  );
}
