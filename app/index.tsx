import { lines } from '~/sampleData/overPassResponses';
import { Dimensions, View } from 'react-native';
import { GameEngine } from 'react-native-game-engine-skia';
import { MoveFinger } from '~/game/systems/MoveFinger';
import { Finger } from '~/game/renderers/Finger';
import MapRenderer from '~/game/renderers/MapRenderer';
import { generateMapEntities } from '~/game/entities/mapEntities';
import { generatePlayerEntity } from '~/game/entities/playerEntity';
import { LineOnScreen } from '~/game/systems/LineOnScreen';
import { MovePlayer } from '~/game/systems/MovePlayer';
import { from } from 'rxjs';
import { Text } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const currentLocationAndZoom = {
  lat: 18.3399497,
  lon: 43.8383515,
  zoom: 22000,
};
const lineData = lines.features;

export default function Home() {
  // return <Text>asdas</Text>;
  return (
    <GameEngine
      style={styles.container}
      systems={[MoveFinger, LineOnScreen(windowWidth, windowHeight), MovePlayer]}
      entities={{
        // 0: { lineData, renderer: <MapRenderer /> },
        // 1: { position: [40, 200], renderer: <Finger /> }, //-- Notice that each entity has a unique id (required)
        // 2: { position: [100, 200], renderer: <Finger /> }, //-- and a renderer property (optional). If no renderer
        // 3: { position: [160, 200], renderer: <Finger /> }, //-- is supplied with the entity - it won't get displayed.
        // 4: { position: [220, 200], renderer: <Finger /> },
        // 5: { position: [280, 200], renderer: <Finger /> },
        ...generateMapEntities(),
        ...generatePlayerEntity(),
      }}></GameEngine>
  );
}

const styles = {
  container: {
    flex: 1,
  },
};
