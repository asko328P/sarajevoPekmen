import { ScrollView, StyleSheet, Text, View, VirtualizedList } from 'react-native';
import { useEffect, useMemo, useRef, useState } from 'react';
import Animated, {
  BounceInRight,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
  FadeInUp,
  FadeOut,
  FadeOutDown,
  FadeOutUp,
  FlipInXDown,
  FlipInXUp,
  LinearTransition,
  PinwheelIn,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useScrollViewOffset,
  useSharedValue,
  ZoomOut,
} from 'react-native-reanimated';

type AnimatedDigit = {
  value: string;
  animationType: 'increasing' | 'decreasing' | 'constant';
};
type Props = {
  digits: number;
  fontSize?: number;
  sensitivity?: number;
  valueCallBack: (arg: number) => void;
  maxValue: number;
};
const AnimatedNumberTicker = ({ digits, fontSize = 30, valueCallBack, sensitivity = 10, maxValue = 9999 }: Props) => {
  // const offsetY = useSharedValue(0);
  //
  // const scrollHandler = useAnimatedScrollHandler((event) => {
  //   offsetY.value = event.contentOffset.y;
  // });

  const scrollViewRef = useRef<ScrollView>(null);

  const [componentHeight, setComponentHeight] = useState(0);
  const [textHeight, setTextHeight] = useState(0);

  const previousAnimatedDigits = useRef<AnimatedDigit[]>([]);
  const previousValue = useRef<number>(0);

  const memoizedDigits: AnimatedDigit[] = useMemo(() => {
    const tempDigits = digits.toString().split('');
    const otherDigits = tempDigits.map((value, index, array) => {
      const respectiveDigitIndexOld = previousAnimatedDigits.current.length - array.length + index;
      if (respectiveDigitIndexOld < 0 || respectiveDigitIndexOld > previousAnimatedDigits.current.length - 1) {
        const returnDigit: AnimatedDigit = { value, animationType: 'constant' };
        return returnDigit;
      }

      if (digits > previousValue.current) {
        const returnDigit: AnimatedDigit = { value, animationType: 'increasing' };
        return returnDigit;
      } else {
        const returnDigit: AnimatedDigit = { value, animationType: 'decreasing' };
        return returnDigit;
      }
    });
    previousAnimatedDigits.current = otherDigits;
    previousValue.current = digits;
    return otherDigits;
  }, [digits]);

  useEffect(() => {
    if (digits) {
      scrollViewRef.current?.scrollTo({ y: (textHeight * digits) / sensitivity, animated: false });
    }
  }, [textHeight]);

  const onComponentLayout = (e: any) => {
    setComponentHeight(e.nativeEvent.layout.height);
  };
  const onTextLayout = (e: any) => {
    setTextHeight(e.nativeEvent.layout.height);
  };
  const scrollHandler = (e: any) => {
    // console.log('scroll offset', e.nativeEvent.contentOffset.y);
    const position = (e.nativeEvent.contentOffset.y / textHeight) * sensitivity;
    valueCallBack(Math.round(position));
  };
  return (
    <View onLayout={onComponentLayout}>
      <View style={styles.container}>
        {memoizedDigits.map((digit, index) => (
          <Animated.View
            layout={LinearTransition}
            key={`${digit.value}:${index}`}
            entering={
              digit.animationType === 'increasing'
                ? FlipInXUp.duration(180)
                : digit.animationType === 'decreasing'
                  ? FlipInXDown.duration(180)
                  : digit.animationType === 'constant'
                    ? FadeInRight.duration(300)
                    : undefined
            }
            exiting={
              digit.animationType === 'increasing'
                ? ZoomOut.duration(150)
                : digit.animationType === 'decreasing'
                  ? ZoomOut.duration(150)
                  : digit.animationType === 'constant'
                    ? PinwheelIn.duration(100)
                    : undefined
            }
            style={styles.digitHolder}>
            <Text adjustsFontSizeToFit style={[{ fontSize }, styles.text]}>
              {digit.value}
            </Text>
          </Animated.View>
        ))}
        <Text
          onLayout={onTextLayout}
          style={{
            fontSize,
            width: 0,
            opacity: 0,
          }}>
          {'1234567890'}
        </Text>
      </View>
      <ScrollView
        bounces={false}
        bouncesZoom={false}
        contentOffset={{ x: 0, y: (textHeight * digits) / sensitivity }}
        ref={scrollViewRef}
        decelerationRate={'fast'}
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        style={[styles.scrollView, { height: componentHeight }]}
        contentContainerStyle={{ height: (textHeight * maxValue) / sensitivity + textHeight }}
      />
    </View>
  );
};

export default AnimatedNumberTicker;

const styles = StyleSheet.create({
  scrollView: {
    width: '100%',
    position: 'absolute',
    backgroundColor: 'purple',
    opacity: 0,
  },
  text: {
    // fontSize: 100,
    color: '#FFFFFF',
  },
  digitHolder: {
    maxWidth: 40,
    flex: 1,
    aspectRatio: 3 / 4,
    // backgroundColor: '#0080ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    overflow: 'hidden',
    gap: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
    // backgroundColor: '#bf0000',
    alignItems: 'center',
    width: '100%',
    // height: 120,
  },
});
