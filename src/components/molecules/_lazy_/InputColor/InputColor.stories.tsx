import { useState } from 'react';
import { MockupJukiProvider } from '../../../mockup';
import { InputColor as ColorPickerComponent } from './';

export default {
  component: ColorPickerComponent,
};

export const InputColor = () => {
  const [ color, setColor ] = useState<string>();
  
  return (
    <MockupJukiProvider>
      <div className="jk-row">
        {color}
        <ColorPickerComponent
          label="color"
          labelPlacement="left"
          value={color}
          onChange={(color) => {
            console.info(color);
            setColor(color?.hex);
          }}
        />
      </div>
    </MockupJukiProvider>
  );
};
