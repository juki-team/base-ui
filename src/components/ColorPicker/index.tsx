import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { PALLETE } from '../../config/constants';
import { Button, Input, Popover, T } from '../index';
import { ColorPickerProps } from './types';

export const ColorPicker = ({ color, children, onChange }: ColorPickerProps) => {
  
  const [newColor, setNewColor] = useState<string>(color ? color : '#FFFFFF');
  const handlePick = () => {
    onChange?.(newColor);
  };
  
  return (
    <Popover
      content={(
        <div className="jk-pad-sm color-picker-layout">
          <SketchPicker
            color={newColor}
            onChangeComplete={(colorResult) => setNewColor(colorResult.hex)}
            presetColors={[...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS]}
          />
          <Button onClick={handlePick} style={{ backgroundColor: newColor, borderColor: newColor }} block size="small">
            <T>pick</T>
          </Button>
        </div>
      )}
      triggerOn="click"
      placement="bottom"
    >
      {children ? children : <Input onChange={() => null} value={color} />}
    </Popover>
  );
};
