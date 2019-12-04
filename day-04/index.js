const fs = require("fs");

const main = () => {
  let cpt = 0;

  for (let i = 272091; i <= 815432; i++) {
    const str = i.toString().split("");

    if (
      str.some((el, index) => {
        if (str[index + 1]) {
          return el === str[index + 1];
        }

        return false;
      }) &&
      str.every((el, index) => {
        if (str[index + 1]) {
          return el <= str[index + 1];
        }

        return true;
      })
    ) {
      cpt++;
    }
  }

  console.log(cpt);
};

main();
