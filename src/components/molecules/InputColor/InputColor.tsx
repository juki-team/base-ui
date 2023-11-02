import { PALLETE } from '@juki-team/commons';
import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { Button, Input, Popover, T } from '../../atoms';
import { ColorPickerProps } from './types';

export const InputColor = ({ color, children, onChange, label }: ColorPickerProps) => {
  
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
      content={({ onClose }) => (
        <div className="color-picker-layout jk-pad-sm">
          <SketchPicker
            color={newColor?.hex}
            onChangeComplete={(colorResult) => setNewColor(colorResult)}
            presetColors={[ ...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS ]}
          />
          <Button
            onClick={() => {
              handlePick();
              onClose(0);
            }}
            extend
            size="small"
          >
            <T>pick</T>
          </Button>
        </div>
      )}
      triggerOn="click"
      placement="bottom"
      showPopperArrow
    >
      {children ? children : <Input onChange={() => null} value={color?.hex} label={label} />}
    </Popover>
  );
};
