import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import SkiaScrollPicker from '~/components/SkiaScrollPicker/SkiaScrollPicker';
import SkiaScrollPicker2 from '~/components/SkiaScrollPicker2/SkiaScrollPicker2';
import AnimatedNumberTicker from '~/components/AnimatedNumberTicker/AnimatedNumberTicker';
import { useState } from 'react';
import SquishButton from '~/components/SquishButton/SquishButton';
import { getRandomColor } from '~/utility/utility';

export default function Page() {
  const router = useRouter();

  const [animatedNumber, setAnimatedNumber] = useState(9996);
  const [gameRoomName, setGameRoomName] = useState('default');
  const [randomColor, setRandomColor] = useState(getRandomColor());

  const navigateToGameScreen = () => {
    router.push({ pathname: '/gameScreen', params: { gameRoomName, playerColor: randomColor } });
  };
  const navigateShowCase = () => {
    router.push('/showcase/');
  };
  const callbackHandler = (value: number) => {
    setAnimatedNumber(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/*<Text>{'Customization screen'}</Text>*/}
      {/*<Link style={styles.link} href={'/showcase/'}>*/}
      {/*  {'Showcase'}*/}
      {/*</Link>*/}
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
      {/*<View*/}
      {/*  style={{*/}
      {/*    marginTop: 100,*/}
      {/*    gap: 30,*/}
      {/*  }}>*/}
      {/*  <SkiaScrollPicker numberOfLines={30} lineWidth={2} spacing={10} />*/}
      {/*  <SkiaScrollPicker2 height={50} numberOfLines={30} lineWidth={4} spacing={10} />*/}
      {/*  <View style={{ width: '30%' }}>*/}
      {/*    <AnimatedNumberTicker*/}
      {/*      fontSize={50}*/}
      {/*      digits={animatedNumber}*/}
      {/*      sensitivity={1}*/}
      {/*      valueCallBack={callbackHandler}*/}
      {/*      maxValue={11000}*/}
      {/*    />*/}
      {/*  </View>*/}
      {/*  <Button title={'increase'} onPress={() => setAnimatedNumber((prev) => prev + 1)} />*/}
      {/*  <Button title={'decrease'} onPress={() => setAnimatedNumber((prev) => prev - 1)} />*/}
      {/*  <SquishButton height={100} width={400} title={'Squish me!'} />*/}
      {/*</View>*/}
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
    // backgroundColor: '#616161',
    // backgroundColor: '#000000',
    // backgroundColor: '#FFFFFF',
  },
});
