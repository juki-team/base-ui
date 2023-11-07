import React, { useState } from 'react';
import { MockupJukiProvider } from '../../mockup';
import { Color, InputColor as ColorPickerComponent } from './';

export default {
  component: ColorPickerComponent,
};

export const InputColor = () => {
  
  const [ color, setColor ] = useState<Color>();
  
  return (
    <MockupJukiProvider>
      <div>
        <ColorPickerComponent
          color={color}
          onChange={color => {
            console.info(color);
            setColor(color);
          }}
        />
      </div>
    </MockupJukiProvider>
  );
};
