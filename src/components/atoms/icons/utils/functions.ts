import { Vector } from './Vector';

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
                    }: Vector | { x: number, y: number }, options?: {
  width?: number,
  rounded?: boolean,
  clockwise?: boolean
}): string => {
  
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
