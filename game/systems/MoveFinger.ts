const MoveFinger = (entities: any, infoObj: any) => {
  let finger = entities[1];
  if (finger && finger.position) {
    finger.position = [finger.position[0] + 1, finger.position[1] + 2];
  }
  return entities;
};

export { MoveFinger };
