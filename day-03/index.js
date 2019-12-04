const fs = require("fs");

// BON ALORS, CELUI LA, IL EST PAS MAINTENABLE HEIN. MAIS IL EST OPTI 😏

const UP = "U";
const DOWN = "D";
const LEFT = "L";
const RIGHT = "R";

const DIRECTION = 0;
const STEPS = 1;

const getDirectionAndSteps = value => {
  const [direction, ...steps] = value;

  return [direction, parseInt(steps.join(""))];
};

const computePoints = (accumulator, currentValue) => {
  const [direction, steps] = getDirectionAndSteps(currentValue);

  const prevPoint = accumulator[accumulator.length - 1];

  switch (direction) {
    case UP:
      accumulator.push({ ...prevPoint, y: prevPoint.y + steps });
      break;
    case DOWN:
      accumulator.push({ ...prevPoint, y: prevPoint.y - steps });
      break;
    case LEFT:
      accumulator.push({ ...prevPoint, x: prevPoint.x - steps });
      break;
    case RIGHT:
      accumulator.push({ ...prevPoint, x: prevPoint.x + steps });
      break;
    default:
      console.error("UNKNOWN DIRECTION...");
  }

  return accumulator;
};

const main = () => {
  fs.readFile("./data/day-3-input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const [wire1, wire2] = data.split("\n").map(str => str.split(","));

    const wire1Points = wire1.reduce(computePoints, [{ x: 0, y: 0 }]);
    const wire2Points = wire2.reduce(computePoints, [{ x: 0, y: 0 }]);

    const crosses = [];
    for (i = 0; i < wire2Points.length - 1; i++) {
      const w2first = wire2Points[i];
      const w2second = wire2Points[i + 1];

      for (j = 0; j < wire1Points.length - 1; j++) {
        const w1first = wire1Points[j];
        const w1second = wire1Points[j + 1];

        if (
          w2first.x === w2second.x &&
          w1first.y === w1second.y &&
          ((w2first.x <= w1first.x && w2first.x >= w1second.x) ||
            (w2first.x >= w1first.x && w2first.x <= w1second.x)) &&
          ((w1first.y <= w2first.y && w1first.y >= w2second.y) ||
            (w1first.y >= w2first.y && w1first.y <= w2second.y))
        ) {
          crosses.push({ x: w2first.x, y: w1first.y });
        }

        if (
          w1first.x === w1second.x &&
          w2first.y === w2second.y &&
          ((w2first.y <= w1first.y && w2first.y >= w1second.y) ||
            (w2first.y >= w1first.y && w2first.y <= w1second.y)) &&
          ((w1first.x <= w2first.x && w1first.x >= w2second.x) ||
            (w1first.x >= w2first.x && w1first.x <= w2second.x))
        ) {
          crosses.push({ x: w1first.x, y: w2first.y });
        }
      }
    }

    crosses.shift();

    console.log(
      Math.min(...crosses.map(point => Math.abs(point.x) + Math.abs(point.y)))
    );
  });
};

main();
