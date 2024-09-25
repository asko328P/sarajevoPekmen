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

function radiansToDegrees(radians: number) {
  var pi = Math.PI;
  return radians * (180 / pi);
}

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  return Math.sqrt((lat1 - lat2) * (lat1 - lat2) + (lon1 - lon2) * (lon1 - lon2));
}

export { calcAngleDegrees, angleDifference, degreesToRadians, radiansToDegrees, getDistance };
