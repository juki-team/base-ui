import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { Button, Input, Popover, T } from '../index';
import { PALLETE } from '../../config/constants';
import { ColorPickerProps } from './types';

export const ColorPicker = ({ color, children, onChange }: ColorPickerProps) => {
  
  const [newColor, setNewColor] = useState<string>(color ? color : '#FFFFFF');
  const handlePick = () => {
    onChange(newColor);
  };
  return (
    <Popover
      content={(
        <>
          <SketchPicker
            color={newColor}
            onChangeComplete={(colorResult) => setNewColor(colorResult.hex)}
            presetColors={[...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS]}
          />
          <Button onClick={handlePick} style={{ backgroundColor: newColor, borderColor: newColor }} block>
            <T>pick</T>
          </Button>
        </>
      )}
      triggerOn="click"
      placement="bottom"
      showPopperArrow
    >
      {children ? children : <Input onChange={() => null} value={color} />}
    </Popover>
  );
};
