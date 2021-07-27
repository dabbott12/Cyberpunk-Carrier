import * as React from 'react';
import { Button, View, Text, SafeAreaView, Image, TouchableOpacity, TouchableNativeFeedback } from 'react-native';
import Sounds from './Sounds';
import Images from './assets/Images';

const sound = new Sounds();
const confirm = new Sounds();

const TitleScreen = ({ navigation }) => {
  sound.bgComponentDidMount();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#dc1a22" }}>
            <Image style={{ height: 200, width: '100%', top: 100 }} source={ Images.logo }>
            </Image>
      <View style={{ flex: 1 , padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            top: -25,
            marginTop: 50
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>

          </Text>
          <View style={{ flex: 1 , padding: 16}}>
          <TouchableNativeFeedback onPress={() => navigation.navigate('Game')} >
            <Image style={{ height: 150, width: 150, resizeMode:'contain' }} source={ Images.play }/>     
          </TouchableNativeFeedback>
          </View>
          <Text>{'\n'}</Text>
          <TouchableNativeFeedback onPress={() => navigation.navigate('Score')} >
            <Image style={{ height: 150, width: 150, resizeMode:'contain' }} source={ Images.highScores }/>     
          </TouchableNativeFeedback>
        </View>
        <Text style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'white'
          }}>
          Built by:
          {'\n\n'}
          Daniel Abbott
          {'\n'}
          Davis Fulton
          {'\n'}
          Gavin Sidhu
        </Text>

      </View>
    </SafeAreaView>
  );
}

export default TitleScreen;