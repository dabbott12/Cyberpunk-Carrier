import { Audio } from 'expo-av';
import React, { Component, useRef, useEffect } from 'react';

export default class Sounds extends Component {
 render() {
   return (
     
	this.flap.unloadAsync()
     
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
    this.cheer.unloadAsync();
    this.wrong.unloadAsync();
    this.gap.unloadAsync();
    this.crash.unloadAsync();
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
    this.flap.unloadAsync();
    this.wrong.unloadAsync();
    this.gap.unloadAsync();
    this.crash.unloadAsync();
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
    this.flap.unloadAsync();
    this.cheer.unloadAsync();
    this.wrong.unloadAsync();
    this.gap.unloadAsync();
    this.crash.unloadAsync();
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
    this.flap.unloadAsync();
    this.cheer.unloadAsync();
    this.gap.unloadAsync();
    this.crash.unloadAsync();
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
    this.flap.unloadAsync();
    this.cheer.unloadAsync();
    this.wrong.unloadAsync();
    this.crash.unloadAsync();
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
    this.flap.unloadAsync();
    this.cheer.unloadAsync();
    this.wrong.unloadAsync();
    this.gap.unloadAsync();
    this.crash.unloadAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

 async crashComponentDidMount() {
  this.crash = new Audio.Sound();
  try {
    await this.crash.loadAsync(
      require("./assets/sounds/collision.wav")
    );
    await this.crash.setIsLoopingAsync(false);
    await this.crash.playAsync();
    this.flap.unloadAsync();
    this.cheer.unloadAsync();
    this.wrong.unloadAsync();
    this.gap.unloadAsync();
    // Your sound is playing!
  } catch (error) {
    // An error occurred!
  
}}

}