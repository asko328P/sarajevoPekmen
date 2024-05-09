import { Circle, Line, vec } from '@shopify/react-native-skia';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { number } from 'prop-types';

const RADIUS = 20;

interface geometry {
  type: string;
  coordinates: [[number, number]];
}

const myOwnPos = [18.3532269, 43.8467841];

class MapRenderer extends PureComponent {
  render() {
    if (!this.props.line) {
      return;
    }
    const lineOnScreen = this.props.lineOnScreen;

    return lineOnScreen.map((coordinate: [number, number], index: number, array: [[number, number]]) => {
      if (index === 0) {
        return;
      }
      const p1vec = vec(coordinate[0], (coordinate[1] * Math.PI) / 2);
      const p2vec = vec(array[index - 1][0], (array[index - 1][1] * Math.PI) / 2);

      return <Line key={`line${coordinate[0]}${myOwnPos[0]}${index}`} p1={p1vec} p2={p2vec} color={'blue'} strokeWidth={10} />;
    });
  }
}

export default MapRenderer;
