import React, { Component } from "react";
import { View, Image } from "react-native";
import Images from './assets/Images';

export default class Floor extends Component {
    render() {
        const width = this.props.body.bounds.max.x - this.props.body.bounds.min.x;
        const height = 300;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - height + 210;

        const imageIterations = Math.ceil(width / height);

        return (
            <View
                style={{
                    position: "absolute",
                    left: x,
                    top: y,
                    width: width,
                    height: height,
                    overflow: 'hidden',
                    flexDirection: 'row'
                }}>
                {Array.apply(null, Array(imageIterations)).map(( el, idx) => {
                    return <Image style={{ width: height, height: height }} key={idx} resizeMode="repeat" source={Images.floor} />
                })}
            </View>
    );
  }
}
