import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Component } from 'react/cjs/react.production.min';

export default class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View> style={this.styles.container}
        <Text>Hi there</Text>
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
