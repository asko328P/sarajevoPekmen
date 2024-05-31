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
    const vertices = [vec(-7, -17), vec(0, -24), vec(7, -17)];

    const colors = ['#000000', '#fff302', '#000000'];
    const rotationAngle = (360 + this.props.desiredMovementAngle) * -1 + 90;
    return (
      <Group>
        <Group
          transform={[
            { translateX: windowWidth / 2 },
            { translateY: windowHeight / 2 },
            { rotate: degreesToRadians(rotationAngle) },
          ]}>
          <Vertices vertices={vertices} colors={colors} />
        </Group>
        <Circle r={RADIUS} cx={windowWidth / 2} cy={windowHeight / 2} color={COLOUR} />
      </Group>
    );
  }
}

export default PlayerRenderer;
