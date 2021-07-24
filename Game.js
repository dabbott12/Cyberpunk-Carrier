import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, Image, Button, TouchableHighlight } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Bird from './Bird';
import BirdBlue from './BirdBlue';
import Floor from './Floor';
import Physics, { resetPipes } from './Physics';
import Constants from './Constants';
import Images from './assets/Images';
import { NativeModules } from "react-native";
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase("UserDatabase.db");



const questions = ['2 + 2 = ?',
                 '6 - 0 = ?',
                 '5 + 3 = ?',
                 '9 - 2 = ?',
                 '8 + 2 = ?',
                 '1 + 1 = ?',
                 '5 + 5 = ?'];

const answers = ['4',
               '6',
               '8',
               '7',
               '10',
               '2',
               '10'];

const mcObj = [
    { a: '3', b: '4', c: '5' },
    { a: '9', b: '0', c: '6' },
    { a: '9', b: '8', c: '2' },
    { a: '11', b: '7', c: '18' },
    { a: '10', b: '6', c: '4' },
    { a: '11', b: '1', c: '2' },
    { a: '25', b: '0', c: '10' }
    ];


let counter = 0;
let birdCounter = 0;

let correctAnswers = 0;
let wrongAnswers = 0;

const Stack = createStackNavigator();
const delay = ms => new Promise(res => setTimeout(res, ms));

const Wait = async () => {
    await delay(1);
    NativeModules.DevSettings.reload();
}




export const generateRandom = () => {
        random = Math.floor((Math.random() * 8) + 1)
        return random;
    };



export default class Game extends Component {
    constructor(props){
        super(props);
        db.transaction(function(txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
            function(tx, res) {
                
                if (res.rows.length == 0) {
                    txn.executeSql("DROP TABLE IF EXISTS table_user", []);
                    txn.executeSql(
                        "CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_date DATE, user_score INT(10))",
                        []
                    );
                }
            }
      );
    });

        this.state = {
            running: true,
            score: 0,
            gameOver: false,
            FlatListItems: []
        };
        this.gameEngine = null;
        this.entities = this.setupWorld(); 
    }

    register_score = () => {

    const user_date  = new Date().toISOString().substring(0, 10);
    const user_score  = this.state.score;

          db.transaction(function(tx) {
            tx.executeSql(
              "INSERT INTO table_user (user_date, user_score) VALUES (?,?)",
              [user_date, user_score],
              (tx, results) => {
                console.log("Results", results.rowsAffected);

              }
            );
          });
  };

  view_score = () => {
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
  };



    setupWorld = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;
        world.gravity.y = 0.0;

        let bird = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);

        let floor1 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 2,
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WIDTH + 4,
            50,
            { isStatic: true }
        );

        let floor2 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WIDTH + 4,
            50,
            { isStatic: true }
        );

        let random = 0;

        Matter.World.add(world, [bird, floor1, floor2]);
        Matter.Events.on(engine, 'collisionStart', (event) => {
            var pairs = event.pairs;

            this.gameEngine.dispatch({ type: "math"});

        });

        return {
            physics: { engine: engine, world: world },
            floor1: { body: floor1, renderer: Floor },
            floor2: { body: floor2, renderer: Floor },
            bird: { body: bird, pose: 1, renderer: Bird},
        }
    }

    setupWorldBlue = () => {
        let engine = Matter.Engine.create({ enableSleeping: false });
        let world = engine.world;
        world.gravity.y = 0.0;

        let bird = Matter.Bodies.rectangle( Constants.MAX_WIDTH / 2, Constants.MAX_HEIGHT / 2, Constants.BIRD_WIDTH, Constants.BIRD_HEIGHT);

        let floor1 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH / 2,
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WIDTH + 4,
            50,
            { isStatic: true }
        );

        let floor2 = Matter.Bodies.rectangle(
            Constants.MAX_WIDTH + (Constants.MAX_WIDTH / 2),
            Constants.MAX_HEIGHT - 25,
            Constants.MAX_WIDTH + 4,
            50,
            { isStatic: true }
        );

        let random = 0;

        Matter.World.add(world, [bird, floor1, floor2]);
        Matter.Events.on(engine, 'collisionStart', (event) => {
            var pairs = event.pairs;

            this.gameEngine.dispatch({ type: "math"});

        });

        return {
            physics: { engine: engine, world: world },
            floor1: { body: floor1, renderer: Floor },
            floor2: { body: floor2, renderer: Floor },
            bird: { body: bird, pose: 1, renderer: BirdBlue},
        }
    }

    checkWrongAnswers = () => {
        if (wrongAnswers >= 3)
        {
            wrongAnswers = 0;
            correctAnswers = 0;
            this.setState({
                running: false,
                gameOver: true
            });
            this.gameOver();
            this.register_score();
        }

        else
        {
            this.setState({
                running: false
            });            
        }
    }

    checkCounter = () => {
        if (counter >= 7)
        {
            counter = 0;
        }
    }

    checkCorrectAnswers = () => {
        if (correctAnswers >= 3)
        {
            correctAnswers = 0;
            wrongAnswers = 0;
            
            if (birdCounter === 0)
            {
                birdCounter = 1;
                resetPipes();
                this.gameEngine.swap(this.setupWorldBlue());
                this.setState({
                    running: true
                });
            }

            else
            {
                birdCounter = 0;
                resetPipes();
                this.gameEngine.swap(this.setupWorld());
                this.setState({
                    running: true
                });                
            }


        }

        else
        {
            this.setState({
                running: false
            });            
        }
    }

    gameOver = () => {

        // write score to database

             this.setState({
                gameOver: true,
                running: false
            });
    }

    onEvent = (e) => {
        if (e.type === "game-over"){
            this.setState({
                running: false,
                gameOver: true
            });
        } else if (e.type === "score") {
            this.setState({
                score: this.state.score + 1
            })
        } else if (e.type === "math") {
            this.setState({
                running: false
            })
        }
    }

    resetA = () => {
        if (mcObj[counter].a === answers[counter])
        {
            counter ++;
            correctAnswers ++;
            this.checkCounter();
            this.checkCorrectAnswers();

        }

        else
        {
            counter ++;
            wrongAnswers ++;
            this.checkCounter();

            this.checkWrongAnswers();

            this.setState({
                running: false
            });
        }
    }

    resetB = () => {
        if (mcObj[counter].b === answers[counter])
        {
            counter ++;
            correctAnswers ++;
            this.checkCounter();
            this.checkCorrectAnswers();


        }

        else
        {
            counter ++;
            wrongAnswers ++;
            this.checkCounter();

            this.checkWrongAnswers();

            this.setState({
                running: false
            });
        }
    }

    resetC = () => {
        if (mcObj[counter].c === answers[counter])
        {
            counter ++;
            correctAnswers ++;
            this.checkCounter();
            this.checkCorrectAnswers();

        }

        else
        {
            counter ++;
            wrongAnswers ++;
            this.checkCounter();

            this.checkWrongAnswers();

            this.setState({
                running: false
            });
        }
    }

    gmeovr = () => {

        this.setState({
            running: false,
            gameOver: false
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Image source={Images.background} style={styles.backgroundImage} resizeMode="stretch" />
                <GameEngine
                    ref={(ref) => { this.gameEngine = ref; }}
                    style={styles.gameContainer}
                    systems={[Physics]}
                    running={this.state.running}
                    onEvent={this.onEvent}
                    entities={this.entities}>
                    <StatusBar hidden={true} />
                </GameEngine>
                <Text style={styles.score}>{this.state.score}</Text>
                
                {this.state.gameOver && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={ Wait } >

                
                    <Text style={{ position: 'absolute', top: 20, left: 20, fontSize: 32, color: 'black', textAlign: 'center' }}>Press to restart game</Text>
                    <View style={styles.fullScreenB}>
                        <Image style={{ width: Constants.MAX_WIDTH, height: 350, position: 'relative' }} source={Images.boardBlank} />
                        <Text style={{ position: 'absolute', top: 150, left: 80, fontSize: 32, color: 'white', textAlign: 'center' }}>Game Over ! :(</Text>
                        <Text style={{ position: 'absolute', top: 250, left: 60, fontSize: 24, color: 'white', textAlign: 'center' }}>Your high score was: { this.state.score }</Text>
                        
                       
                    </View>
                </TouchableOpacity>}
                {!this.state.running && !this.state.gameOver && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetA}>

                
                    <Text style={ styles.questionText }>{ mcObj[counter].a }</Text>
                    <View style={styles.fullScreenB}>
                        <Image style={{ width: Constants.MAX_WIDTH, height: 350, position: 'relative' }} source={Images.boardBlank} />
                        <Text style={{ position: 'absolute', top: 120, left: 40, fontSize: 28, color: 'white', textAlign: 'center' }}>Flappy needs your help!</Text>
                        <Text style={{ position: 'absolute', top: 160, left: 1, fontSize: 24, color: 'white', textAlign: 'center' }}>Answer 3 questions correctly to continue</Text>
                        <Text style={{ position: 'absolute', top: 250, left: 50, fontSize: 72, color: 'white', textAlign: 'center' }}>{ questions[counter] }</Text>
                        <Text style={{ position: 'absolute', top: 380, left: 20, fontSize: 18, color: 'white', textAlign: 'center' }}>Correct: { correctAnswers } Wrong: { wrongAnswers }</Text>
                    </View>
                </TouchableOpacity>}

                {!this.state.running && !this.state.gameOver && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetB}>

                    <Text style={ styles.questionText }>{ mcObj[counter].b }</Text>
                    <View style={styles.fullScreenA}>
                    </View>
                </TouchableOpacity>}

                {!this.state.running && !this.state.gameOver && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetC}>

                    <Text style={ styles.questionText }>{ mcObj[counter].c }</Text>
                    <View style={styles.fullScreenA}>
                    </View>
                </TouchableOpacity>}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        width: Constants.MAX_WIDTH,
        height: Constants.MAX_HEIGHT
    },
    gameContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    gameOverText: {
        color: 'white',
        fontSize: 48,
        
    },
    gameOverSubText: {
        color: 'black',
        fontSize: 24,
        textAlign: 'center'
        
    },
    questionText: {
    color: 'black',
    fontSize: 48,
        
    },

      button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 100,
        top: 375,
        right: 100,
        left: 0,
        bottom: 0,
        padding: 10,
        height: 85,
        width: Constants.MAX_WIDTH - 10,
        opacity: 1,
        marginTop: 16,
    },

      button2: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        borderRadius: 100,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        padding: 10,
        height: 85,
        width: Constants.MAX_WIDTH - 10,
        opacity: 1,
        marginTop: 16,
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'black',
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fullScreenA: {
    position: 'absolute',
    top: -400,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    opacity: 0.8,
    justifyContent: 'center',
    alignItems: 'center',
    },

    fullScreenB: {
    position: 'absolute',
    top: -450,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    opacity: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    },

    end: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: Constants.MAX_WIDTH,
    opacity: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
    },

    score: {
        position: 'absolute',
        color: 'white',
        fontSize: 72,
        top: 50,
        left: Constants.MAX_WIDTH / 2 - 20,
        textShadowColor: '#444444',
        textShadowOffset: { width: 2, height: 2},
        textShadowRadius: 2,
        
    },
    fullScreenButton: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1
    }
});
