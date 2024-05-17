import PlayerRenderer from '~/game/renderers/PlayerRenderer';

interface PlayerEntity {
  position: [number, number];
}

const generatePlayerEntity = () => {
  const playerEntityObject: { [key: string]: any } = {};
  playerEntityObject['player'] = {
    position: [18.3485999, 43.8326749],
    nextPosition: [18.3485028, 43.832707],
    previousPosition: [18.3516402, 43.8316685],
    zoomLevel: 45000,
    renderer: <PlayerRenderer />,
  };
  return playerEntityObject;
};
export { generatePlayerEntity };
