//@ts-nocheck
import { Circle, Line, Path, Points, vec, Group, DashPathEffect, CornerPathEffect } from '@shopify/react-native-skia';
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
        <Path strokeCap={'round'} path={path} color="blue" style="stroke" strokeJoin={'round'} strokeWidth={25}>
          <CornerPathEffect r={64} />
        </Path>
        <Path strokeCap={'round'} path={path} color="black" style="stroke" strokeJoin={'round'} strokeWidth={20}>
          <CornerPathEffect r={64} />
        </Path>
        <Path path={path} color="white" style="stroke" strokeJoin={'round'} strokeWidth={1}>
          <DashPathEffect intervals={[7, 10]} />
          <CornerPathEffect r={64} />
        </Path>
      </Group>
    );
    // return <Path path={path} color="lightblue" style="stroke" strokeJoin={'round'} strokeWidth={4} />;
  }
}

export default MapRenderer;
