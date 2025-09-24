import { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const DoubleUp = memo(({ width, color }: RootIconProps) => {
  return (
    <>
      <Segment start={{ x: 6, y: 11.5 }} end={{ x: 12 + 0.9, y: 5.5 }} options={{ width }} fill={color} />
      <Segment start={{ x: 18, y: 11.5 }} end={{ x: 12 - 0.9, y: 5.5 }} options={{ width }} fill={color} />
      <Segment start={{ x: 6, y: 16.5 }} end={{ x: 12 + 0.9, y: 10.5 }} options={{ width }} fill={color} />
      <Segment start={{ x: 18, y: 16.5 }} end={{ x: 12 - 0.9, y: 10.5 }} options={{ width }} fill={color} />
    </>
  );
});

export default DoubleUp;
