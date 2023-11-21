import {
  Engine,
  Render,
  Runner,
  Bodies,
  Composite,
  Mouse,
  MouseConstraint,
  Events,
  Body,
} from "matter-js";
import { generateRandomCircles } from "./shapes/circle";

const COLLISION_CIRCLE_RADIUS = 200;

//Target element
const element = document.body;

// create an engine
const engine = Engine.create({
  gravity: {
    x: 0,
    y: 0.5,
  },
});

// create a renderer
const render = Render.create({ element, engine });
Render.run(render);

// generate random circles
const circles = generateRandomCircles(render.canvas.width, 20);

const colliderCircle = Bodies.circle(
  -COLLISION_CIRCLE_RADIUS,
  -COLLISION_CIRCLE_RADIUS,
  COLLISION_CIRCLE_RADIUS,
  {
    isStatic: true,
    render: {
      visible: false,
    },
  }
);

const ceiling = Bodies.rectangle(400, 0, 810, 10, {
  isStatic: true,
});

const ground = Bodies.rectangle(400, 610, 810, 30, {
  isStatic: true,
});

const leftWall = Bodies.rectangle(0, 0, 10, 1200, {
  isStatic: true,
});
const rightWall = Bodies.rectangle(render.canvas.width, 0, 10, 1200, {
  isStatic: true,
});

// create mouse
const mouse = Mouse.create(element);

// add all of the bodies to the world
Composite.add(engine.world, [
  ...circles,
  colliderCircle,
  ground,
  leftWall,
  rightWall,
  ceiling,
]);

const mouseConstraint = MouseConstraint.create(engine, {
  mouse,
  constraint: {
    render: {
      visible: false,
    },
  },
});

Events.on(mouseConstraint, "mousemove", (event) => {
  Body.setPosition(colliderCircle, event.mouse.position);
});

Composite.add(engine.world, mouseConstraint);

render.mouse = mouse;

// create runner
const runner = Runner.create();

// run the engine
Runner.run(runner, engine);
