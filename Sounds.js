import { Audio } from 'expo-av';
import React, { Component, useRef, useEffect } from 'react';

export default class Sounds extends Component {
 render() {
   return (
     
	this.flap.playAsync()
     
   );
 }

 async flapComponentDidMount() {
  this.flap = new Audio.Sound();
  try {
    await this.flap.loadAsync(
      require("./assets/sounds/flap.wav")
    );
    await this.flap.setIsLoopingAsync(false);
    await this.flap.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

 async cheerComponentDidMount() {
  this.cheer = new Audio.Sound();
  try {
    await this.cheer.loadAsync(
      require("./assets/sounds/cheer.mp3")
    );
    await this.cheer.setIsLoopingAsync(false);
    await this.cheer.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}
}



    