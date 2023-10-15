import React from 'react';
import { ButtonAction } from './ButtonAction';
import { FloatToolbarProps } from './types';

export const FloatToolbar = ({ actionButtons }: FloatToolbarProps) => {
  
  return (
    <div className="jk-float-toolbar-layout">
      <div className="jk-float-toolbar-container">
        {actionButtons.map((props, index) => <ButtonAction {...props} key={index} />)}
      </div>
    </div>
  );
};