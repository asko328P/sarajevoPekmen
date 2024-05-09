import { readyLines } from '~/sampleData/overPassResponses';
import MapRenderer from '~/game/renderers/MapRenderer';

const generateMapEntities = () => {
  const mapEntities = {};
  readyLines.forEach((line) => {
    mapEntities[`${line[0]}${line[1]}`] = { line: line, lineOnScreen: [[0, 0]], renderer: <MapRenderer /> };
  });
  return mapEntities;
};
export { generateMapEntities };
