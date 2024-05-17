const LineOnScreen = (windowWidth: number, windowHeight: number) => (entities: any) => {
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
    // if (entity.lineOnScreen[0][0] !== 0) {
    //   return;
    // }
    let tempLineOnScreen: number[][] = [];
    entity.line.forEach((line: [number, number]) => {
      tempLineOnScreen.push([
        (line[0] - playerEntity.position[0]) * playerEntity.zoomLevel + windowWidth / 2,
        ((line[1] - playerEntity.position[1]) * -playerEntity.zoomLevel * Math.PI) / 2.35 + windowHeight / 2,
      ]);
    });
    allLinesEntity.allLines.push(tempLineOnScreen);
  });
  return entities;
};

export { LineOnScreen };
