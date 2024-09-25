import { angleDifference, calcAngleDegrees, degreesToRadians, getDistance, radiansToDegrees } from '~/utility/geometry';
import { DELTA } from '~/services/overpassApi';

const EPSILON = 0.001;

export const DistanceChecker = (entities: any, infoObj: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  let playerEntity = entities.player;
  const position = playerEntity.position;
  const startingPosition = playerEntity.startingPosition;
  if (getDistance(position[1], position[0], startingPosition[1], startingPosition[0]) > DELTA / 2.5) {
    playerEntity.startingPosition = position;
    let latRadian = degreesToRadians(position[1]);
    latRadian = Math.acos((2 * Math.pow(Math.E, latRadian)) / (Math.pow(Math.E, 2 * latRadian) + 1));
    let latDegree = radiansToDegrees(latRadian);

    infoObj.dispatch({ type: 'newPosition', newPosition: [latDegree, position[0]], playerEntity });
  }

  return entities;
};
