import { calcAngleDegrees } from '~/utility/geometry';

const PlayerControl =
  (windowWidth: number, windowHeight: number) =>
  (entities: any, { touches }: any) => {
    if (!entities || !entities?.player) {
      return entities;
    }
    const playerEntity = entities['player'];
    if (touches[0]?.event?.locationX && touches[0].event?.locationY) {
      playerEntity.desiredMovementAngle = calcAngleDegrees(
        -(windowWidth / 2 - touches[0]?.event?.locationX),
        windowHeight / 2 - touches[0]?.event?.locationY
      );
    }
    return entities;
  };

export { PlayerControl };
