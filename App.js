import React, { Component } from 'react';
import { Dimensions, StyleSheet, Text, View, StatusBar, Alert, TouchableOpacity, Image, Button, TouchableHighlight } from 'react-native';
import Matter from "matter-js";
import { GameEngine } from "react-native-game-engine";
import Bird from './Bird';
import Floor from './Floor';
import Physics, { resetPipes } from './Physics';
import Constants from './Constants';
import Images from './assets/Images';
import { NativeModules } from "react-native";


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

let correctAnswers = 0;
let wrongAnswers = 0;


export const generateRandom = () => {
        random = Math.floor((Math.random() * 8) + 1)
        return random;
    };



export default class App extends Component {
    constructor(props){
        super(props);

        this.state = {
            running: true,
            score: 0,
            gameOver: false
        };

        this.gameEngine = null;

        this.entities = this.setupWorld();

        
    }



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

    checkWrongAnswers = () => {
        if (wrongAnswers >= 3)
        {
            wrongAnswers = 0;
            correctAnswers = 0;
            this.setState({
                running: false,
                gameOver: true,
                score: 0
            });
            this.gameOver();
        }

        else
        {
            resetPipes();
            this.gameEngine.swap(this.setupWorld());
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

            resetPipes();
            this.gameEngine.swap(this.setupWorld());
            this.setState({
                running: true
            });
        }

        else
        {
            resetPipes();
            this.gameEngine.swap(this.setupWorld());
            this.setState({
                running: false
            });            
        }
    }

    gameOver = () => {
        // clear buttons and text
        // give gameover message
        // write score to database
        // go to main menu

        NativeModules.DevSettings.reload();
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

            resetPipes();
            this.gameEngine.swap(this.setupWorld());
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

            resetPipes();
            this.gameEngine.swap(this.setupWorld());
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

            resetPipes();
            this.gameEngine.swap(this.setupWorld());
            this.setState({
                running: false
            });
        }
    }

    resume = () => {
        resetPipes();
        this.gameEngine.swap(this.setupWorld());
        this.setState({
            running: false
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
                
                {!this.state.running && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetA}>

                
                    <Text style={ styles.questionText }>{ mcObj[counter].a }</Text>
                    <View style={styles.fullScreenA}>
                        <Text style={styles.gameOverSubText}>Flappy needs your help!</Text>
                        <Text style={styles.gameOverSubText}>Answer 3 questions correctly to continue!</Text>
                        <Text style={styles.gameOverSubText}>Correct: { correctAnswers } Wrong: { wrongAnswers }</Text>
                        <Text style={styles.questionText}>{ '\n' }{ questions[counter] }</Text>
                    </View>
                </TouchableOpacity>}

                {!this.state.running && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetB}>

                    <Text style={ styles.questionText }>{ mcObj[counter].b }</Text>
                    <View style={styles.fullScreenA}>
                    </View>
                </TouchableOpacity>}

                {!this.state.running && <TouchableOpacity style={styles.button} underlayColor="#193441" onPress={this.resetC}>

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
        top: 375,
        right: 100,
        left: 0,
        bottom: 0,
        padding: 10,
        height: 85,
        width: Constants.MAX_WIDTH,
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
