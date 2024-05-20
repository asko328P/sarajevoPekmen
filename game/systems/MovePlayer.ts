import { angleDifference, calcAngleDegrees } from '~/utility/geometry';

const PLAYER_SPEED = 40 / 10000000;
const EPSILON = 1 / 100000;

const MovePlayer = (entities: any, infoObj: any) => {
  let playerEntity = entities['player'];
  const desiredMovementAngle = playerEntity.desiredMovementAngle;
  const position = playerEntity.position;
  const nextPosition = playerEntity.nextPosition;
  const previousPosition = playerEntity.previousPosition;

  const distanceBetweenPositions = Math.sqrt(
    (nextPosition[0] - position[0]) * (nextPosition[0] - position[0]) +
      (nextPosition[1] - position[1]) * (nextPosition[1] - position[1])
  );
  const distanceRatio = (PLAYER_SPEED / distanceBetweenPositions) * infoObj.time.delta;
  if (distanceRatio < 0 || distanceRatio > 1 || distanceBetweenPositions < EPSILON) {
    playerEntity.position = nextPosition;
    playerEntity.previousPosition = nextPosition;
    if (entities[nextPosition.toString()] === undefined) {
      console.log('No valids, returning');
      playerEntity.nextPosition = previousPosition;
      return entities;
    }
    let pointClosestToDesiredAngle = entities[nextPosition.toString()].connectedPoints.values().next().value;
    let closestToDesiredAngle = 360;
    entities[nextPosition.toString()].connectedPoints.forEach((value: any, key: string) => {
      let tempAngle = angleDifference(
        desiredMovementAngle,
        calcAngleDegrees(
          entities[nextPosition.toString()].connectedPoints.get(key)[0] - nextPosition[0],
          entities[nextPosition.toString()].connectedPoints.get(key)[1] - nextPosition[1]
        )
      );
      if (tempAngle < closestToDesiredAngle) {
        pointClosestToDesiredAngle = entities[nextPosition.toString()].connectedPoints.get(key);
        closestToDesiredAngle = tempAngle;
      }
    });
    playerEntity.position = nextPosition;
    playerEntity.nextPosition = pointClosestToDesiredAngle;

    return entities;
  }
  playerEntity.position = [
    (1 - distanceRatio) * position[0] + distanceRatio * nextPosition[0],
    (1 - distanceRatio) * position[1] + distanceRatio * nextPosition[1],
  ];

  return entities;
};

export { MovePlayer };
