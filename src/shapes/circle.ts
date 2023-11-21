import { Bodies, Body } from "matter-js";

export function generateRandomCircles(
  areaWidth: number,
  count = 10,
  minRadius = 30,
  maxRadius = 80
) {
  const circles: Body[] = []; // Initialize the circles array

  for (let i = 0; i < count; i++) {
    const radius = Math.random() * (maxRadius - minRadius) + minRadius;
    const x = Math.random() * (areaWidth - radius * 2) + radius;
    const circle = Bodies.circle(x, 10, radius, {
        restitution: 0.5
    });
    circles.push(circle); // Add the circle to the circles array
  }

  return circles;
}
