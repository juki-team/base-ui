import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { CirclePath, Segment } from '../../utils';

const Exclamation = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 12, y: 6 }} end={{ x: 12, y: 14 }} options={{ width }} fill={color} />
    <CirclePath center={{ x: 12, y: 16.5 }} radio={1.5} fill={color} />
  </>
));

export default Exclamation;