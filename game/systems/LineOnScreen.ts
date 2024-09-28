import simplify from 'simplify-js';

const LineOnScreen = (windowWidth: number, windowHeight: number) => (entities: any) => {
  if (!entities || !entities?.player) {
    return entities;
  }
  const playerEntity = entities['player'];
  const allLinesEntity = entities['allLines'];

  if (!playerEntity || !playerEntity.position || !allLinesEntity) {
    return;
  }
  allLinesEntity.allLines = [];
  Object.keys(entities).forEach((key) => {
    const entity = entities[key];
    if (!entity.line || !allLinesEntity.allLines) {
      return;
    }
    let tempLineOnScreen: number[][] = [];
    simplify(entity.line, 0.00004, false).forEach((point: [number, number]) => {
      tempLineOnScreen.push([
        (point[0] - playerEntity.position[0]) * playerEntity.zoomLevel + windowWidth / 2,
        (point[1] - playerEntity.position[1]) * -playerEntity.zoomLevel + windowHeight / 2,
      ]);
    });
    allLinesEntity.allLines.push(tempLineOnScreen);
  });
  return entities;
};

export { LineOnScreen };
