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
import { generateRandomString } from '~/utility/utility';
import { AddRemovePlayer } from '~/game/systems/AddRemovePlayer';
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
const PING_CHECK_INTERVAL = 3000;

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
  const [latency, setLatency] = useState(0);

  const userStatus = {
    entityName: randomName,
    online_at: new Date().toISOString(),
  };
  const pekChannel = supabaseClient.channel(gameRoomName, {
    config: {
      presence: {
        key: randomName,
      },
      broadcast: {
        ack: true,
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

      gameEngineRef.current?.swap({
        ...cumulativeEntities,
        ...playerEntity,
      });

      pekChannel
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
          setEntityNames(['player', ...Object.keys(newState)]);
          gameEngineRef.current?.dispatch({
            type: 'gameEngineReportPosition',
          });
        })
        .on('presence', { event: 'leave' }, ({ key, leftPresences }) => {
          console.log('leave', key, leftPresences);
          gameEngineRef?.current?.dispatch({
            type: 'deleteEntity',
            entityName: key,
          });
        })
        .subscribe(async (status) => {
          if (status !== 'SUBSCRIBED') {
            return;
          }
          await pekChannel.track(userStatus);
        });
      gameEngineRef.current?.start();
    };

    const pingCheckInterval = setInterval(async () => {
      const pingTime = new Date().getTime();
      const response = await pekChannel?.send({
        type: 'broadcast',
        event: 'ping',
        payload: { pingTime },
      });
      const pongTime = new Date().getTime();
      setLatency(pongTime - pingTime);
    }, PING_CHECK_INTERVAL);

    generateMapData();

    return () => {
      clearInterval(pingCheckInterval);
      pekChannel.untrack();
    };
  }, []);

  const onGameEngineEventCallback = useCallback(
    async (event: Event) => {
      switch (event.type) {
        case 'reportPositionToOtherPlayers':
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
          gameEngineRef?.current?.swap({
            ...cumulativeMapEntities,
            ...tempObj,
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
          AddRemovePlayer,
          LineOnScreen(windowWidth, windowHeight),
          GhostOnScreen(windowWidth, windowHeight),
          MovePlayer,
          PlayerControl(windowWidth, windowHeight),
          DistanceChecker,
          ReportPosition,
        ]}
        entities={{}}
      />
      {isFetchingData && (
        //@ts-ignore
        <View pointerEvents={'none'} style={styles.fetchingHolder}>
          <Text style={styles.fetchingText}>{'Fetching map data.'}</Text>
        </View>
      )}
      {latency !== 0 && (
        //@ts-ignore
        <View pointerEvents={'none'} style={styles.latencyHolder}>
          <Text style={styles.fetchingText}>{`latency: ${latency} ms`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = {
  fetchingHolder: {
    position: 'absolute',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  latencyHolder: {
    position: 'absolute',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    padding: 20,
  },
  fetchingText: {
    color: 'white',
  },
  centerText: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
  },
  gameEngine: {
    position: 'absolute',
  },
  container: {
    flex: 1,
  },
};
