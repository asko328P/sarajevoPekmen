import { Button, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, useRouter } from 'expo-router';
import SkiaScrollPicker from '~/components/SkiaScrollPicker/SkiaScrollPicker';
import SkiaScrollPicker2 from '~/components/SkiaScrollPicker2/SkiaScrollPicker2';
import AnimatedNumberTicker from '~/components/AnimatedNumberTicker/AnimatedNumberTicker';
import { useState } from 'react';
import SquishButton from '~/components/SquishButton/SquishButton';

export default function Page() {
  const router = useRouter();

  const [animatedNumber, setAnimatedNumber] = useState(9996);

  const navigateToGameScreen = () => {
    router.push('/gameScreen');
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
      <Button color={'#1e9aff'} onPress={navigateToGameScreen} title={'go to game screen'} />
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
