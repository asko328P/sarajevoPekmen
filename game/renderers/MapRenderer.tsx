import { Circle, Line, Path, Points, vec } from '@shopify/react-native-skia';
import React, { PureComponent } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { number } from 'prop-types';

const RADIUS = 20;

interface geometry {
  type: string;
  coordinates: [[number, number]];
}

class MapRenderer extends PureComponent {
  render() {
    if (!this.props.allLines) {
      return;
    }
    const lineOnScreen = this.props.allLines;
    let path = '';
    lineOnScreen.forEach((lineArray: any) => {
      path += ' M';
      lineArray.forEach((point: any) => {
        path += `${point[0]} ${point[1]} L `;
      });
      path = path.substring(0, path.length - 2);
    });
    // if (points.length < 3) {
    //   return;
    // }
    path = path.substring(0, path.length - 2);
    return <Path path={path} color="lightblue" style="stroke" strokeJoin={'round'} strokeWidth={4} />;

    // return lineOnScreen.map((coordinate: [number, number], index: number, array: [[number, number]]) => {
    //   if (index === 0) {
    //     return;
    //   }
    //   const p1vec = vec(coordinate[0], coordinate[1]);
    //   const p2vec = vec(array[index - 1][0], array[index - 1][1]);
    //   return <Line key={`line${coordinate[0]}${myOwnPos[0]}${index}`} p1={p1vec} p2={p2vec} color={'blue'} strokeWidth={10} />;
    // });
  }
}

export default MapRenderer;
