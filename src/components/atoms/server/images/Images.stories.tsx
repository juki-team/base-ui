import { action } from 'storybook/actions';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import React from 'react';
import { MockupJukiProvider } from '../../../mockup';

import {
  FlagEnImage,
  FlagEsImage,
  JukiCompleteLaptopImage,
  JukiCouchLogoHorImage,
  JukiCouchLogoVerImage,
  JukiCourtImage,
  JukiHeadImage,
  JukiJudgeLogoHorImage,
  JukiJudgeLogoVerImage,
  JukiLaptopImage,
  JukiSurprisedImage,
  JukiUtilsLogoHorImage,
} from './index';

const meta: Meta<typeof FlagEnImage> = {
  component: FlagEnImage,
};

export default meta;

type Story = StoryObj<typeof FlagEnImage>;

export const Regular: Story = {
  render: (args) => {
    const images = {
      FlagEnImage,
      FlagEsImage,
      JukiCouchLogoHorImage,
      JukiCouchLogoVerImage,
      JukiCompleteLaptopImage,
      JukiHeadImage,
      JukiCourtImage,
      JukiJudgeLogoHorImage,
      JukiJudgeLogoVerImage,
      JukiLaptopImage,
      JukiUtilsLogoHorImage,
      JukiSurprisedImage,
    };
    
    return (
      <MockupJukiProvider>
        <div
          style={{ color: '#164066', backgroundColor: '#F0F2F5' }}
          className="jk-col"
        >
          {Object.entries(images)
            .sort(([ iconName1 ], [ iconName2 ]) =>
              iconName1.localeCompare(iconName2),
            )
            .map(([ iconName, Component ]) => (
              <div className="jk-row nowrap center block">
                <div style={{ width: '200px', height: '200px' }}>
                  <Component />
                </div>
                <div className="tx-t cr-g1" style={{ width: 140 }}>
                  {iconName}
                </div>
              </div>
            ))}
        </div>
      </MockupJukiProvider>
    );
  },
};

Regular.args = {
  onClick: action('onClick'),
};
