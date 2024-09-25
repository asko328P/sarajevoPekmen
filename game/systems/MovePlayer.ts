import { angleDifference, calcAngleDegrees } from '~/utility/geometry';

const EPSILON = 1 / 100000;

const MovePlayer = (entities: any, infoObj: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  let playerEntity = entities.player;
  const desiredMovementAngle = playerEntity.desiredMovementAngle;
  const position = playerEntity.position;
  const nextPosition = playerEntity.nextPosition;
  const previousPosition = playerEntity.previousPosition;
  const playerSpeed = playerEntity.playerSpeed;

  const currentMovementAngle = calcAngleDegrees(nextPosition[0] - position[0], nextPosition[1] - position[1]);

  if (angleDifference(desiredMovementAngle, currentMovementAngle) > 90 && currentMovementAngle !== 0) {
    playerEntity.nextPosition = previousPosition;
    playerEntity.previousPosition = nextPosition;
  }

  const distanceBetweenPositions = Math.sqrt(
    (nextPosition[0] - position[0]) * (nextPosition[0] - position[0]) +
      (nextPosition[1] - position[1]) * (nextPosition[1] - position[1])
  );
  //check if the next supposed point on the line would be outside the line,
  //if so, try to find next available point according to the desired movement angle
  const distanceRatio = (playerSpeed / distanceBetweenPositions) * infoObj.time.delta;
  if (distanceRatio < 0 || distanceRatio > 1 || distanceBetweenPositions < EPSILON) {
    playerEntity.position = nextPosition;
    playerEntity.previousPosition = nextPosition;
    //the following should not occur
    if (entities[nextPosition.toString()] === undefined) {
      // console.log('No valids, returning');
      playerEntity.nextPosition = previousPosition;
      return entities;
    }
    let pointClosestToDesiredAngle = entities[nextPosition.toString()].connectedPoints.values().next().value;
    let closestToDesiredAngle = 360;
    //finding point which matches the desired movement angle best
    entities[nextPosition.toString()].connectedPoints.forEach((value: any, key: string) => {
      let tempAngle = angleDifference(
        desiredMovementAngle,
        calcAngleDegrees(
          ((entities[nextPosition.toString()].connectedPoints.get(key)[0] - nextPosition[0]) * Math.PI) / 2.35,
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
  //continue moving the entity along the line
  playerEntity.position = [
    (1 - distanceRatio) * position[0] + distanceRatio * nextPosition[0],
    (1 - distanceRatio) * position[1] + distanceRatio * nextPosition[1],
  ];

  return entities;
};

export { MovePlayer };
