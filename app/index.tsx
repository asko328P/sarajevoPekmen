import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import SkiaScrollPicker from '~/components/SkiaScrollPicker/SkiaScrollPicker';
import SkiaScrollPicker2 from '~/components/SkiaScrollPicker2/SkiaScrollPicker2';
import AnimatedNumberTicker from '~/components/AnimatedNumberTicker/AnimatedNumberTicker';
import { useState } from 'react';

export default function Page() {
  const router = useRouter();

  const [animatedNumber, setAnimatedNumber] = useState(7);

  const navigateToGameScreen = () => {
    router.push('/gameScreen');
  };
  const callbackHandler = (value: number) => {
    setAnimatedNumber(value);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text>{'Customization screen'}</Text>
      <Button onPress={navigateToGameScreen} title={'go to game screen'} />
      <View
        style={{
          marginTop: 100,
          gap: 30,
        }}>
        <SkiaScrollPicker width={200} numberOfLines={30} lineWidth={2} spacing={10} />
        <SkiaScrollPicker2 width={200} height={50} numberOfLines={30} lineWidth={4} spacing={10} />
        <View style={{ width: '30%' }}>
          <AnimatedNumberTicker
            fontSize={50}
            digits={animatedNumber}
            sensitivity={10}
            valueCallBack={callbackHandler}
            maxValue={1000}
          />
        </View>
        <Button title={'increase'} onPress={() => setAnimatedNumber((prev) => prev + 1)} />
        <Button title={'decrease'} onPress={() => setAnimatedNumber((prev) => prev - 1)} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#616161',
    backgroundColor: '#000000',
    // backgroundColor: '#FFFFFF',
  },
});
