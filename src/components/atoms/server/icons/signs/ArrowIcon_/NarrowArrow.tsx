import { memo } from 'react';
import type { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const NarrowArrow = memo(({ width, color }: RootIconProps) => (
  <>
    <Segment start={{ x: 7, y: 12 }} end={{ x: 12 + 0.8, y: 6 }} options={{ width }} fill={color} />
    <Segment start={{ x: 17, y: 12 }} end={{ x: 12 - 0.8, y: 6 }} options={{ width }} fill={color} />
    <Segment start={{ x: 12, y: 18 }} end={{ x: 12, y: 6 }} options={{ width }} fill={color} />
  </>
));

export default NarrowArrow;
