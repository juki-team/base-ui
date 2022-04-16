import React from 'react';

export class Vector {
  x = 0;
  y = 0;
  
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
  
  add(a: Vector) {
    return new Vector(this.x + a.x, this.y + a.y);
  }
  
  sub(a: Vector) {
    return new Vector(this.x - a.x, this.y - a.y);
  }
  
  mul(k: number) {
    return new Vector(this.x * k, this.y * k);
  }
  
  prod(a: Vector) {
    return this.x * a.x + this.y * a.y;
  }
  
  div(k: number) {
    return new Vector(this.x / k, this.y / k);
  }
  
  _mod2 = null;
  
  mod2() {
    return this._mod2 ?? this.prod(this);
  }
  
  _mod = null;
  
  mod() {
    return this._mod ?? Math.sqrt(this.mod2());
  }
  
  _unit = null;
  
  unit() {
    return this._unit ?? this.div(this.mod());
  }
  
  _ort = null;
  
  ort() { // rotate 90 deg right hand
    return this._ort ?? new Vector(-this.y, this.x);
  }
}

export const arcS = ({ x: p1x, y: p1y }: Vector | { x: number, y: number }, {
  x: p2x,
  y: p2y,
}: Vector | { x: number, y: number }, k = 0.5) => {
  
  const P1 = new Vector(p1x, p1y);
  const P2 = new Vector(p2x, p2y);
  const V = P2.sub(P1);
  const l = V.mod();
  const C = P1.add(V.unit().mul(l / 2));
  const O = V.ort().unit();
  const D = C.add(O.mul(l * k));
  const A1 = D.add(P1.sub(P2).unit().mul(l / 2 * k));
  const A2 = D.add(V.unit().mul(l / 2 * k));
  
  return `C ${A1.x},${A1.y} ${A2.x},${A2.y} ${P2.x},${P2.y}`;
};

export const M = ({ x, y }: { x: number, y: number } | Vector) => { // move to point without a draw
  return `M ${x},${y}`;
};

export const H = (x: number) => { // draw a line
  return `H ${x}`;
};

export const V = (y: number) => { // draw a line
  return `V ${y}`;
};

export const L = ({ x, y }: { x: number, y: number } | Vector) => { // draw a line
  return `L ${x},${y}`;
};

export const cLB = () => { // Curve left bottom // svg: left top
  return 'c -0.5,0  -1,-0.5 -1,-1';
};

export const cBR = () => { // Curve bottom right // svg: top right
  return 'c 0,-0.5 0.5,-1 1,-1';
};

export const cRT = () => { // Curve right top // svg: right bottom
  return 'c 0.5,0 1,0.5 1,1';
};

export const cTL = () => { // Curve top left // svg: bottom left
  return 'c 0,0.5 -0.5,1 -1,1';
};

export const arc = ({
  x: p1x,
  y: p1y,
}: Vector | { x: number, y: number }, {
  x: p2x,
  y: p2y,
}: Vector | { x: number, y: number }, options?: { width?: number, rounded?: boolean, clockwise?: boolean }): string => {
  
  const P1 = new Vector(p1x, p1y);
  const P2 = new Vector(p2x, p2y);
  const { width = P2.sub(P1).mod() / 2, rounded = true, clockwise = true } = options || {};
  
  const v = P2.sub(P1);
  const vp = P1.sub(P2);
  const ort = clockwise ? v.ort() : vp.ort();
  const d = v.mod();
  
  const C = P1.add(v.unit().mul(d / 2));
  const D = C.add(ort.unit().mul(width));
  
  const A1 = P1.add(ort.unit().mul(width / 2));
  const B1 = P2.add(ort.unit().mul(width / 2));
  
  if (rounded) {
    const s = d / 4;
    const A2 = D.add(vp.unit().mul(s));
    const B2 = D.add(v.unit().mul(s));
    return `C ${A1.x},${A1.y} ${A2.x},${A2.y} ${D.x},${D.y} C ${B2.x},${B2.y} ${B1.x},${B1.y} ${P2.x},${P2.y}`;
  }
  const s1 = d / 2 - width / 2;
  const A2 = D.add(vp.unit().mul(s1));
  const B2 = D.add(v.unit().mul(s1));
  
  const s2 = d / 2 - width;
  const A3 = D.add(vp.unit().mul(s2));
  const B3 = D.add(v.unit().mul(s2));
  
  return `C ${A1.x},${A1.y} ${A2.x},${A2.y} ${A3.x},${A3.y} ${L(B3)} C ${B2.x},${B2.y} ${B1.x},${B1.y} ${P2.x},${P2.y}`;
};

interface SegmentProps {
  start: Vector | { x: number, y: number },
  end: Vector | { x: number, y: number },
  options?: { width?: number, roundWidth?: number },
  fill?: string,
}

export const Segment = ({
  start: { x: sx, y: sy },
  end: { x: ex, y: ey },
  fill = 'currentColor',
  options: { width = 2, roundWidth = 1 } = {},
}: SegmentProps) => {
  
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

export const CircleFrame = ({ width = 2 }: { width?: number }) => {
  return <circle cx="12" cy="12" r={10 - width / 2} fill="none" strokeWidth={width} stroke="currentColor" />;
};

export const SquareFrame = ({ width = 2 }: { width?: number }) => {
  return (
    <rect
      x={2 + width / 2}
      y={2 + width / 2}
      width={20 - width}
      height={20 - width}
      fill="none"
      strokeWidth={width}
      stroke="currentColor"
      rx={width / 4}
      ry={width / 4}
    />
  );
};

export const SquareFilledFrame = () => { // width = 2
                                         // const  k = (2 - Math.sqrt(2)) / Math.sqrt(8);
  const k = 0.4;
  return (
    <path
      fill="currentColor"
      strokeWidth="0"
      stroke="currentColor"
      d={[
        M({ x: 2, y: 20 }),
        arcS({ x: 2, y: 20 }, { x: 4, y: 22 }, k),
        H(20),
        arcS({ x: 20, y: 22 }, { x: 22, y: 20 }, k),
        V(4),
        arcS({ x: 22, y: 4 }, { x: 20, y: 2 }, k),
        H(4),
        arcS({ x: 4, y: 2 }, { x: 2, y: 4 }, k),
        'Z',
      ].join(' ')} />
  );
};

// https://www.smashingmagazine.com/2019/03/svg-circle-decomposition-paths/
export const CirclePath = ({
  center: { x: cx, y: cy },
  radio,
  fill,
  stroke,
  strokeWidth,
}: { center: Vector | { x: number, y: number }, radio: number, fill?: string, stroke?: string, strokeWidth?: number }) => { // width = 2
  return (
    <path
      fill={fill}
      stroke={stroke}
      strokeWidth={strokeWidth}
      d={`M ${cx - radio}, ${cy} a ${radio},${radio} 0 1,0 ${radio * 2},0 a ${radio},${radio} 0 1,0 -${radio * 2},0`}
    />
  );
};

export const CircleFilledFrame = () => { // width = 2
  return <CirclePath center={{ x: 12, y: 12 }} radio={10} />;
  // return (
  //   <path
  //     // d="M (CX - R), CY      a R,R 0 1,0 (R * 2),0      a R,R 0 1,0 -(R * 2),0    "
  //     d="M 2, 12 a 10,10 0 1,0 20,0 a 10,10 0 1,0 -20,0"
  //   />
  // );
};