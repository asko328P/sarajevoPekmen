const PLAYER_SPEED = 1 / 10000000;
const EPSILON = 1 / 100000;

const MovePlayer = (entities: any, infoObj: any) => {
  let playerEntity = entities['player'];
  let position = playerEntity.position;
  let nextPosition = playerEntity.nextPosition;
  let distanceBetweenPositions = Math.sqrt(
    (nextPosition[0] - position[0]) * (nextPosition[0] - position[0]) +
      (nextPosition[1] - position[1]) * (nextPosition[1] - position[1])
  );
  let distanceRatio = (PLAYER_SPEED / distanceBetweenPositions) * infoObj.time.delta;
  if (distanceRatio < 0 || 1 < distanceRatio || distanceBetweenPositions < EPSILON) {
    return entities;
  }
  playerEntity.position = [
    (1 - distanceRatio) * position[0] + distanceRatio * nextPosition[0],
    (1 - distanceRatio) * position[1] + distanceRatio * nextPosition[1],
  ];

  return entities;
};

export { MovePlayer };
