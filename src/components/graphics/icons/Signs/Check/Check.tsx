import React, { memo } from 'react';
import { Segment } from '../../../utils';
import { RootIconProps } from '../../types';

const Check = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 6, y: 12 }} end={{ x: 10.5, y: 17 }} options={{ width }} fill={color} />
    <Segment start={{ x: 9, y: 17 }} end={{ x: 16, y: 7 }} options={{ width }} fill={color} />
  </>
));

export default Check;