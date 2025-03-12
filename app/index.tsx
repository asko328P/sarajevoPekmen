import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getRandomColor } from '~/utility/utility';

export default function Page() {
  const router = useRouter();

  const [gameRoomName, setGameRoomName] = useState('default');
  const [randomColor, setRandomColor] = useState(getRandomColor());

  const navigateToGameScreen = () => {
    router.push({ pathname: '/gameScreen', params: { gameRoomName, playerColor: randomColor } });
  };
  const navigateShowCase = () => {
    router.push('/showcase');
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

        <Button color={'#1e9aff'} onPress={navigateToGameScreen} title={'go to game screen'} />
      </View>
      <Button color={'#1e9aff'} onPress={navigateShowCase} title={'go to showcase'} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  gameButtonHolder: {
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
