import React from 'react';
import { BasicIconProps, RootIconProps } from '../types';
import { renderBasicIcon } from '../utils';

const Icon = ({ color }: RootIconProps) => (
  <path
    d="M17 17q.625 0 1.062-.438.438-.437.438-1.062t-.438-1.062Q17.625 14 17 14t-1.062.438q-.438.437-.438 1.062t.438 1.062Q16.375 17 17 17Zm0 3q.775 0 1.425-.363.65-.362 1.05-.962-.55-.325-1.175-.5T17 18q-.675 0-1.3.175t-1.175.5q.4.6 1.05.962Q16.225 20 17 20Zm-5 2q-3.475-.875-5.737-3.988Q4 14.9 4 11.1V5l8-3 8 3v5.675q-.475-.2-.975-.363-.5-.162-1.025-.237V6.4l-6-2.25L6 6.4v4.7q0 1.175.312 2.35.313 1.175.876 2.238.562 1.062 1.362 1.962.8.9 1.775 1.5.275.8.725 1.525.45.725 1.025 1.3-.025 0-.037.013Q12.025 22 12 22Zm5 0q-2.075 0-3.537-1.462Q12 19.075 12 17q0-2.075 1.463-3.538Q14.925 12 17 12t3.538 1.462Q22 14.925 22 17q0 2.075-1.462 3.538Q19.075 22 17 22Zm-5-10.35Z"
    fill={color}
  />
);

export const AdminPanelSettingsIcon = (props: BasicIconProps) => {
  return renderBasicIcon(props, Icon, 'admin-panel-settings');
};
