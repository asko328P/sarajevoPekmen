const LineOnScreen = (windowWidth: number, windowHeight: number) => (entities: any) => {
  const playerEntity = entities['player'];
  if (!playerEntity || !playerEntity.position) {
    return;
  }
  Object.keys(entities).forEach((key) => {
    const entity = entities[key];
    if (!entity.line || !entity.lineOnScreen) {
      return;
    }
    if (entity.lineOnScreen[0][0] !== 0) {
      return;
    }
    let tempLineOnScreen: number[][] = [];
    entity.line.forEach((line: [number, number]) => {
      tempLineOnScreen.push([
        (line[0] - playerEntity.position[0]) * playerEntity.zoomLevel + windowWidth / 2,
        (line[1] - playerEntity.position[1]) * -playerEntity.zoomLevel + windowHeight / 2,
      ]);
    });
    entity.lineOnScreen = tempLineOnScreen;
  });
  return entities;
};

export { LineOnScreen };
