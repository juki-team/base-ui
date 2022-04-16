import React, { memo } from 'react';
import { Segment } from '../../../utils';
import { RootIconProps } from '../../types';

const Plus = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 6, y: 12 }} end={{ x: 18, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12, y: 18 }} end={{ x: 12, y: 6 }} options={{ width }} fill={color} />
  </>
));

export default Plus;
