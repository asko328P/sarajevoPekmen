import { degreesToRadians, getDistance, radiansToDegrees } from '~/utility/geometry';
import { DELTA } from '~/services/overpassApi';

export const AddRemovePlayer = (entities: any, infoObj: any) => {
  for (let i = 0; i < infoObj.events.length; i++) {
    let event = infoObj.events[i];
    switch (event.type) {
      case 'injectEntity':
        return {
          ...entities,
          ...event.entity,
        };
      case 'deleteEntity':
        console.log('should have deleted sumn in the engine');
        delete entities[event.entityName];
        return entities;
    }
    // if (event.type === 'injectEntity') {
    //   return {
    //     ...entities,
    //     ...event.entity,
    //   };
    // }
  }

  return entities;
};
