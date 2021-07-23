import { StatusBar } from 'expo-status-bar';
import { Dimensions } from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { GameEngine } from 'react-native-game-engine';
import { TouchableOpacity, Image } from 'react-native';
import Matter from 'matter-js';
import Bird from './Bird';
import Pipe from './Pipe';
import Floor from './Floor';
import Physics from './Physics';
import Images from './assets/Images';


var Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 250,
  PIPE_WIDTH: 100,
  BIRD_WIDTH: 50,
  BIRD_HEIGHT: 41
}



export default class App extends Component {
  constructor(props){
    super(props);
    this.gameEngine = null;
    this.entities = this.setupWorld();

    this.state = {
      running: true
    }
  }

  setupWorld = () => {
    let engine = Matter.Engine.create({ enableSleeping: false });
    let world = engine.world;
    world.gravity.y = 0;

    let bird = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);
    let floor1 = Matter.Bodies.rectangle(Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT + 85, Constants.MAX_WIDTH + 4, 50, { isStatic: true });
    let floor2 = Matter.Bodies.rectangle(Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2), Constants.MAX_HEIGHT + 85, Constants.MAX_WIDTH + 4, 50, { isStatic: true });
 

 
    Matter.World.add(world, [bird, floor1, floor2]);

    Matter.Events.on(engine, "collisionStart", (event) => {
        let pairs = event.pairs;

        this.gameEngine.dispatch({ type: "game-over" });
    });


    return {
      physics: { engine: engine, world: world },
      bird: { body: bird, pose: 1, renderer: Bird },
      floor1: { body: floor1, renderer: Floor },
      floor2: { body: floor2, renderer: Floor },


    }
  }

  onEvent = (e) => {
      if (e.type === "game-over")
      {
        this.setState({
          running: false
        })
      }
  }

  reset = () => {
      this.gameEngine.swap(this.setupWorld());
      this.setState({
        running: true
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <Image source={ Images.background } style={ styles.backgroundImage } resizeMode="stretch" />
        <GameEngine
          ref={ (ref) => { this.gameEngine = ref; } }
          style={ styles.gameContainer }
          systems={ [Physics] }
          running={ this.state.running }
          onEvent={ this.onEvent }
          entities={ this.entities }>
          <StatusBar hidden={ true } />
        </GameEngine>
        { !this.state.running && <TouchableOpacity onPress={ this.reset } style={ styles.fullScreenButton }>
          <View style={ styles.fullScreen }>
            <Text style={ styles.gameOverText }>Game Over</Text>
          </View>
        </TouchableOpacity>}

      </View>
    )
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT
  },
  gameContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  fullScreenButton: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1
  },
  fullScreen: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'black',
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  gameOverText: {
    color: 'white',
    fontSize: 48
  }
});
