import PlayerRenderer from '~/game/renderers/PlayerRenderer';

interface PlayerEntity {
  position: [number, number];
}

const generatePlayerEntity = () => {
  const playerEntityObject: { [key: string]: any } = {};
  playerEntityObject['player'] = {
    position: [18.3398846, 43.8354825],
    nextPosition: [18.3397419, 43.8354548],
    previousPosition: [18.3395571, 43.8354122],
    desiredMovementAngle: 62,
    zoomLevel: 165000,
    renderer: <PlayerRenderer />,
  };
  return playerEntityObject;
};
export { generatePlayerEntity };
