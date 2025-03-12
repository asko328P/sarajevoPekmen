import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getRandomColor } from '~/utility/utility';
import { Camera, MapView, MarkerView } from '@maplibre/maplibre-react-native';
import { Feature, Point } from 'geojson';

const SARAJEVO_COORDINATE = [18.4131, 43.8563];

export default function Page() {
  const router = useRouter();

  const [gameRoomName, setGameRoomName] = useState('default');
  const [randomColor, setRandomColor] = useState(getRandomColor());
  const [markerPosition, setMarkerPosition] = useState(SARAJEVO_COORDINATE);

  const navigateToGameScreen = () => {
    router.push({
      pathname: '/gameScreen',
      params: {
        gameRoomName,
        playerColor: randomColor,
        markerPositionLat: markerPosition[1].toString(),
        markerPositionLong: markerPosition[0].toString(),
      },
    });
  };
  const navigateShowCase = () => {
    router.push('/showcase');
  };

  const handleMapPress = (feature: Feature<Point>) => {
    setMarkerPosition(feature.geometry.coordinates);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.gameButtonHolder}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}>
          <Text>{'Room name: '}</Text>
          <TextInput
            style={{
              color: '#ed5400',
              fontWeight: '600',
              fontSize: 18,
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 3,
            }}
            placeholder={'Room name'}
            value={gameRoomName}
            onChangeText={setGameRoomName}
          />
          <Text>{'Player color: '}</Text>
          <TouchableOpacity
            onPress={() => {
              setRandomColor(getRandomColor());
            }}
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#888888',
              width: 30,
              height: 20,
              borderRadius: 5,
              backgroundColor: randomColor,
            }}
          />
        </View>
        <MapView
          onPress={handleMapPress}
          mapStyle={'https://api.maptiler.com/maps/streets-v2/style.json?key=NeGkw2FL7eHCRu1AoSpw'}
          style={{ height: 200, backgroundColor: 'red', borderRadius: 20, overflow: 'hidden' }}
          logoEnabled={true}>
          <MarkerView coordinate={markerPosition}>
            <View style={{ width: 5, height: 5, backgroundColor: 'red' }} />
          </MarkerView>
          <Camera centerCoordinate={SARAJEVO_COORDINATE} zoomLevel={14} />
        </MapView>

        <Button color={'#1e9aff'} onPress={navigateToGameScreen} title={'go to game screen'} />
      </View>
      <Button color={'#1e9aff'} onPress={navigateShowCase} title={'go to showcase'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameButtonHolder: {
    gap: 20,
    padding: 16,
    backgroundColor: '#e1e1e1',
    borderRadius: 20,
    margin: 16,
  },
  link: {
    color: '#ffffff',
  },
  container: {
    flex: 1,
  },
});
