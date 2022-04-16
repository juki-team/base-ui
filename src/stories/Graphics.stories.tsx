import { action, configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';

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
} from '../../packages/base-ui';

export default {
  title: 'Components/General',
  component: FlagEnImage,
  argTypes: {},
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

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
    <div style={{ color: '#164066', backgroundColor: '#F0F2F5' }} className="jk-row nowrap">
      {Object.entries(images).sort(([iconName1], [iconName2]) => iconName1.localeCompare(iconName2)).map(([iconName, Component]) => (
        <div className="jk-row nowrap center">
          <div style={{ width: '200px', height: '200px' }}><Component {...props} /></div>
          <div className="text-xs color-gray-1" style={{ width: 140 }}>{iconName}</div>
        </div>
      ))}
    </div>
  );
};

export const Images = ImagesTemplate.bind({});

Images.args = {
  onClick: action('onClick'),
};
