import { useState } from 'react';
import { MockupJukiProvider } from '../../../mockup';
import { InputColor as ColorPickerComponent } from './';
import { Color } from './types';

export default {
  component: ColorPickerComponent,
};

export const InputColor = () => {
  const [ color, setColor ] = useState<Color>();
  
  return (
    <MockupJukiProvider>
      <div className="jk-row">
        <ColorPickerComponent
          label="color"
          labelPlacement="left"
          color={color}
          onChange={(color) => {
            console.info(color);
            setColor(color);
          }}
        />
      </div>
    </MockupJukiProvider>
  );
};
