import React from 'react';
import { CheckIcon, PendingActionsIcon } from '../../atoms';
import { IconProps } from '../../atoms/types';

export const ProblemStatus = ({ solved, tried, size }: {
  solved: boolean,
  tried: boolean,
  size?: IconProps['size']
}) => {
  return solved ? (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content="you solved it"
      data-tooltip-t-class-name="tt-se ws-np"
      className="jk-row"
    >
      <CheckIcon size={size} filledCircle className="cr-ss" />
    </div>
  ) : tried && (
    <div
      data-tooltip-id="jk-tooltip"
      data-tooltip-content="you tried it"
      data-tooltip-t-class-name="tt-se ws-np"
      className="jk-row"
    >
      <PendingActionsIcon size={size} filledCircle className="cr-wg" />
    </div>
  );
};
