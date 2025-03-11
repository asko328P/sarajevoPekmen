import { BlurMask, Group, interpolateColors, Rect } from '@shopify/react-native-skia';
import { Extrapolation, interpolate, SharedValue, useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';
import { useLayoutEffect } from 'react';

type Props = {
  x: number;
  lineWidth: number;
  height: number;
  index: number;
  spacing: number;
  scrollOffset: SharedValue<number>;
  numberOfLines: number;
};
const LineMarker = ({ x, lineWidth, height, index, spacing, scrollOffset, numberOfLines }: Props) => {
  const activeIndex = useDerivedValue(() => {
    return scrollOffset.value / (lineWidth + spacing);
  });

  const derivedHeight = useDerivedValue(() => {
    return interpolate(
      activeIndex.value,
      [index - 2, index - 1, index, index + 1, index + 2], // input range [-1 ,0 , 1]
      [height / 3, height / 2, height, height / 2, height / 3], // output range
      Extrapolation.CLAMP
    );
  });
  const derivedColor = useDerivedValue(() => {
    return interpolateColors(
      activeIndex.value,
      [index - 2, index, index + 2],
      ['rgba(83,83,83,1)', `hsl(${(index / numberOfLines) * 360}, 100%, 50%)`, 'rgba(83,83,83,1)']
    );
  });
  const derivedBlurOpacity = useDerivedValue(() => {
    return interpolate(activeIndex.value, [index - 2, index, index + 2], [0, 1, 0]);
  });

  return (
    <Group>
      <Rect
        x={x}
        y={0}
        width={lineWidth}
        height={derivedHeight}
        color={`hsl(${(index / numberOfLines) * 360}, 100%, 50%)`}
        opacity={derivedBlurOpacity}>
        <BlurMask blur={4} style="normal" />
      </Rect>
      <Rect
        x={x}
        y={0}
        width={lineWidth}
        height={derivedHeight}
        color={`hsl(${(index / numberOfLines) * 360}, 100%, 50%)`}
        opacity={derivedBlurOpacity}>
        <BlurMask blur={2} style="normal" />
      </Rect>
      <Rect
        // transform={[{ skewX: Math.PI / 6 }]}
        origin={{
          x: x,
          y: height / 2,
        }}
        x={x}
        y={0}
        width={lineWidth}
        height={derivedHeight}
        color={derivedColor}
        // color={'blue'}
      />
    </Group>
  );
};

export default LineMarker;
