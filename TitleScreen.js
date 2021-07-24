import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const TitleScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
            INSERT LOGO HERE
          </Text>
          <Button
            onPress={() => navigation.navigate('Game')}
            title="Start Game"
          />
          <Text>{'\n'}</Text>
          <Button
            onPress={() => navigation.navigate('Score')}
            title="High Scores"
          />
        </View>
        <Text style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          Built by:
          {'\n'}
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