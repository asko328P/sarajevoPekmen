import osmtogeojson from 'osmtogeojson';
import { GeoJSON } from 'geojson';
import { degreesToRadians, radiansToDegrees } from '~/utility/geometry';
import { readyLines } from '~/sampleData/overPassResponses';

export const DELTA = 0.011;

const fetchMapData = (lat: number, long: number, delta = DELTA) => {
  const latMin = lat - delta / 2;
  const latMax = lat + delta / 2;
  const longMin = long - delta / 2;
  const longMax = long + delta / 2;
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain', 'User-Agent': 'insomnia/8.6.1' },
    body: `[out:json][timeout:25];
(
  way["highway"="primary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="secondary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="trunk"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="primary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="secondary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="tertiary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="secondary"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="residential"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="service"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="pedestrian"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="motorway"](${latMin},${longMin},${latMax},${longMax});
  way["highway"="motorway_link"](${latMin},${longMin},${latMax},${longMax});


);
out geom;`,
  };

  return new Promise((resolve, reject) => {
    fetch('https://overpass-api.de/api/interpreter', options)
      .then((response) => response.json())
      .then((response) => {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
};

export const getMapData = async (lat: number, long: number, delta = DELTA) => {
  return new Promise((resolve, reject) => {
    fetchMapData(lat, long, delta)
      .then((response) => {
        resolve(osmtogeojson(response));
      })
      .catch((error) => reject(error));
  });
};

type Feature = {
  geometry: {
    type: string;
    coordinates: [];
  };
};
export type GeoJSONData = {
  features: Feature[];
};

export type Point = Array<number>;
export type Way = Array<Point>;

export type ReadyLines = Array<Way>;

export const convertMapData = (data: GeoJSONData) => {
  let tempData: ReadyLines = [];
  data.features.forEach((currentFeature: Feature) => {
    if (currentFeature.geometry.type === 'LineString') {
      let tempLine: Way = [];
      currentFeature.geometry.coordinates.forEach((point) => {
        const gamma = point[0];
        const phiRadians = degreesToRadians(point[1]);
        const phiMercator = Math.log(Math.abs(1 / Math.cos(phiRadians) + Math.tan(phiRadians)));
        tempLine.push([gamma, radiansToDegrees(phiMercator)]);
      });
      tempData.push(tempLine);
      // readyLines.push(simplify(currentFeature.geometry.coordinates, 0.000002, true));
    }
  });
  return tempData;
};

export const getConvertedMapData = async (lat: number, long: number, delta = DELTA) => {
  return new Promise<ReadyLines>((resolve, reject) => {
    getMapData(lat, long, delta)
      .then((response) => {
        //@ts-ignore
        resolve(convertMapData(response));
      })
      .catch((err) => reject(err));
  });
};
