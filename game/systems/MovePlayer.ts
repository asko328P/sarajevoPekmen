const PLAYER_SPEED = 1 / 1000000;

const MovePlayer = (entities: any, infoObj: any) => {
  let playerEntity = entities['player'];
  playerEntity.position = [
    playerEntity.position[0] - PLAYER_SPEED * infoObj.time.delta,
    playerEntity.position[1] - PLAYER_SPEED * infoObj.time.delta,
  ];
  return entities;
};

export { MovePlayer };
