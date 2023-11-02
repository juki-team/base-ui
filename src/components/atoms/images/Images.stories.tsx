import { action } from '@storybook/addon-actions';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { MockupJukiProvider } from '../../mockup';

import {
  FlagEnImage,
  FlagEsImage,
  ImageProps,
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
} from './';

const meta: Meta<typeof FlagEnImage> = {
  component: FlagEnImage,
};

export default meta;

const ImagesTemplate: Story<ImageProps> = (props) => {
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
      <div style={{ color: '#164066', backgroundColor: '#F0F2F5' }} className="jk-col">
        {Object.entries(images)
          .sort(([ iconName1 ], [ iconName2 ]) => iconName1.localeCompare(iconName2))
          .map(([ iconName, Component ]) => (
            <div className="jk-row nowrap center block">
              <div style={{ width: '200px', height: '200px' }}><Component {...props} /></div>
              <div className="tx-t cr-g1" style={{ width: 140 }}>{iconName}</div>
            </div>
          ))}
      </div>
    </MockupJukiProvider>
  );
};

export const Images = ImagesTemplate.bind({});

Images.args = {
  onClick: action('onClick'),
};
