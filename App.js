import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { GameEngine } from 'react-native-game-engine';
import Matter from 'matter-js';
import Bird from './Bird';
import Wall from './Wall';
import Physics from './Physics'

var Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 200,
  PIPE_WIDTH: 100
}

export default class App extends Component {
  constructor(props){
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 4, Constants.MAX_HEIGHT / 2, 50, 50);
    let floor = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT + 85, Constants.MAX_WIDTH, 50, { isStatic: true });
    let ceiling = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT -620, Constants.MAX_WIDTH, 50, { isStatic: true });

    Matter.World.add(world, [bird, floor, ceiling]);

    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, size: [80, 30], color: 'red', renderer: Bird },
      floor: { body: floor, size: [Constants.MAX_WIDTH, 50], color: 'green', renderer: Wall },
      ceiling: { body: ceiling, size: [Constants.MAX_WIDTH, 50], color: 'blue', renderer: Wall },
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <GameEngine
          ref={ (ref) => { this.gameEngine = ref; } }
          style={ styles.gameContainer }
          systems={[Physics]}
          entities={ this.entities } />
      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },

});
