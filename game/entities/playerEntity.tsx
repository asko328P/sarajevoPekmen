import PlayerRenderer from '~/game/renderers/PlayerRenderer';

interface PlayerEntity {
  position: [number, number];
}

const generatePlayerEntity = () => {
  const playerEntityObject = {};
  playerEntityObject['player'] = {
    position: [18.3532269, 43.8467841],
    zoomLevel: 20000,
    renderer: <PlayerRenderer />,
  };
  return playerEntityObject;
};
export { generatePlayerEntity };
