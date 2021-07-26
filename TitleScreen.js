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
            <Image style={{ height: 200, width: '100%', top: 150 }} source={ Images.logo }>
            </Image>
      <View style={{ flex: 1 , padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>

          </Text>

          <TouchableNativeFeedback onPress={() => navigation.navigate('Game')} >
            <Image style={{ flex: 1, height: 150, width: 150, resizeMode:'contain' }} source={ Images.play }/>     
          </TouchableNativeFeedback>

          <Text>{'\n'}</Text>
          <Button
            onPress={() => navigation.navigate('Score')}
            title="High Scores"
          />
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