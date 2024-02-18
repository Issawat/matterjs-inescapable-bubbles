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
    const circle = Bodies.circle(x, 0, radius, {
      restitution: 0.5,
      render: {
        sprite: {
          texture:
            "https://png.monster/wp-content/uploads/2022/08/png.monster-86.png",
          xScale: radius * 0.005,
          yScale: radius * 0.005,
        },
      },
    });
    circles.push(circle); // Add the circle to the circles array
  }

  return circles;
}
