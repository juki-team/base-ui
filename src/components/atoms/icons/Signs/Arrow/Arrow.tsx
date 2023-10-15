import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Arrow = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 6, y: 12.5 }} end={{ x: 12 + 0.8, y: 4.5 }} options={{ width }} fill={color} />
    <Segment start={{ x: 18, y: 12.5 }} end={{ x: 12 - 0.8, y: 4.5 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12, y: 20 }} end={{ x: 12, y: 6 }} options={{ width }} fill={color} />
  </>
));

export default Arrow;
