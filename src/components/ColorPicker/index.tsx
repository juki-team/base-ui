import React, { useState } from 'react';
import { ColorResult, SketchPicker } from 'react-color';
import { PALLETE } from '../../config/constants';
import { Button, Input, Popover, T } from '../index';
import { ColorPickerProps } from './types';

export const ColorPicker = ({ color, children, onChange }: ColorPickerProps) => {
  
  const [newColor, setNewColor] = useState<ColorResult>(color ? color : {
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
        <div className="color-picker-layout">
          <SketchPicker
            color={newColor?.hex}
            onChangeComplete={(colorResult) => setNewColor(colorResult)}
            presetColors={[...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS]}
          />
          <Button
            onClick={() => {
              handlePick();
              onClose(0);
            }}
            style={{ backgroundColor: newColor?.hex, borderColor: newColor?.hex }}
            block
            size="small"
          >
            <T>pick</T>
          </Button>
        </div>
      )}
      triggerOn="click"
      placement="bottom"
    >
      {children ? children : <Input onChange={() => null} value={color?.hex} />}
    </Popover>
  );
};

export * from './types';
