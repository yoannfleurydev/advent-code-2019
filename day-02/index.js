const fs = require("fs");

const ADDITION = 1;
const MULTIPLICATION = 2;
const END = 99;

const main = () => {
  fs.readFile("./data/day-2-input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const opcodes = data.split(",").map(x => parseInt(x));

    // Part of the puzzle
    opcodes[1] = 12;
    opcodes[2] = 2;

    for (i = 0; i < opcodes.length; i += 4) {
      const operation = opcodes[i];
      const op1 = opcodes[i + 1];
      const op2 = opcodes[i + 2];
      const result = opcodes[i + 3];

      if (operation === ADDITION) {
        opcodes[result] = opcodes[op1] + opcodes[op2];
      }
      if (operation === MULTIPLICATION) {
        opcodes[result] = opcodes[op1] * opcodes[op2];
      }
      if (operation === END) {
        break;
      }
    }

    console.log(opcodes[0]);
  });
};

main();
