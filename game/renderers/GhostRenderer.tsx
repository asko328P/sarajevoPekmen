//@ts-nocheck
import { PureComponent } from 'react';
import { Circle, Group, vec, Vertices, Text } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';
import { degreesToRadians } from '~/utility/geometry';

const RADIUS = 13;
const COLOUR = 'yellow';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PlayerRenderer extends PureComponent {
  render() {
    if (!this.props.position || !this.props.color || !this.props.x || !this.props.y) {
      return;
    }
    const vertices = [vec(-7, -17), vec(0, -24), vec(7, -17)];

    const colors = ['#000000', this.props.color, '#000000'];
    const rotationAngle = (360 + this.props.desiredMovementAngle) * -1 + 90;
    return (
      <Group>
        <Group
          transform={[{ translateX: this.props.x }, { translateY: this.props.y }, { rotate: degreesToRadians(rotationAngle) }]}>
          <Vertices vertices={vertices} colors={colors} />
          <Text x={0} y={23} text={`${Number(this.props.desiredMovementAngle).toFixed(2)}`} color={'white'} />
        </Group>
        <Circle r={RADIUS} cx={this.props.x} cy={this.props.y} color={this.props.color} />
      </Group>
    );
  }
}

export default PlayerRenderer;
