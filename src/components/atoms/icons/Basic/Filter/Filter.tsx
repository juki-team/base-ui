import React, { memo } from 'react';
import { Segment } from '../../../../graphics/utils';
import { RootIconProps } from '../../types';

const Filter = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 3, y: 12 - width * 2 }} end={{ x: 21, y: 12 - width * 2 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3 + 3, y: 12 }} end={{ x: 21 - 3, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3 + 6, y: 12 + width * 2 }} end={{ x: 21 - 6, y: 12 + width * 2 }} options={{ width }} fill={color} />
  </>
));

export default Filter;
