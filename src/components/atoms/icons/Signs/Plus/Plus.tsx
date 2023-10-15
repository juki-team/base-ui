import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Plus = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 3, y: 12 }} end={{ x: 21, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12, y: 21 }} end={{ x: 12, y: 3 }} options={{ width }} fill={color} />
  </>
));

export default Plus;
