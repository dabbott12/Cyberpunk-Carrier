import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from './assets/Images';

export default class Pipe extends Component {
    render() {
        const width = 50;
        const height = 250;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - width;

        const pipeRatio = 160 / width;
        const pipeHeight = 33 * pipeRatio;
        const pipeIteration = Math.ceil(height / pipeHeight);

        return (
            <View
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height,
                overflow: 'hidden',
                flexDirection: 'column'
            }}>
                { Array.apply(null, Array(pipeIteration)).map(( el, idx ) => {
                    return <Image style={{ width: width, height: pipeHeight }} key={ idx } resizeMode="stretch" source={ Images.pipeCore } />
                }) }
            </View>
        )
    }
}