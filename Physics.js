import Matter from 'matter-js';
import { Dimensions } from 'react-native';

var Constants = {
  MAX_WIDTH: Dimensions.get("screen").width,
  MAX_HEIGHT: Dimensions.get("screen").height,
  GAP_SIZE: 200,
  PIPE_WIDTH: 100
}



const Physics = (entities, { touches, time }) => {
    let engine = entities.physics.engine;
    let bird = entities.bird.body;


    touches.filter(t => t.type === "press").forEach(t => {
        Matter.Body.setVelocity( bird, {x: 0, y: -5});
        //Matter.Body.applyForce(bird, { x: bird.position.x, y: bird.position.y}, { x: 0.0, y: -0.1 });
    });



    Matter.Engine.update(engine, time.delta);

    return entities;
}

export default Physics;