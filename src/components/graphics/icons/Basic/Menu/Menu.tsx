import React, { memo } from 'react';
import { Segment } from '../../../utils';
import { RootIconProps } from '../../types';

const Menu = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 3, y: 12 }} end={{ x: 21, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 + width * 2 }} end={{ x: 21, y: 12 + width * 2 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 - width * 2 }} end={{ x: 21, y: 12 - width * 2 }} options={{ width }} fill={color} />
  </>
));

export default Menu;
