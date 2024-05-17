import { readyLines } from '~/sampleData/overPassResponses';
import MapRenderer from '~/game/renderers/MapRenderer';

const generateMapEntities = () => {
  const mapEntities: { [key: string]: any } = {};
  readyLines.forEach((line) => {
    mapEntities[`${line[0]}${line[1]}`] = { line: line, lineOnScreen: [[0, 0]] };
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
export { generateMapEntities, generateMapEntitiesForRender };
