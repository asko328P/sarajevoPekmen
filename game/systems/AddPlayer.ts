import { degreesToRadians, getDistance, radiansToDegrees } from '~/utility/geometry';
import { DELTA } from '~/services/overpassApi';

export const AddPlayer = (entities: any, infoObj: any) => {
  for (let i = 0; i < infoObj.events.length; i++) {
    let event = infoObj.events[i];
    if (event.type === 'injectEntity') {
      return {
        ...entities,
        ...event.entity,
      };
    }
  }

  return entities;
};
