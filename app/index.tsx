import { Dimensions, View } from 'react-native';
//@ts-ignore
import { GameEngine } from 'react-native-game-engine-skia';
import { LineOnScreen } from '~/game/systems/LineOnScreen';
import { MovePlayer } from '~/game/systems/MovePlayer';
import { PlayerControl } from '~/game/systems/PlayerControl';
import { useEffect, useRef, useState } from 'react';
import { getConvertedMapData, getMapData } from '~/services/overpassApi';
import { generateCumulativeEntities, generatePlayerEntityFromMapData } from '~/game/entities/entitiesGenerators';
import { DistanceChecker } from '~/game/systems/DistanceChecker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Event = {
  type: 'newPosition';
  newPosition?: number[];
  playerEntity?: any;
};
export default function Home() {
  // return <Text>asdas</Text>;
  const gameEngineRef = useRef<GameEngine>(null);
  const [position, setPosition] = useState([43.8344772, 18.3426325]);
  const firstRender = useRef(true);

  useEffect(() => {
    const generateMapData = async () => {
      console.log('generating map data');
      gameEngineRef.current?.stop();
      const mapEntities = await getConvertedMapData(position[0], position[1]);
      const cumulativeEntities = generateCumulativeEntities(mapEntities);
      const playerEntity = generatePlayerEntityFromMapData(mapEntities, position[0], position[1]);
      gameEngineRef.current?.start();

      gameEngineRef.current?.swap({
        ...cumulativeEntities,
        ...playerEntity,
      });
    };

    generateMapData();
  }, [position]);
  // useEffect(() => {
  //   if (firstRender.current) {
  //     firstRender.current = false;
  //     return;
  //   }
  //   const generateMapData = async () => {
  //     const mapEntities = await getConvertedMapData(position[0], position[1]);
  //     const cumulativeEntities = generateCumulativeEntities(mapEntities);
  //
  //     gameEngineRef.current?.swap({
  //       ...cumulativeEntities,
  //     });
  //   };
  //
  //   generateMapData();
  // }, [position]);

  const onEventCallback = async (event: Event) => {
    console.log(event.newPosition);
    switch (event.type) {
      case 'newPosition':
        // setPosition(event.newPosition);
        gameEngineRef.current?.stop();
        if (!event.newPosition) {
          break;
        }
        const mapEntities = await getConvertedMapData(event.newPosition[0], event.newPosition[1]);
        const cumulativeEntities = generateCumulativeEntities(mapEntities);
        const playerEntity = generatePlayerEntityFromMapData(mapEntities, position[0], position[1]);

        const playerEntityObject: { [key: string]: any } = {};
        playerEntityObject['player'] = event.playerEntity;

        console.log(event.playerEntity);
        gameEngineRef?.current?.swap({
          // ...event.playerEntity,
          ...cumulativeEntities,
          // ...playerEntity,
          ...playerEntityObject,
        });
        gameEngineRef.current?.start();
        break;
    }
  };
  return (
    <GameEngine
      ref={gameEngineRef}
      style={styles.container}
      onEvent={onEventCallback}
      systems={[LineOnScreen(windowWidth, windowHeight), MovePlayer, PlayerControl(windowWidth, windowHeight), DistanceChecker]}
      entities={{}}
    />
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
