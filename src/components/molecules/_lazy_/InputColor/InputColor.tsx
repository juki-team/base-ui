import { PALLETE } from '@juki-team/commons';
import { type ColorResult, SketchPicker } from 'react-color';
import { TriggerAction } from '../../../../enums';
import { Input, Popover } from '../../../atoms';
import type { InputColorProps } from './types';

const DEFAULT_COLOR: ColorResult = {
  hex: '#000000',
  rgb: { a: 1, b: 0, g: 0, r: 0 },
  hsl: { a: 1, h: 0, l: 0, s: 0 },
};

const hexToRgb = (hex: string): { r: number; g: number; b: number; a: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  return {
    r: parseInt(result[1]!, 16),
    g: parseInt(result[2]!, 16),
    b: parseInt(result[3]!, 16),
    a: 1,
  };
};

const rgbToHsl = (r: number, g: number, b: number): { h: number; s: number; l: number; a: number } => {
  r /= 255;
  g /= 255;
  b /= 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) / 100,
    l: Math.round(l * 100) / 100,
    a: 1,
  };
};

const valueToColorResult = (value: string | ColorResult | undefined): ColorResult => {
  if (!value) {
    return DEFAULT_COLOR;
  }
  
  if (typeof value === 'string') {
    const rgb = hexToRgb(value);
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const hexValue = value.startsWith('#') ? value : `#${value}`;
    return {
      hex: hexValue.toUpperCase(),
      rgb,
      hsl,
    };
  }
  
  return value;
};

export default function InputColor({ value, children, onChange, ...inputProps }: InputColorProps) {
  
  const newColor = typeof value === 'string' ? value : value?.hex;
  
  return (
    <Input
      {...inputProps}
      register={undefined}
      type="text"
      onChange={newValue => {
        onChange?.(valueToColorResult(newValue));
      }}
      value={newColor}
      onClick={(e) => e.preventDefault()}
    >
      <Popover
        popoverClassName="bc-we jk-br-ie elevation-1"
        content={() => (
          <div className="color-picker-layout jk-pg-xsm">
            <SketchPicker
              color={newColor}
              onChangeComplete={(colorResult) => onChange?.(valueToColorResult(colorResult))}
              presetColors={[ ...PALLETE.CLAROS, ...PALLETE.VIVOS, ...PALLETE.AGRISADOS, ...PALLETE.OSCUROS ]}
            />
            {/*<Button*/}
            {/*  onClick={() => {*/}
            {/*    handlePick();*/}
            {/*    onClose();*/}
            {/*  }}*/}
            {/*  expand*/}
            {/*  size="small"*/}
            {/*>*/}
            {/*  <T className="tt-se">pick</T>*/}
            {/*</Button>*/}
          </div>
        )}
        triggerOn={TriggerAction.CLICK}
        placement="bottom"
      >
        {children
          ? children
          : (
            <div
              style={{
                width: 'calc(var(--tx-bh) - 4px)',
                height: 'calc(var(--tx-bh) - 4px)',
                borderRadius: '4px',
                backgroundColor: newColor,
                border: '1px solid rgba(0, 0, 0, 0.2)',
                margin: 2,
                zIndex: 1,
              }}
            />
          )}
      </Popover>
    </Input>
  );
}
