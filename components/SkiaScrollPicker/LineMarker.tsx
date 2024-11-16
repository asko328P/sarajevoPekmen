import { BlurMask, Group, interpolateColors, Rect } from '@shopify/react-native-skia';
import { Extrapolation, interpolate, SharedValue, useDerivedValue } from 'react-native-reanimated';

type Props = {
  x: number;
  lineWidth: number;
  height: number;
  index: number;
  spacing: number;
  scrollOffset: SharedValue<number>;
};
const LineMarker = ({ x, lineWidth, height, index, spacing, scrollOffset }: Props) => {
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
      ['rgba(83,83,83,1)', 'rgb(255,67,67)', 'rgba(83,83,83,1)']
    );
  });
  const derivedBlurOpacity = useDerivedValue(() => {
    return interpolate(activeIndex.value, [index - 2, index, index + 2], [0, 1, 0]);
  });
  return (
    <Group>
      <Rect x={x} y={0} width={lineWidth} height={derivedHeight} color={'red'} opacity={derivedBlurOpacity}>
        <BlurMask blur={2} style="normal" />
      </Rect>
      <Rect x={x} y={0} width={lineWidth} height={derivedHeight} color={'red'} opacity={derivedBlurOpacity}>
        <BlurMask blur={2} style="normal" />
      </Rect>
      <Rect x={x} y={0} width={lineWidth} height={derivedHeight} color={derivedColor} />
    </Group>
  );
};

export default LineMarker;
