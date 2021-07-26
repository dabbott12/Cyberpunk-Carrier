import * as React from 'react';
import { FlatList, Button, View, Text, SafeAreaView } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Sounds from './Sounds';

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
      <View>
        <FlatList
          data={this.state.FlatListItems}
          ItemSeparatorComponent={this.ListViewItemSeparator}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View
              key={item.user_id}
              style={{ backgroundColor: "white", padding: 20 }}
            >

              <Text>Date: {item.user_date}</Text>
              <Text>Score: {item.user_score}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}