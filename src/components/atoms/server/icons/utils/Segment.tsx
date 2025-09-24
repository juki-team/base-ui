import { arc, L, M } from './functions';
import { Vector } from './Vector';

interface SegmentProps {
  start: Vector | { x: number, y: number },
  end: Vector | { x: number, y: number },
  options?: { width?: number, roundWidth?: number },
  fill?: string,
}

export const Segment = (props: SegmentProps) => {
  
  const {
    start: { x: sx, y: sy },
    end: { x: ex, y: ey },
    fill = 'currentColor',
    options: { width = 2, roundWidth = 1 } = {},
  } = props;
  
  const start = new Vector(sx, sy);
  const end = new Vector(ex, ey);
  const v = end.sub(start);
  const vp = start.sub(end);
  const up = vp.ort();
  const down = v.ort();
  
  const C1 = start.add(v.unit().mul(roundWidth));
  const A = C1.add(up.unit().mul(width / 2));
  const D = C1.add(down.unit().mul(width / 2));
  
  const C2 = end.add(vp.unit().mul(roundWidth));
  const B = C2.add(up.unit().mul(width / 2));
  const C = C2.add(down.unit().mul(width / 2));
  
  return (
    <path
      fill={fill}
      d={[
        M(A), L(B), arc(B, C, { width: roundWidth, rounded: true, clockwise: false }),
        L(D), arc(D, A, { width: roundWidth, rounded: true, clockwise: false }),
        'Z',
      ].join(' ')}
    />
  );
};
