function calcAngleDegrees(x: number, y: number): number {
  return (Math.atan2(y, x) * 180) / Math.PI;
}

function angleDifference(a: number, b: number) {
  const difference = Math.abs(a - b);
  return difference > 180 ? 360 - difference : difference;
}

function degreesToRadians(degrees: number) {
  const pi = Math.PI;
  return degrees * (pi / 180);
}

export { calcAngleDegrees, angleDifference, degreesToRadians };
