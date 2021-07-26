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

 async confirmComponentDidMount() {
  this.confirm = new Audio.Sound();
  try {
    await this.confirm.loadAsync(
      require("./assets/sounds/conformation.wav")
    );
    await this.confirm.setIsLoopingAsync(false);
    await this.confirm.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

 async wrongComponentDidMount() {
  this.wrong = new Audio.Sound();
  try {
    await this.wrong.loadAsync(
      require("./assets/sounds/wrong1.mp3")
    );
    await this.wrong.setIsLoopingAsync(false);
    await this.wrong.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

 async gapComponentDidMount() {
  this.gap = new Audio.Sound();
  try {
    await this.gap.loadAsync(
      require("./assets/sounds/gapcrossing.wav")
    );
    await this.gap.setIsLoopingAsync(false);
    await this.gap.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

 async bgComponentDidMount() {
  this.bg = new Audio.Sound();
  try {
    await this.bg.loadAsync(
      require("./assets/sounds/bgmusic.mp3")
    );
    await this.bg.setIsLoopingAsync(true);
    await this.bg.playAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

}



    