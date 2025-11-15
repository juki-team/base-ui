import { PALLETE } from '@juki-team/commons';
import { useState } from 'react';
import { type ColorResult, SketchPicker } from 'react-color';
import { TriggerAction } from '../../../../enums';
import { Button, Input, Popover, T } from '../../../atoms';
import type { InputColorProps } from './types';

export default function InputColor({ value, children, onChange, ...inputProps }: InputColorProps) {
  
  const [ newColor, setNewColor ] = useState<ColorResult>(value
    ? (
      typeof value === 'string'
        ? {
          hex: value,
          rgb: { a: 1, b: 0, g: 0, r: 0 },
          hsl: { a: 1, h: 240, l: 0, s: 0 },
        } : value
    )
    : {
      hex: '#000000',
      rgb: { a: 1, b: 0, g: 0, r: 0 },
      hsl: { a: 1, h: 240, l: 0, s: 0 },
    });
  
  const handlePick = () => { // color ? color : '#FFFFFF'
    if (newColor) {
      onChange?.(newColor);
    }
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
            <T className="tt-se">pick</T>
          </Button>
        </div>
      )}
      triggerOn={TriggerAction.CLICK}
      placement="bottom"
      // showPopperArrow
    >
      {children
        ? children
        : (
          <span>
            <Input
              {...inputProps}
              register={undefined}
              type="color"
              onChange={() => null}
              value={typeof value === 'string' ? value : (value?.hex || '')}
              onClick={(e) => e.preventDefault()}
            />
          </span>
        )}
    </Popover>
  );
}
