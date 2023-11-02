import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Headline = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 3, y: 12 + width * 3 }} end={{ x: 21, y: 12 + width * 3 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 + width }} end={{ x: 21, y: 12 + width }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 - width }} end={{ x: 21, y: 12 - width }} options={{ width }} fill={color} />
    <Segment start={{ x: 3, y: 12 - width * 3 }} end={{ x: 21, y: 12 - width * 3 }} options={{ width }} fill={color} />
  </>
));

export default Headline;
