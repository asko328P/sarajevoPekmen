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

function latToMercator(lat: number) {
  const phiRadians = degreesToRadians(lat);
  const phiMercator = Math.log(Math.abs(1 / Math.cos(phiRadians) + Math.tan(phiRadians)));
  const convertedLat = radiansToDegrees(phiMercator);
  return convertedLat;
}

function angle(cx: number, cy: number, ex: number, ey: number) {
  var dy = ey - cy;
  var dx = ex - cx;
  var theta = Math.atan2(dy, dx); // range (-PI, PI]
  theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
  // if (theta < 0) theta = 360 + theta; // range [0, 360)
  return theta;
}

export { calcAngleDegrees, angleDifference, degreesToRadians, radiansToDegrees, getDistance, latToMercator, angle };
