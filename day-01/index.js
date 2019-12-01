const fs = require("fs");

function getFuelForMass(mass) {
  return Math.floor(mass / 3) - 2;
}

function additionalFuel(fuel) {
  const addFuel = getFuelForMass(fuel);

  if (addFuel <= 0) {
    return 0;
  } else {
    return addFuel + additionalFuel(addFuel);
  }
}

const main = async () => {
  fs.readFile("./data/day-1-input.txt", "utf8", (err, data) => {
    if (err) throw err;

    const masses = data
      .split("\n")
      .map(mass => parseInt(mass))
      .filter(mass => !isNaN(mass));

    const totalFuel = masses.reduce((fuel, currentMass) => {
      const fuelForMass = getFuelForMass(currentMass);
      return fuel + fuelForMass + additionalFuel(fuelForMass);
    }, 0);

    console.log(`Total fuel needed for modules: ${totalFuel}`);
  });
};

main();
