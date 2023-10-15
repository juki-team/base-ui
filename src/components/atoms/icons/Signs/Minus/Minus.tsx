import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Minus = memo(({ color, width }: RootIconProps) => (
  <Segment start={{ x: 4, y: 12 }} end={{ x: 20, y: 12 }} options={{ width }} fill={color} />
));

export default Minus;
