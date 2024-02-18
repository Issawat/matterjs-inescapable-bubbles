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

const COLLISION_CIRCLE_RADIUS = 100;

//Target element
const element = document.body;

// create an engine
const engine = Engine.create({
  gravity: {
    x: 0,
    y: 1,
  },
});

// create a renderer
const render = Render.create({
  element,
  engine,
  options: {
    wireframes: false,
    width: element.clientWidth,
    height: element.clientHeight,
  },
});
Render.run(render);

// generate random circles
const circles = generateRandomCircles(render.canvas.width, 40);

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

const ceiling = Bodies.rectangle(
  400,
  0,
  element.clientWidth * window.devicePixelRatio * 1.5,
  20,
  {
    isStatic: true,
  }
);

const ground = Bodies.rectangle(
  0,
  element.clientHeight,
  element.clientWidth * window.devicePixelRatio * 1.5,
  20,
  {
    isStatic: true,
  }
);

const leftWall = Bodies.rectangle(
  0,
  0,
  20,
  element.clientHeight * window.devicePixelRatio * 2,
  {
    isStatic: true,
  }
);
const rightWall = Bodies.rectangle(
  render.canvas.width,
  0,
  20,
  element.clientHeight * window.devicePixelRatio * 2,
  {
    isStatic: true,
  }
);

// create mouse
const mouse = Mouse.create(element);

// add all of the bodies to the world
Composite.add(engine.world, [
  colliderCircle,
  ground,
  leftWall,
  rightWall,
  ceiling,
]);

let addCircleCount = 0;

const interval = setInterval(() => {
  Composite.add(engine.world, circles[addCircleCount]);
  addCircleCount++;
  if (addCircleCount >= circles.length) {
    clearInterval(interval);
  }
}, 100);

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
