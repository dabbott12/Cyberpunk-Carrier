import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from './assets/Images';

export default class Floor extends Component {
    render() {
        const width = 430;
        const height = 50;
        const x = this.props.body.position.x - 250;
        const y = this.props.body.position.y - width + 225;

        const imageIteration = Math.ceil(width / height);

        return (
            <View
                style={{
                    position: 'absolute',
                    top: y,
                    left: x,
                    width: width,
                    height: height,
                    overflow: 'hidden',
                    flexDirection: 'row'
                }}>
                    { Array.apply(null, Array(imageIteration)).map(( el, idx ) => {
                        return <Image style={{ width: height, height: height }} key={ idx } resizeMode="stretch" source={ Images.floor } />
                    }) }
            </View>
        )
    }
}