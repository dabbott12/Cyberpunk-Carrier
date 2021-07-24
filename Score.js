import * as React from 'react';
import { Button, View, Text, SafeAreaView } from 'react-native';

const Score = ({ navigation }) => {
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
            INSERT HIGH SCORES HERE IN TABLE
          </Text>

          <Text>{'\n'}</Text>
          <Button
            onPress={() => navigation.goBack()}
            title="Back"
          />
        </View>
        <Text style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>

        </Text>

      </View>
    </SafeAreaView>
  );
}

export default Score;