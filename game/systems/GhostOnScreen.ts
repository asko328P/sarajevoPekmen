//@ts-nocheck
const GhostOnScreen = (windowWidth: number, windowHeight: number) => (entities: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities['player'];

  for (const [entityKey, entityValue] of Object.entries(entities)) {
    if (entityValue.position && entityValue.x && entityValue.y && entityKey !== 'player') {
      // console.log(entityValue.position);
      // entityValue.x = 100;
      // entityValue.y = 100;
      entityValue.x = -(playerEntity.position[0] - entityValue.position[0]) * playerEntity.zoomLevel + windowWidth / 2;
      entityValue.y = (playerEntity.position[1] - entityValue.position[1]) * playerEntity.zoomLevel + windowHeight / 2;
      // entityValue.x = (entityValue.position[0] - playerEntity.position[0]) * playerEntity.zoomLevel + windowWidth / 2;
      // entityValue.y = (entityValue.position[1] - playerEntity.position[1]) * playerEntity.zoomLevel + windowHeight / 2;
    }
  }

  return entities;
};

export { GhostOnScreen };
