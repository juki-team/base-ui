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
