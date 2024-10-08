//@ts-nocheck
import { Circle } from '@shopify/react-native-skia';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';

const RADIUS = 20;

class Finger extends PureComponent {
  render() {
    const x = this.props.position[0] - RADIUS / 2;
    const y = this.props.position[1] - RADIUS / 2;
    return <Circle cx={x} cy={y} r={10} color="red" />;
  }
}

const styles = StyleSheet.create({
  finger: {
    borderColor: '#CCC',
    borderWidth: 4,
    borderRadius: RADIUS * 2,
    width: RADIUS * 2,
    height: RADIUS * 2,
    backgroundColor: 'pink',
    position: 'absolute',
  },
});

export { Finger };
