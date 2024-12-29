import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedProps,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import Svg, { ClipPath, Defs, Ellipse, Path, RadialGradient, Stop } from 'react-native-svg';
import { BlurMask, Canvas, Group, Rect } from '@shopify/react-native-skia';
import LineMarker from '~/components/SkiaScrollPicker/LineMarker';
import { useMemo, useState } from 'react';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  height?: number;
  maxValue?: number;
  spacing?: number;
  lineWidth?: number;
  numberOfLines?: number;
};
const SkiaScrollPicker = ({ height = 30, spacing = 5, lineWidth = 2, numberOfLines = 40 }: Props) => {
  const [componentWidth, setComponentWidth] = useState(0);
  const [scrollValue, setScrollValue] = useState<number>(0);

  const array = useMemo(() => {
    return Array.from(Array(numberOfLines).keys());
  }, [numberOfLines]);

  const animatedRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(animatedRef);
  const derivedScrollOffset = useDerivedValue(() => {
    console.log(scrollOffset.value / (numberOfLines * (spacing + lineWidth + 50)));
    let offset = scrollOffset.value / (numberOfLines * (spacing + lineWidth + 50));
    return (scrollOffset.value / numberOfLines) * (spacing + lineWidth + 50);
  });

  const onLayoutHandler = (e: any) => {
    setComponentWidth(e.nativeEvent.layout.width);
  };

  const scrollOffsetHandler = (e: any) => {
    setScrollValue(e.nativeEvent.contentOffset.x);
  };
  return (
    <View onLayout={onLayoutHandler}>
      <Canvas style={[{ height }, styles.canvasHolder]}>
        <Group>
          {array.map((_, index) => (
            <LineMarker
              key={index}
              x={index * (spacing + lineWidth)}
              lineWidth={lineWidth}
              height={height}
              index={index}
              spacing={spacing}
              scrollOffset={scrollOffset}
            />
          ))}
          {/*<LineMarker x={4} lineWidth={3} height={height} index={3} spacing={spacing} />*/}
        </Group>
      </Canvas>
      <Text style={{ color: 'white' }}>{Number(scrollValue).toFixed(0)}</Text>
      <Animated.ScrollView
        onScroll={scrollOffsetHandler}
        showsHorizontalScrollIndicator={false}
        ref={animatedRef}
        horizontal
        contentContainerStyle={[
          {
            width: numberOfLines * (spacing + lineWidth + 13),
          },
          styles.contentContainer,
        ]}
      />
    </View>
  );
};

export default SkiaScrollPicker;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#000000',
    height: 40,
  },
  canvasHolder: {
    backgroundColor: '#000000',
  },
});
