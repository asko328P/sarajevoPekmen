//@ts-nocheck
import { PureComponent } from 'react';
import { Circle, Group, Text, vec, Vertices } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { degreesToRadians } from '~/utility/geometry';

const RADIUS = 13;
const COLOUR = 'yellow';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PlayerRenderer extends PureComponent {
  render() {
    if (!this.props.position || !this.props.color) {
      return;
    }
    const vertices = [vec(-7, -17), vec(0, -24), vec(7, -17)];

    const colors = ['#000000', this.props.color, '#000000'];
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
          <Text x={0} y={23} text={`${Number(this.props.desiredMovementAngle).toFixed(2)}`} color={'white'} />
        </Group>
        <Circle r={RADIUS} cx={windowWidth / 2} cy={windowHeight / 2} color={this.props.color} />
      </Group>
    );
  }
}

export default PlayerRenderer;
