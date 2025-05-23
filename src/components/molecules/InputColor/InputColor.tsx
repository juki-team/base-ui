import { PALLETE } from '@juki-team/commons';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Button, Input, Popover, T } from '../../atoms';
import { InputColorProps } from './types';

export const InputColor = ({ color, children, onChange, label }: InputColorProps) => {
  
  const [ newColor, setNewColor ] = useState<ColorResult>(color ? color : {
    hex: '#000000',
    rgb: { a: 1, b: 0, g: 0, r: 0 },
    hsl: { a: 1, h: 240, l: 0, s: 0 },
  });
  const handlePick = () => { // color ? color : '#FFFFFF'
    newColor && onChange?.(newColor);
  };
  
  return (
    <Popover
      popoverClassName="bc-we jk-br-ie elevation-1"
      content={({ onClose }) => (
        <div className="color-picker-layout jk-pg-xsm">
          <SketchPicker
            color={newColor?.hex}
            onChangeComplete={(colorResult) => setNewColor(colorResult)}
            presetColors={[ ...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS ]}
          />
          <Button
            onClick={() => {
              handlePick();
              onClose();
            }}
            expand
            size="small"
          >
            <T>pick</T>
          </Button>
        </div>
      )}
      triggerOn="click"
      placement="bottom"
      // showPopperArrow
    >
      {children ? children : <span><Input onChange={() => null} value={color?.hex || ''} label={label} /></span>}
    </Popover>
  );
};
