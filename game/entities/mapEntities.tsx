import { readyLines } from '~/sampleData/overPassResponses';
import MapRenderer from '~/game/renderers/MapRenderer';

const generateMapEntities = () => {
  const mapEntities: { [key: string]: any } = {};
  readyLines.forEach((line) => {
    mapEntities[`${line[0]}${line[1]}`] = { line, lineOnScreen: [[0, 0]] };
  });
  return mapEntities;
};
const generateMapEntitiesForRender = () => {
  const mapEntities: { [key: string]: any } = {};
  mapEntities['allLines'] = { allLines: [], renderer: <MapRenderer /> };
  readyLines.forEach((line) => {
    mapEntities['allLines'].allLines.push(line);
  });
  return mapEntities;
};
const generateConnectedPoints = () => {
  const mapEntities: { [key: string]: any } = {};
  readyLines.forEach((line) => {
    line.forEach((point: any, index: number, array: any) => {
      // if (index === 0 || index === array.length - 1) {
      //   return;
      // }
      if (mapEntities[point.toString()] === undefined) {
        mapEntities[point.toString()] = { connectedPoints: new Map() };
      }
      // mapEntities[point.toString()].connectedPoints.set(point.toString(), point);
      if (index === 0) {
        mapEntities[point.toString()].connectedPoints.set(array[index + 1].toString(), array[index + 1]);
        return;
      }
      if (index === array.length - 1) {
        mapEntities[point.toString()].connectedPoints.set(array[index - 1].toString(), array[index - 1]);
        return;
      }
      mapEntities[point.toString()].connectedPoints.set(array[index - 1].toString(), array[index - 1]);
      mapEntities[point.toString()].connectedPoints.set(array[index + 1].toString(), array[index + 1]);
    });
  });
  return mapEntities;
};
export { generateMapEntities, generateMapEntitiesForRender, generateConnectedPoints };
