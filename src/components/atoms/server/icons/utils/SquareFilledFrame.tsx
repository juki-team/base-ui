import { arcS, H, M, V } from './functions';

interface SquareFilledFrameProps {
  cx?: number,
  cy?: number,
  strokeWidth?: number,
  sizeBox?: number,
}

export const SquareFilledFrame = ({ cx = 0, cy = 0, strokeWidth = 2, sizeBox = 24 }: SquareFilledFrameProps) => { // width = 2
  // const  k = (2 - Math.sqrt(2)) / Math.sqrt(8);
  
  const start = 2;
  const scaleStart = (sizeBox * start / 24);
  // const centerX = cx + sizeBox / 2;
  // const centerY = cy + sizeBox / 2;
  
  // const  k = (2 - Math.sqrt(2)) / Math.sqrt(8);
  const k = 0.4;
  const a = sizeBox - scaleStart;
  const b = a - scaleStart;
  
  return (
    <path
      fill="currentColor"
      strokeWidth="0"
      stroke="currentColor"
      d={[
        M({ x: cx, y: cy + b }),
        arcS({ x: cx + strokeWidth / 2, y: cy + b }, { x: cx + scaleStart * 2, y: cy + a }, k),
        H(cx + b),
        arcS({ x: cx + b, y: cy + a }, { x: cx + a, y: cy + b }, k),
        V(cy + scaleStart * 2),
        arcS({ x: cx + a, y: cy + scaleStart * 2 }, { x: cx + b, y: cy + scaleStart }, k),
        H(cx + scaleStart * 2),
        arcS({ x: cx + scaleStart * 2, y: cy + scaleStart }, { x: cx + strokeWidth / 2, y: cy + scaleStart * 2 }, k),
        'Z',
      ].join(' ')}
    />
  );
};
// const sizeBox = widthBox / 2;
// const lineWidth = 2; // [1,24]
// const scaleLineWidth = (widthBox * lineWidth / 24);
// const start = 2;
// const scaleStart = (widthBox * start / 24);
// const centerX = minX + widthBox / 2;
// const centerY = minY + widthBox / 2;

// <path
//   fill="currentColor"
//   strokeWidth="0"
//   stroke="currentColor"
//   d={[
//     M({ x: minX + scaleStart, y: minY + b }),
//     arcS({ x: minX + scaleStart, y: minY + b }, { x: minX + scaleStart * 2, y: minY + a }, k),
//     H(minX + b),
//     arcS({ x: minX + b, y: minY + a }, { x: minX + a, y: minY + b }, k),
//     V(minY + scaleStart * 2),
//     arcS({ x: minX + a, y: minY + scaleStart * 2 }, { x: minX + b, y: minY + scaleStart }, k),
//     H(minX + scaleStart * 2),
//     arcS({ x: minX + scaleStart * 2, y: minY + scaleStart }, {
//       x: minX + scaleStart,
//       y: minY + scaleStart * 2,
//     }, k),
//     'Z',
//   ].join(' ')}
// />
