import { PureComponent } from 'react';
import { Circle } from '@shopify/react-native-skia';
import { Dimensions } from 'react-native';

const RADIUS = 13;
const COLOUR = 'yellow';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class PlayerRenderer extends PureComponent {
  render() {
    if (!this.props.position) {
      return;
    }
    return <Circle r={RADIUS} cx={windowWidth / 2} cy={windowHeight / 2} color={COLOUR} />;
  }
}

export default PlayerRenderer;
