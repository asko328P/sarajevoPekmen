import PlayerRenderer from '~/game/renderers/PlayerRenderer';

interface PlayerEntity {
  position: [number, number];
}

const generatePlayerEntity = () => {
  const playerEntityObject: { [key: string]: any } = {};
  playerEntityObject['player'] = {
    nextPosition: [18.3436257, 48.869419779888176],
    position: [18.3435913, 48.86937486247003],
    previousPosition: [18.3435685, 48.86932315201578],
    desiredMovementAngle: 62,
    zoomLevel: 165000,
    renderer: <PlayerRenderer />,
  };
  return playerEntityObject;
};
export { generatePlayerEntity };
