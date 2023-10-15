import React, { memo } from 'react';
import { Segment } from '../../../../graphics/utils';
import { RootIconProps } from '../../types';

const Minus = memo(({ color, width }: RootIconProps) => (
  <Segment start={{ x: 6, y: 12 }} end={{ x: 18, y: 12 }} options={{ width }} fill={color} />
));

export default Minus;
