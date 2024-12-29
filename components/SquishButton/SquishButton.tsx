import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { interpolate, useAnimatedProps, useDerivedValue, useSharedValue, withSpring } from 'react-native-reanimated';
import Svg, { ClipPath, Defs, Ellipse, Path, RadialGradient, Rect, Stop } from 'react-native-svg';
import { pad } from 'ansi-fragments';

type Props = {
  width: number;
  height: number;
  title: string;
  borderRadius?: number;
  squishAmount?: number;
  padding?: number;
};
const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedGradient = Animated.createAnimatedComponent(RadialGradient);

const SquishButton = ({ width = 300, height = 100, title, borderRadius = 20, squishAmount = 15, padding = 9 }: Props) => {
  const sharedX = useSharedValue(0);
  const sharedY = useSharedValue(0);
  const buttonTouched = useSharedValue(0);
  const pan = Gesture.Pan()
    .onBegin((e) => {
      sharedX.value = e.x;
      sharedY.value = e.y;
      buttonTouched.value = withSpring(squishAmount, {
        duration: 501,
        dampingRatio: 0.7,
        stiffness: 425,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 37.27,
      });
    })
    .onTouchesMove((onTouchesMoveEvent) => {
      sharedX.value = onTouchesMoveEvent.allTouches[0]?.x;
      sharedY.value = onTouchesMoveEvent.allTouches[0]?.y;
    })
    .onFinalize(() => {
      buttonTouched.value = withSpring(0, {
        duration: 801,
        dampingRatio: 0.4,
        stiffness: 425,
        overshootClamping: false,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 37.27,
      });
    });

  const topSquishX = useDerivedValue(() => {
    return interpolate(sharedX.value, [0, width], [width / 2 - width / 4, width / 2 + width / 4]);
  });
  const topSquishY = useDerivedValue(() => {
    return buttonTouched.value * interpolate(sharedY.value, [0, height], [0.3, 1]);
  });
  const bottomSquishX = useDerivedValue(() => {
    return interpolate(sharedX.value, [0, width], [width / 2 - width / 2, width / 2 + width / 2]);
  });
  const bottomSquishY = useDerivedValue(() => {
    return buttonTouched.value * interpolate(sharedY.value, [0, height], [1, 0.3]);
  });
  const rightCorner = useDerivedValue(() => {
    return buttonTouched.value * interpolate(sharedX.value, [0, width], [0.5, 0]);
  });
  const leftCorner = useDerivedValue(() => {
    return buttonTouched.value * interpolate(sharedX.value, [width, 0], [0.5, 0]);
  });
  const rightSquishX = useDerivedValue(() => {
    return rightCorner.value * 1.05;
  });
  const bottomRightCorner = useDerivedValue(() => {
    return buttonTouched.value * interpolate(sharedX.value, [0, width], [0.5, 0]);
  });
  const leftSquishX = useDerivedValue(() => {
    return leftCorner.value * 1.05;
  });

  const topCurveCoordinates = useDerivedValue(() => {
    return {
      //left side
      t0: {
        x: borderRadius,
        y: 0,
      },
      t1: {
        x: (borderRadius + (topSquishX.value + (topSquishX.value + borderRadius) / 2) / 2 - padding) / 2,
        y: 0,
      },
      t2: {
        x: (topSquishX.value + borderRadius) / 2,
        y: topSquishY.value / 2,
      },
      t3: {
        x: (topSquishX.value + (topSquishX.value + borderRadius) / 2) / 2 - padding,
        y: topSquishY.value,
      },
      t4: {
        x: topSquishX.value,
        y: topSquishY.value,
      },
      //right side
      t5: {
        x: (topSquishX.value + (topSquishX.value + width - borderRadius) / 2) / 2 + padding,
        y: topSquishY.value,
      },
      t6: {
        x: (topSquishX.value + width - borderRadius) / 2,
        y: topSquishY.value / 2,
      },
      t7: {
        x: ((topSquishX.value + width - borderRadius - padding) / 2 + width - borderRadius) / 2,
        y: 0,
      },
      t8: {
        x: width - borderRadius,
        y: 0,
      },
    };
  });
  const bottomCurveCoordinates = useDerivedValue(() => {
    return {
      //left side
      t0: {
        x: borderRadius,
        y: 0,
      },
      t1: {
        x: (borderRadius + (topSquishX.value + (topSquishX.value + borderRadius) / 2) / 2 - padding) / 2,
        y: 0,
      },
      t2: {
        x: (topSquishX.value + borderRadius) / 2,
        y: bottomSquishY.value / 2,
      },
      t3: {
        x: (topSquishX.value + (topSquishX.value + borderRadius) / 2) / 2 - padding,
        y: bottomSquishY.value,
      },
      t4: {
        x: topSquishX.value,
        y: bottomSquishY.value,
      },
      //right side
      t5: {
        x: (topSquishX.value + (topSquishX.value + width - borderRadius) / 2) / 2 + padding,
        y: bottomSquishY.value,
      },
      t6: {
        x: (topSquishX.value + width - borderRadius) / 2,
        y: bottomSquishY.value / 2,
      },
      t7: {
        x: ((topSquishX.value + width - borderRadius - padding) / 2 + width - borderRadius) / 2,
        y: 0,
      },
      t8: {
        x: width - borderRadius,
        y: 0,
      },
    };
  });

  const animatedPath = useAnimatedProps(() => {
    const d = `
      M${padding + leftCorner.value},${padding + borderRadius}
      Q${padding + leftCorner.value},${padding} ${topCurveCoordinates.value.t0.x + leftCorner.value + padding},${topCurveCoordinates.value.t0.y + padding}

      Q${topCurveCoordinates.value.t1.x},${topCurveCoordinates.value.t1.y + padding} ${topCurveCoordinates.value.t2.x},${topCurveCoordinates.value.t2.y + padding}
      Q${topCurveCoordinates.value.t3.x},${topCurveCoordinates.value.t3.y + padding} ${topCurveCoordinates.value.t4.x},${topCurveCoordinates.value.t4.y + padding}

      Q${topCurveCoordinates.value.t5.x},${topCurveCoordinates.value.t5.y + padding} ${topCurveCoordinates.value.t6.x},${topCurveCoordinates.value.t6.y + padding}
      Q${topCurveCoordinates.value.t7.x - rightCorner.value},${topCurveCoordinates.value.t7.y + padding} ${topCurveCoordinates.value.t8.x - rightCorner.value - padding},${topCurveCoordinates.value.t8.y + padding}

      Q${width - rightCorner.value - padding},${padding} ${width - padding - rightCorner.value},${padding + borderRadius}
      Q${width - rightCorner.value - rightSquishX.value - padding},${height / 2} ${width - padding - rightCorner.value},${height - padding - borderRadius}
      
      Q${width - padding - rightCorner.value},${height - padding} ${bottomCurveCoordinates.value.t8.x - padding - rightCorner.value},${height - bottomCurveCoordinates.value.t8.y - padding}
      Q${bottomCurveCoordinates.value.t7.x},${height - bottomCurveCoordinates.value.t7.y - padding} ${bottomCurveCoordinates.value.t6.x},${height - bottomCurveCoordinates.value.t6.y - padding}
      Q${bottomCurveCoordinates.value.t5.x},${height - bottomCurveCoordinates.value.t5.y - padding} ${bottomCurveCoordinates.value.t4.x},${height - bottomCurveCoordinates.value.t4.y - padding} 
      Q${bottomCurveCoordinates.value.t3.x},${height - bottomCurveCoordinates.value.t3.y - padding} ${bottomCurveCoordinates.value.t2.x},${height - bottomCurveCoordinates.value.t2.y - padding} 
      Q${bottomCurveCoordinates.value.t1.x},${height - bottomCurveCoordinates.value.t1.y - padding} ${bottomCurveCoordinates.value.t0.x + padding},${height - bottomCurveCoordinates.value.t0.y - padding} 
      Q${padding + leftCorner.value},${height - padding} ${padding + leftCorner.value},${height - padding - borderRadius}
      Q${padding + leftCorner.value + leftSquishX.value},${height / 2} ${padding + leftCorner.value},${padding + borderRadius}
      
    `;
    // const d = `
    //   M${padding},${padding + borderRadius}
    //   Q${padding},${padding} ${padding + borderRadius},${padding + topSquishY.value * 0.5}
    //   Q${topSquishX.value},${topSquishY.value + 5} ${width - borderRadius - padding},${padding}
    //   Q${width - padding},${padding} ${width - padding},${padding + borderRadius}
    //   L${width},${height - 5}
    //   Q${bottomSquishX.value},${height - bottomSquishY.value - 5} 0 ${height - 5}
    // `;
    return { d };
  });
  return (
    <GestureHandlerRootView>
      <GestureDetector gesture={pan}>
        <View style={[styles.container, { width, height: height }]}>
          <Svg style={styles.svg} viewBox={`0 0 ${width} ${height}`} width={width} height={height}>
            <Defs>
              <ClipPath id={'buttonClip'}>
                <AnimatedPath animatedProps={animatedPath} fillOpacity={1} />
              </ClipPath>
            </Defs>

            <Rect x={0} y={0} width={width} height={height} clipPath={'url(#buttonClip)'} fill={'#28dd84'} />

            <Defs>
              <RadialGradient id="grad" cx="250" cy="50" rx="50" ry="50" fx="260" fy="67" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor="#FFFFFF" stopOpacity="1" />
                <Stop offset="1" stopColor={'#a9c3ec'} stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Ellipse cx="250" cy="50" rx="50" ry="50" fill="url(#grad)" clipPath={'url(#buttonClip)'} />
            <Defs>
              <RadialGradient id="grad2" cx="270" cy="60" rx="40" ry="40" fx="260" fy="67" gradientUnits="userSpaceOnUse">
                <Stop offset="0" stopColor={'#28dd84'} stopOpacity="1" />
                <Stop offset="1" stopColor={'#28dd84'} stopOpacity="0" />
              </RadialGradient>
            </Defs>
            <Ellipse cx="270" cy="60" rx="50" ry="50" fill="url(#grad2)" clipPath={'url(#buttonClip)'} />
          </Svg>
          <Text style={styles.text}>{title}</Text>
        </View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default SquishButton;

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  svg: {
    position: 'absolute',
  },
  container: {
    // backgroundColor: '#b0f62b',
    // backgroundColor: '#000000',

    alignItems: 'center',
    justifyContent: 'center',
  },
});
