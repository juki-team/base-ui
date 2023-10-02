import { configureActions } from '@storybook/addon-actions';
import { Story } from '@storybook/react';
import React from 'react';
import { PlacesType } from 'react-tooltip';
import { Button, Tooltip as TooltipCmp, TooltipProps } from '../../index';
import { ToggleThemeButton } from '../ToggleThemeButton';

export default {
  title: 'Components/General',
  component: Button,
};

configureActions({
  depth: 100,
  // Limit the number of items logged into the actions panel
  limit: 20,
});

const Template: Story<TooltipProps> = (args) => {
  return (
    <div className="jk-row gap jk-pad-lg">
      {([
        'top',
        'top-start',
        'top-end',
        'right',
        'right-start',
        'right-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
      ] as PlacesType[]).map((placement) => (
        <div className="jk-pad-lg">
          <div className="jk-pad-lg">
            <TooltipCmp
              content={(
                <div>hi!
                  <button>test</button>
                </div>
              )}
              placement={placement}
            >
              <div className="jk-tag">{placement}</div>
            </TooltipCmp>
          </div>
        </div>
      ))}
      <ToggleThemeButton />
    </div>
  );
};

export const Tooltip = Template.bind({});

Tooltip.args = {};
