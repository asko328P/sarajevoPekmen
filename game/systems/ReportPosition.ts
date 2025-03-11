import { angleDifference, calcAngleDegrees, degreesToRadians, getDistance, radiansToDegrees } from '~/utility/geometry';
import { DELTA } from '~/services/overpassApi';

// const EPSILON = 0.001;

export const ReportPosition = (entities: any, infoObj: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities.player;

  for (let i = 0; i < infoObj.events.length; i++) {
    const event = infoObj.events[i];
    if (event.type === 'gameEngineReportPosition') {
      infoObj.dispatch({ type: 'reportPositionToOtherPlayers', playerEntity });
      return entities;
    }
  }

  return entities;
};
