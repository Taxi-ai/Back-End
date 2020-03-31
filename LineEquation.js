const Node = require("./_Node");

class LineEquation {
  constructor(firstPoint, secondPoint) {
    this._firstPoint = firstPoint;
    this._secondPoint = secondPoint;
    this._slope = {
      numerator: this._secondPoint.y - this._firstPoint.y,
      denominator: this._secondPoint.x - this._firstPoint.x,
      value:
        (this._secondPoint.y - this._firstPoint.y) /
        (this._secondPoint.x - this._firstPoint.x)
    };
    this._intercept =
      this._firstPoint.y - this._slope.value * this._firstPoint.x;
  }

  get FirstPoint() {
    return this._firstPoint;
  }
  get SecondPoint() {
    return this._secondPoint;
  }
  EquationResult(point) {
    // y = mx + b
    // m --> slope
    // b --> intercept
    return Math.abs(
      Math.floor(point.y - this._intercept - this._slope.value * point.x)
    );
  }
  PrintEquation() {
    return `Y = ${this._slope.numerator} / ${this._slope.denominator} * X + ${this._intercept}`;
  }
}

const n1 = new Node("A", 12, 210);
const n2 = new Node("B", 80, 185);
const n3 = new Node("B", 80, 185);
const n4 = new Node("B", 110, 130);

const userLocation = new Node("", 50, 250);

const lineEquation1 = new LineEquation(n1, n2);
const lineEquation2 = new LineEquation(n3, n4);

console.log(lineEquation1.PrintEquation());
console.log(lineEquation2.PrintEquation());
console.log(lineEquation1.EquationResult(userLocation));
console.log(lineEquation2.EquationResult(userLocation));
