import { calcAngleDegrees } from '~/utility/geometry';

const PlayerControl = (windowWidth: number, windowHeight: number) => (entities: any, infoObj: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities['player'];
  const { touches } = infoObj;
  if (touches[0]?.event?.locationX && touches[0].event?.locationY) {
    playerEntity.desiredMovementAngle = calcAngleDegrees(
      -(windowWidth / 2 - touches[0]?.event?.locationX),
      windowHeight / 2 - touches[0]?.event?.locationY
    );
    infoObj.dispatch({ type: 'reportPositionToOtherPlayers', playerEntity });
  }
  return entities;
};

export { PlayerControl };
