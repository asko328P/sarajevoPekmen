const PLAYER_SPEED = 5 / 10000000;
const EPSILON = 1 / 100000;

const MovePlayer = (entities: any, infoObj: any) => {
  let playerEntity = entities['player'];
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
      console.log('nema validnih, returnam se');
      playerEntity.nextPosition = previousPosition;
      return entities;
    }
    console.log(
      'prijelaz\n pozicija je: ',
      nextPosition.toString(),
      '\n entities[nextPosition.toString()]: \n',
      entities[nextPosition.toString()]
    );
    playerEntity.nextPosition = entities[nextPosition.toString()].connectedPoints.values().next().value;
    return entities;
  }
  playerEntity.position = [
    (1 - distanceRatio) * position[0] + distanceRatio * nextPosition[0],
    (1 - distanceRatio) * position[1] + distanceRatio * nextPosition[1],
  ];

  return entities;
};

export { MovePlayer };
