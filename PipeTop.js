import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Images from './assets/Images';

export default class PipeTop extends Component {
    render() {
        const width = 50;
        const height = 41;
        const x = this.props.body.position.x - width / 2;
        const y = this.props.body.position.y - width / 2;


        return (
            
            <Image
            style={{
                position: 'absolute',
                top: y,
                left: x,
                width: width,
                height: height
                
            }}  resizeMode="stretch" 
                source={Images.pipe_top} />
                
        )
    }
}