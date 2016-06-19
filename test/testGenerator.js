"use strict";

const _ = require('underscore'),
  generator = require('../lib/generator'),
  colorShop = require('../lib/colorShop');

describe("Generator", () => {
  it("should generate a file", () => {
    let opts = {
      colors: 10000,
      customers: 50000
    };


    let start = process.hrtime();
    let config = generator(opts);
    let end = process.hrtime(start);
    console.info("Execution time (hr): %ds %dms", end[0], end[1]/1000000);
    require('fs').writeFileSync("./test.out", JSON.stringify(config));
    let cs = colorShop(config);
    try{
      start = process.hrtime();
      let res = cs.solve();
      end = process.hrtime(start);

      console.info("Execution time (hr): %ds %dms", end[0], end[1]/1000000);
      console.log("No of mattes " +_.filter(res, x => x === "M").length);
    }catch(e){
      console.log(e);
    }
    //console.log(JSON.stringify(generator(opts)));
  });
});
