const MovePlayer = (entities, infoObj) => {
  entities['player'].position = [entities['player'].position[0] + 0.0001, entities['player'].position[1]];
  return entities;
};

export { MovePlayer };
