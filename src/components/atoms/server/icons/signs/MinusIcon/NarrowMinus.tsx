import { memo } from 'react';
import type { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Minus = memo(({ color, width }: RootIconProps) => (
  <Segment start={{ x: 6, y: 12 }} end={{ x: 18, y: 12 }} options={{ width }} fill={color} />
));

export default Minus;
