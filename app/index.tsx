import { Dimensions, Text, View } from 'react-native';
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
  const gameEngineRef = useRef<GameEngine>(null);
  const [position, setPosition] = useState([43.859029, 18.4340605]);
  // const isAlreadyFetchingData = useRef(false);
  const [isFetchingData, setIsFetchingData] = useState(false);

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
  }, []);

  const onEventCallback = async (event: Event) => {
    switch (event.type) {
      case 'newPosition':
        // gameEngineRef.current?.stop();
        if (!event.newPosition) {
          break;
        }
        if (isFetchingData) {
          break;
        }
        setIsFetchingData(true);
        console.log('fetching new position');
        const mapEntities = await getConvertedMapData(event.newPosition[0], event.newPosition[1]);
        const cumulativeEntities = generateCumulativeEntities(mapEntities);

        const playerEntityObject: { [key: string]: any } = {};
        playerEntityObject['player'] = event.playerEntity;

        gameEngineRef?.current?.swap({
          ...cumulativeEntities,
          ...playerEntityObject,
        });
        // isAlreadyFetchingData.current = false;
        setIsFetchingData(false);
        // gameEngineRef.current?.start();
        break;
    }
  };
  return (
    <View style={styles.container}>
      <GameEngine
        ref={gameEngineRef}
        style={styles.gameEngine}
        onEvent={onEventCallback}
        systems={[LineOnScreen(windowWidth, windowHeight), MovePlayer, PlayerControl(windowWidth, windowHeight), DistanceChecker]}
        entities={{}}
      />
      {isFetchingData && (
        <View style={styles.textHolder}>
          <Text style={styles.fetchingText}>{'Fetching map data.'}</Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  fetchingText: {
    color: 'white',
    paddingBottom: 200,
  },
  textHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  gameEngine: {
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
};
