import { PureComponent } from 'react';
import { Circle, Group, vec, Vertices } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { degreesToRadians } from '~/utility/geometry';

const RADIUS = 13;
const COLOUR = 'yellow';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PlayerRenderer extends PureComponent {
  render() {
    if (!this.props.position) {
      return;
    }
    // const vertices = [
    //   vec(windowWidth / 2, windowHeight / 2 - 22),
    //   vec(windowWidth / 2 + 7, windowHeight / 2 - 15),
    //   vec(windowWidth / 2 - 7, windowHeight / 2 - 15),
    // ];
    // const vertices = [vec(0, 22), vec(7, 15), vec(7, 15)];
    const vertices = [vec(-7, -17), vec(0, -24), vec(7, -17)];

    const colors = ['#000000', '#fff302', '#000000'];
    // const rotationAngle = 360 - 90 + this.props.desiredMovementAngle;
    const rotationAngle = (360 + this.props.desiredMovementAngle) * -1 + 90;
    return (
      <Group>
        <Group
          // origin={{ x: windowWidth / 2, y: windowHeight / 2 }}
          transform={[
            { translateX: windowWidth / 2 },
            { translateY: windowHeight / 2 },
            { rotate: degreesToRadians(rotationAngle) },
          ]}
          // transform={[{ rotate: rotationAngle * 0 }, { translateX: windowWidth / 2 }, { translateY: windowHeight / 2 }]}
        >
          <Vertices vertices={vertices} colors={colors} />
        </Group>
        <Circle r={RADIUS} cx={windowWidth / 2} cy={windowHeight / 2} color={COLOUR} />
      </Group>
    );

    // return <Circle r={RADIUS} cx={windowWidth / 2} cy={windowHeight / 2} color={COLOUR} />;
  }
}

export default PlayerRenderer;
