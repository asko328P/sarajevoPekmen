//@ts-nocheck
import { Circle, Line, Path, Points, vec, Group } from '@shopify/react-native-skia';
import React, { PureComponent } from 'react';

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
    //Generate SVG which is to be rendered,
    let path = '';
    lineOnScreen.forEach((lineArray: any) => {
      path += ' M';
      lineArray.forEach((point: any) => {
        path += `${point[0]} ${point[1]} L `;
      });
      path = path.substring(0, path.length - 2);
    });

    path = path.substring(0, path.length - 2);
    return (
      <Group>
        <Path path={path} color="blue" style="stroke" strokeJoin={'round'} strokeWidth={10} />
        <Path path={path} color="black" style="stroke" strokeJoin={'round'} strokeWidth={5} />
      </Group>
    );
    // return <Path path={path} color="lightblue" style="stroke" strokeJoin={'round'} strokeWidth={4} />;
  }
}

export default MapRenderer;
