import { configureActions } from 'storybook/actions';
import React, { FC } from 'react';
import { MockupToggleThemeButton } from '../../../../mockup/MockupToggleThemeButton';
import { SignIconProps } from '../types';

import { ArrowIcon, CheckIcon_, CloseIcon_, DoubleUpIcon, ExclamationIcon, MinusIcon, PlusIcon, UpIcon } from './';

export default {
  title: 'Components/General/Icons',
  argTypes: {
    color: { control: { type: 'color' } },
    size: {
      options: [ 'huge', 'large', 'regular', 'small', 'tiny' ],
      control: {
        type: 'select',
        labels: {
          huge: 'huge (48px)', // 12
          large: 'large (36px)', // 12
          regular: 'regular (24px)', // 6
          small: 'small (18px)', // 6
          tiny: 'tiny (12px)',
        },
      },
    },
    circle: { control: { type: 'boolean' } },
    square: { control: { type: 'boolean' } },
    filledCircle: { control: { type: 'boolean' } },
    filledSquare: { control: { type: 'boolean' } },
    rotate: { control: { type: 'number', value: 0 } },
    onClick: {},
    style: {},
    className: { control: { type: 'text' } },
  },
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

export const Signs: FC<SignIconProps & { color: string }> = ({
                                                               color,
                                                               ...props
                                                             }) => {
  const icons = {
    ArrowIcon,
    ExclamationIcon,
    MinusIcon,
    PlusIcon,
    UpIcon_: UpIcon,
    CloseIcon_,
    DoubleUpIcon,
    CheckIcon_,
  };
  
  return (
    <div className="jk-row block gap" style={{ color }}>
      {Object.entries(icons)
        .sort(([ iconName1 ], [ iconName2 ]) => iconName1.localeCompare(iconName2))
        .map(([ iconName, Component ]) => (
          <div className="jk-row  nowrap center">
            <Component {...props} />
            <div className="tx-t cr-g1" style={{ width: 140 }}>
              {iconName}
            </div>
          </div>
        ))}
      <MockupToggleThemeButton />
    </div>
  );
};
