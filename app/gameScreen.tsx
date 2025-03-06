import { Dimensions, Text, View } from 'react-native';
//@ts-ignore
import { GameEngine } from 'react-native-game-engine-skia';
import { LineOnScreen } from '~/game/systems/LineOnScreen';
import { MovePlayer } from '~/game/systems/MovePlayer';
import { PlayerControl } from '~/game/systems/PlayerControl';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getConvertedMapData, getMapData } from '~/services/overpassApi';
import {
  generateCumulativeEntities,
  generateGhostEntity,
  generateGhostEntityFromMapData,
  generatePlayerEntityFromMapData,
} from '~/game/entities/entitiesGenerators';
import { DistanceChecker } from '~/game/systems/DistanceChecker';
import { createClient } from '@supabase/supabase-js';
import { GhostOnScreen } from '~/game/systems/GhostOnScreen';
import { GhostDesiredAngle } from '~/game/systems/GhostDesiredAngle';
import { generateRandomString } from '~/utility/utility';
import { AddPlayer } from '~/game/systems/AddPlayer';
import { useLocalSearchParams } from 'expo-router';
import { ReportPosition } from '~/game/systems/ReportPosition';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

type Event = {
  type: 'newPosition' | 'reportPositionToOtherPlayers';
  newPosition?: number[];
  playerEntity?: any;
  entities?: any;
};

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;
const supabaseClient = createClient(supabaseUrl!, supabaseAnonKey!);

export default function Home() {
  const gameEngineRef = useRef<GameEngine>(null);
  const { gameRoomName, playerColor } = useLocalSearchParams<{ gameRoomName: string; playerColor?: string }>();

  const [position, setPosition] = useState([43.859029, 18.4340605]);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [entityNames, setEntityNames] = useState<string[]>(['player']);
  const [randomName, setRandomName] = useState<string>(generateRandomString());

  const userStatus = {
    entityName: randomName,
    online_at: new Date().toISOString(),
  };
  const pekChannel = supabaseClient.channel(gameRoomName, {
    config: {
      presence: {
        key: randomName,
      },
    },
  });

  useEffect(() => {
    const generateMapData = async () => {
      console.log('generating map data');
      gameEngineRef.current?.stop();
      const mapEntities = await getConvertedMapData(position[0], position[1]);
      const cumulativeEntities = generateCumulativeEntities(mapEntities);
      const playerEntity = generatePlayerEntityFromMapData(mapEntities, position[0], position[1], playerColor);
      const otherPlayerEntity = generateGhostEntityFromMapData(mapEntities, 43.859029, 18.4345605);

      gameEngineRef.current?.swap({
        ...cumulativeEntities,
        ...playerEntity,
        // ...otherPlayerEntity,
      });

      pekChannel
        // .on('broadcast', { event: 'someEvent' }, ({ payload }) => {
        //   console.log(payload);
        // })
        .on('broadcast', { event: 'reportPosition' }, ({ payload }) => {
          const { name } = payload;
          if (name === randomName) return;
          const { nextPosition, position, previousPosition, desiredMovementAngle, color } = payload.entity;
          setEntityNames((prevState) => [...prevState, name]);
          gameEngineRef.current?.dispatch({
            type: 'injectEntity',
            entity: generateGhostEntity(nextPosition, position, previousPosition, name, desiredMovementAngle, color),
          });
        })
        .on('presence', { event: 'sync' }, () => {
          const newState = pekChannel.presenceState();
          console.log('presences: ', newState);
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') {
            return;
          }
          await pekChannel.track(userStatus);
        });
      gameEngineRef.current?.start();
    };

    generateMapData();
  }, []);

  const onGameEngineEventCallback = useCallback(
    async (event: Event) => {
      switch (event.type) {
        case 'reportPositionToOtherPlayers':
          const { nextPosition, position, previousPosition, desiredMovementAngle } = event.playerEntity;
          pekChannel.send({
            type: 'broadcast',
            event: 'reportPosition',
            payload: { entity: event.playerEntity, name: randomName },
          });
          break;
        case 'newPosition':
          if (!event.newPosition) {
            break;
          }
          if (isFetchingData) {
            break;
          }
          setIsFetchingData(true);
          const mapEntities = await getConvertedMapData(event.newPosition[0], event.newPosition[1]);
          const cumulativeMapEntities = generateCumulativeEntities(mapEntities);

          const playerEntityObject: { [key: string]: any } = {};
          playerEntityObject['player'] = event.playerEntity;
          //
          //copy the entities which need to be carried over (i.e. everything that is not map data)
          let tempObj: any = {};
          entityNames.forEach((name: string) => {
            tempObj[name] = { ...event.entities[name] };
          });
          // console.log(tempObj);
          gameEngineRef?.current?.swap({
            ...cumulativeMapEntities,
            ...tempObj,
            // ...playerEntityObject,
          });
          setIsFetchingData(false);
          break;
      }
    },
    [entityNames]
  );
  return (
    <View style={styles.container}>
      <GameEngine
        ref={gameEngineRef}
        style={styles.gameEngine}
        onEvent={onGameEngineEventCallback}
        systems={[
          AddPlayer,
          LineOnScreen(windowWidth, windowHeight),
          GhostOnScreen(windowWidth, windowHeight),
          MovePlayer,
          PlayerControl(windowWidth, windowHeight),
          DistanceChecker,
          // GhostDesiredAngle,
          // ReportPosition,
        ]}
        entities={{}}
      />
      {isFetchingData && (
        //@ts-ignore
        <View pointerEvents={'none'} style={styles.textHolder}>
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
