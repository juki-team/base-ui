import React, { memo } from 'react';
import { RootIconProps } from '../../types';
import { Segment } from '../../utils';

const Up = memo(({ width, color }: RootIconProps) => {
  return (
    <>
      <Segment start={{ x: 6, y: 14 }} end={{ x: 12 + 0.9, y: 8 }} options={{ width }} fill={color} />
      <Segment start={{ x: 18, y: 14 }} end={{ x: 12 - 0.9, y: 8 }} options={{ width }} fill={color} />
    </>
  );
  // const A = new Vector(7.5, 14.5);
  // const B = new Vector(12, 10);
  // const C = new Vector(16.5, 14.5);
  // const U = B.sub(C).ort().unit().mul(width);
  // const D = C.add(U);
  // const E = B.add(U);
  // const V = B.sub(A).ort().ort().ort().unit().mul(width);
  // const F = B.add(V);
  // const G = A.add(V);
  //
  // return (
  //   <path d={[M(A), L(B), L(C), arc(C, D), L(E), arcS(E, F, 0.3), L(G), arc(G, A), 'z'].join(' ')} fill={color} />
  // );
});

export default Up;
