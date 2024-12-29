//@ts-nocheck
import { angle } from '~/utility/geometry';

const GhostDesiredAngle = (entities: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities['player'];

  for (const [entityKey, entityValue] of Object.entries(entities)) {
    if (!entityValue) continue;
    if (
      entityKey !== 'player' &&
      entityValue.position &&
      entityValue.nextPosition &&
      entityValue.previousPosition &&
      entityValue.playerSpeed
    ) {
      // entityValue.desiredMovementAngle = 90;
      entityValue.desiredMovementAngle = angle(
        entityValue.position[0],
        entityValue.position[1],
        playerEntity.position[0],
        playerEntity.position[1]
      );
      // console.log(entityValue.desiredMovementAngle);
    }
  }

  return entities;
};

export { GhostDesiredAngle };
