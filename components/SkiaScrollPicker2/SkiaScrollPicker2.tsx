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
import LineMarker from '~/components/SkiaScrollPicker2/LineMarker';
import { useMemo, useState } from 'react';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type Props = {
  width: number;
  height?: number;
  maxValue?: number;
  spacing?: number;
  lineWidth?: number;
  numberOfLines?: number;
};
const SkiaScrollPicker2 = ({ width, height = 30, spacing = 5, lineWidth = 2, numberOfLines = 40 }: Props) => {
  const [scrollValue, setScrollValue] = useState<number>(0);
  const [componentWidth, setComponentWidth] = useState(0);

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

  const scrollOffsetHandler = (e: any) => {
    setScrollValue(e.nativeEvent.contentOffset.x);
  };
  const onLayoutHandler = (e: any) => {
    setComponentWidth(e.nativeEvent.layout.width);
  };
  const computedSpacing = useMemo(() => {
    const requiredSpacingToFillSpace = (componentWidth - (numberOfLines - 2) * lineWidth) / numberOfLines;
    return requiredSpacingToFillSpace;
  }, [lineWidth, numberOfLines, componentWidth]);
  return (
    <View onLayout={onLayoutHandler}>
      <Text style={{ color: 'white', textAlign: 'center' }}>{Number(scrollValue).toFixed(0)}</Text>
      <Animated.ScrollView
        onScroll={scrollOffsetHandler}
        showsHorizontalScrollIndicator={false}
        ref={animatedRef}
        horizontal
        contentContainerStyle={[{ paddingHorizontal: componentWidth / 2, height: height }, styles.contentContainer]}>
        {/*<LineMarker scrollOffset={scrollOffset} x={4} lineWidth={3} height={height} index={3} spacing={spacing} />*/}

        <Canvas style={[{ height, width: componentWidth }, styles.canvasHolder]}>
          <Group>
            {array.map((_, index) => (
              <LineMarker
                numberOfLines={numberOfLines}
                key={index}
                x={index * (computedSpacing + lineWidth)}
                lineWidth={lineWidth}
                height={height}
                index={index}
                spacing={computedSpacing}
                scrollOffset={scrollOffset}
              />
            ))}
            {/*<LineMarker x={4} lineWidth={3} height={height} index={3} spacing={spacing} />*/}
          </Group>
        </Canvas>
      </Animated.ScrollView>
    </View>
  );
};

export default SkiaScrollPicker2;

const styles = StyleSheet.create({
  contentContainer: {
    // backgroundColor: '#502828',
  },
  canvasHolder: {
    backgroundColor: '#000000',
  },
});
