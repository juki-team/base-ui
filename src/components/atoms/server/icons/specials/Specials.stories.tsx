import { Meta } from '@storybook/react-webpack5';
import { FC, useState } from 'react';
import { ColorResult } from 'react-color';
import { MockupJukiProvider } from '../../../../mockup';
import { InputColor } from '../../../../molecules';
import { Input } from '../../../inputs/Input';
import { Select } from '../../../Select/Select';
import { SpinIcon } from '../SpinIcon';
import { SpinIconProps } from '../SpinIcon/types';
import { BasicIconProps } from '../types';
import { BalloonIcon, GmailIcon, TelegramIcon } from './index';
import { SortIcon } from './SortIcon';

const meta: Meta<typeof GmailIcon> = {
  component: GmailIcon,
};

export default meta;

export const Regular: FC<BasicIconProps> = (args) => {
  const icons = {
    TelegramIcon,
    GmailIcon,
  };
  
  const [ color, setColor ] = useState<ColorResult>({
    hex: '',
    hsl: { h: 0, s: 0, l: 0 },
    rgb: { r: 0, g: 0, b: 0 },
  });
  const [ percent, setPercent ] = useState<number | undefined>();
  const [ speed, setSpeed ] = useState<SpinIconProps['speed']>('regular');
  
  return (
    <MockupJukiProvider>
      <h3>BalloonIcon</h3>
      <div className="jk-row block gap">
        <div className="jk-row gap extend nowrap">
          <InputColor color={color} onChange={setColor} label="color" />
          <Input
            type="number"
            onChange={setPercent}
            value={percent}
            label="percent"
          />
        </div>
        <div className="jk-row" style={{ color: color.hex }}>
          <BalloonIcon percent={percent} {...args} />
        </div>
      </div>
      <div className="jk-divider" />
      <div className="jk-row block gap">
        {Object.entries(icons)
          .sort(([ iconName1 ], [ iconName2 ]) =>
            iconName1.localeCompare(iconName2),
          )
          .map(([ iconName, Component ]) => (
            <div className="jk-row gap nowrap center">
              <Component {...args} />
              <div className="tx-t cr-g1" style={{ width: 140 }}>
                {iconName}
              </div>
            </div>
          ))}
      </div>
      <div className="jk-divider" />
      <h3>SpinIcon</h3>
      <div className="jk-row block gap">
        <div className="jk-row extend nowrap">
          <Select
            options={[ 'none', 'slow', 'regular', 'fast' ].map((speed) => ({
              label: speed,
              value: speed,
            }))}
            selectedOption={{ value: speed }}
            onChange={({ value }) => setSpeed(value as SpinIconProps['speed'])}
          />
        </div>
        <div className="jk-row" style={{ color: color.hex }}>
          <SpinIcon speed={speed} {...args} />
        </div>
      </div>
      <h3>SortIcon</h3>
      <div className="jk-row block gap">
        <div className="jk-row" style={{ color: color.hex }}>
          <SortIcon {...args} />
        </div>
        <div className="jk-row" style={{ color: color.hex }}>
          <SortIcon {...args} up />
        </div>
        <div className="jk-row" style={{ color: color.hex }}>
          <SortIcon {...args} down />
        </div>
        <div className="jk-row" style={{ color: color.hex }}>
          <SortIcon {...args} up down />
        </div>
      </div>
    </MockupJukiProvider>
  );
};
