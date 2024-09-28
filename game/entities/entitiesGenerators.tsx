import { ReadyLines, Way } from '~/services/overpassApi';
import MapRenderer from '~/game/renderers/MapRenderer';
import PlayerRenderer from '~/game/renderers/PlayerRenderer';
import { degreesToRadians, getDistance, radiansToDegrees } from '~/utility/geometry';

const generateMapEntities = (mapData: ReadyLines) => {
  const mapEntities: { [key: string]: any } = {};
  mapData.forEach((line) => {
    mapEntities[`${line[0]}${line[1]}`] = { line, lineOnScreen: [[0, 0]] };
  });
  return mapEntities;
};

const generateMapEntitiesForRender = (mapData: ReadyLines) => {
  const mapEntities: { [key: string]: any } = {};
  mapEntities['allLines'] = { allLines: [], renderer: <MapRenderer /> };
  mapData.forEach((line) => {
    mapEntities['allLines'].allLines.push(line);
  });
  return mapEntities;
};

export const generateConnectedPoints = (mapData: ReadyLines) => {
  const mapEntities: { [key: string]: any } = {};
  mapData.forEach((line) => {
    line.forEach((point: any, index: number, array: any) => {
      if (mapEntities[point.toString()] === undefined) {
        mapEntities[point.toString()] = { connectedPoints: new Map() };
      }
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

const findIndexOfNearestPointInWay = (way: Way, lat: number, long: number) => {
  let smallestDistance = getDistance(way[0][1], way[1][1], lat, long);
  let indexOfSmallestDistance = 0;

  way.forEach((point, index) => {
    if (getDistance(point[1], point[0], lat, long) < smallestDistance) {
      smallestDistance = getDistance(point[1], point[0], lat, long);
      indexOfSmallestDistance = index;
    }
  });
  return indexOfSmallestDistance;
};
const findNearestPointInWay = (way: Way, lat: number, long: number) => {
  let nearestPoint = way[0];
  let smallestDistance = getDistance(way[0][1], way[1][1], lat, long);

  way.forEach((point) => {
    if (getDistance(point[1], point[0], lat, long) < smallestDistance) {
      nearestPoint = point;
      smallestDistance = getDistance(point[1], point[0], lat, long);
    }
  });
  return nearestPoint;
};

const findWayWithNearestPoint = (mapData: ReadyLines, lat: number, long: number) => {
  let nearestWay = mapData[0];
  let smallestDistance = 10000;

  mapData.forEach((way: Way) => {
    const nearestPoint = findNearestPointInWay(way, lat, long);
    if (getDistance(nearestPoint[1], nearestPoint[0], lat, long) < smallestDistance) {
      smallestDistance = getDistance(nearestPoint[1], nearestPoint[0], lat, long);
      nearestWay = way;
    }
  });
  return nearestWay;
};

export const generatePlayerEntityFromMapData = (
  mapData: ReadyLines,
  lat: number,
  long: number,
  desiredMovementAngle = 62,
  zoomLevel = 180000,
  playerSpeed = 3 / 10000000
) => {
  const playerEntityObject: { [key: string]: any } = {};

  const phiRadians = degreesToRadians(lat);
  const phiMercator = Math.log(Math.abs(1 / Math.cos(phiRadians) + Math.tan(phiRadians)));
  const convertedLat = radiansToDegrees(phiMercator);

  let nextPosition: number[];
  let position: number[];
  let previousPosition: number[];

  const nearestWay = findWayWithNearestPoint(mapData, convertedLat, long);
  const indexOfPointInNearestWay = findIndexOfNearestPointInWay(nearestWay, convertedLat, long);
  if (indexOfPointInNearestWay === 0) {
    position = nearestWay[0];
    previousPosition = position;
    nextPosition = nearestWay[1];
  } else {
    if (indexOfPointInNearestWay === nearestWay.length - 1) {
      position = nearestWay[nearestWay.length - 1];
      previousPosition = position;
      nextPosition = nearestWay[nearestWay.length - 2];
    } else {
      position = nearestWay[indexOfPointInNearestWay];
      previousPosition = position;
      nextPosition = nearestWay[indexOfPointInNearestWay + 1];
    }
  }

  playerEntityObject['player'] = {
    nextPosition,
    position,
    previousPosition,
    desiredMovementAngle,
    zoomLevel,
    playerSpeed,
    startingPosition: position,
    renderer: <PlayerRenderer />,
  };
  return playerEntityObject;
};

export const generateCumulativeEntities = (mapData: ReadyLines) => {
  return {
    ...generateMapEntities(mapData),
    ...generateMapEntitiesForRender(mapData),
    ...generateConnectedPoints(mapData),
  };
};
