import React, { memo } from 'react';
import { CirclePath, Segment } from '../../../../graphics/utils';
import { RootIconProps } from '../../types';

const List = memo(({ width, color }: RootIconProps) => (
  <>
    <CirclePath center={{ x: 3 + width * 0.5, y: 12 + width * 2 }} radio={width * 0.5} fill={color} />
    <CirclePath center={{ x: 3 + width * 0.5, y: 12 }} radio={width * 0.5} fill={color} />
    <CirclePath center={{ x: 3 + width * 0.5, y: 12 - width * 2 }} radio={width * 0.5} fill={color} />
    
    <Segment start={{ x: 3 + width + width / 2, y: 12 }} end={{ x: 21, y: 12 }} options={{ width }} fill={color} />
    <Segment start={{ x: 3 + width + width / 2, y: 12 + width * 2 }} end={{ x: 21, y: 12 + width * 2 }} options={{ width }}
             fill={color} />
    <Segment start={{ x: 3 + width + width / 2, y: 12 - width * 2 }} end={{ x: 21, y: 12 - width * 2 }} options={{ width }}
             fill={color} />
  </>
));

export default List;
