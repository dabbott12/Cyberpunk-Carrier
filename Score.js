import * as React from 'react';
import { FlatList, Button, View, Text, SafeAreaView, TouchableOpacity, TouchableNativeFeedback, Image, BackHandler } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Sounds from './Sounds';
import Images from './assets/Images'

const db = SQLite.openDatabase("UserDatabase.db");

export default class Score extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: []
    };
    db.transaction(tx => {
      tx.executeSql("SELECT * FROM table_user", [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View
        style={{ height: 0.2, width: "100%", backgroundColor: "#808080" }}
      />
    );
  };
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#dc1a22" }}>
          <TouchableNativeFeedback onPress={() => this.props.navigation.goBack()} >
            <Image style={{ top: 10, left: 10, height: 50, width: 100, resizeMode:'contain' }} source={ Images.back }/>     
          </TouchableNativeFeedback>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              key={item.user_id}
              style={{ backgroundColor: "#dc1a22", padding: 20 }}
            >
              <Text style={{ fontSize: 20, padding: 20, color: 'white', fontFamily: 'sans-serif-light', fontWeight: 'bold' }}>Score: {item.user_score}</Text>
              <Text style={{ fontSize: 16, padding: 20, color: 'white', fontFamily: 'sans-serif-light' }}>Date: {item.user_date}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}