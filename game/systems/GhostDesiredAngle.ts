//@ts-nocheck
import { angle, angleDifference, calcAngleDegrees, latToMercator, radiansToDegrees } from '~/utility/geometry';

const GhostDesiredAngle = (entities: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities['player'];
  // console.log('THIS IS THE GHOST ENTITY', entities['ghost']);
  // for (const [entityKey, entityValue] of Object.entries(entities)) {
  //   if (entityKey === 'ghost') {
  //     console.log('ghost value: ', entityValue);
  //   }
  //   if (entityKey === 'player') {
  //     return entities;
  //   }
  //   if (
  //     entityValue.isGhostEntity
  //     // && entityValue.desiredMovementAngle
  //   ) {
  //     console.log(entityValue);
  //     entityValue.desiredMovementAngle =
  //       (Math.atan2(entityValue.position[0] - playerEntity.position[0], entityValue.position[0] - playerEntity.position[1]) *
  //         180) /
  //       Math.PI;
  //   }
  // }

  for (const [entityKey, entityValue] of Object.entries(entities)) {
    if (!entityValue) continue;
    // if (entityKey === 'ghost') {
    //   console.log('nasao ghosta');
    // }
    if (
      entityKey !== 'player' &&
      // entityValue.desiredMovementAngle &&
      entityValue.position &&
      entityValue.nextPosition &&
      entityValue.previousPosition &&
      entityValue.playerSpeed
    ) {
      // console.log(
      //   radiansToDegrees(
      //     Math.atan2(entityValue.position[0] - playerEntity.position[0], entityValue.position[1] - playerEntity.position[1])
      //   )
      // );
      // console.log(
      //   (Math.atan2(entityValue.position[0] - playerEntity.position[0], entityValue.position[0] - playerEntity.position[1]) *
      //     180) /
      //     Math.PI
      // );
      // entityValue.desiredMovementAngle =
      //   (Math.atan2(entityValue.position[0] - playerEntity.position[0], entityValue.position[0] - playerEntity.position[1]) *
      //     180) /
      //   Math.PI;

      // entityValue.desiredMovementAngle = radiansToDegrees(
      //   Math.atan2(
      //     entityValue.position[0] - playerEntity.position[0],
      //     // latToMercator(entityValue.position[0]) - latToMercator(playerEntity.position[0]),
      //     entityValue.position[1] - playerEntity.position[1]
      //   )
      // );
      entityValue.desiredMovementAngle =
        (angle(entityValue.position[1], entityValue.position[0], playerEntity.position[1], playerEntity.position[0]) + 180) % 360;
      // console.log(entityValue.desiredMovementAngle);
    }
  }

  return entities;
};

export { GhostDesiredAngle };
