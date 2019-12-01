const fs = require("fs");

const main = async () => {
  fs.readFile("./data/day-1-input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const masses = data
      .split("\n")
      .map(mass => parseInt(mass))
      .filter(mass => !isNaN(mass));

    const totalFuel = masses.reduce(
      (fuel, currentMass) => fuel + (Math.floor(currentMass / 3) - 2),
      0
    );

    console.log(`Total fuel needed for modules: ${totalFuel}`);
  });
};

main();
