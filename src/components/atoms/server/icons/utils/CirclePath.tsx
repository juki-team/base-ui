import { Vector } from './Vector';

interface CirclePathProps {
  center: Vector | { x: number, y: number },
  radio: number,
  fill?: string,
  stroke?: string,
  strokeWidth?: number
}

// https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
export const CirclePath = ({ center: { x: cx, y: cy }, radio, fill, stroke, strokeWidth }: CirclePathProps) => { // width = 2
  return (
    <path
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      d={`M ${cx - radio}, ${cy} a ${radio},${radio} 0 1,0 ${radio * 2},0 a ${radio},${radio} 0 1,0 -${radio * 2},0`}
    />
  );
};
