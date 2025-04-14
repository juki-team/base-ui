import React, { memo } from 'react';
import { RootIconProps } from '../../../server/icons/types';
import { Segment } from '../../../server/icons/utils';

const Menu = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 3, y: 12 }} end={{ x: 21, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 + width * 2 }} end={{ x: 21, y: 12 + width * 2 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 - width * 2 }} end={{ x: 21, y: 12 - width * 2 }} options={{ width }} fill={color} />
  </>
));

export default Menu;
