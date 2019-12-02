const fs = require("fs");

const ADDITION = 1;
const MULTIPLICATION = 2;
const END = 99;
const FINAL_WANTED = 19690720;

const main = () => {
  fs.readFile("./data/day-2-input.txt", "utf8", (err, data) => {
    if (err) throw err;

    let noun = 0;
    let verb = 0;

    for (noun = 0; noun <= 99; noun++) {
      for (verb = 0; verb <= 99; verb++) {
        const opcodes = data.split(",").map(x => parseInt(x));

        // Part of the puzzle
        opcodes[1] = noun;
        opcodes[2] = verb;

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

        if (opcodes[0] === FINAL_WANTED) {
          console.log(100 * noun + verb);
          process.exit();
        }
      }
    }
  });
};

main();
