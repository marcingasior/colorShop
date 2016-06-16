"use strict";

const assert = require('assert'),
customers = require('./simple-data.json'),
unsolvable = require('./unsolvable-data.json'),
colorShop = require('../colorShop');

describe("colorShop test", () => {

  it("should solve", () => {
    let cs = colorShop(customers);
    assert.equal(typeof cs, "object", "should return object");
    assert.ok(Array.isArray(cs.colorsRef), "colorsRef is an Array");
    let res = cs.solve();
    let expected = ["G","G","G","G","M"];
    assert.deepEqual(res, expected,"customer is normalized");
  });

  it("should throw exception", () => {
    let cs = colorShop(unsolvable);

    try{
      cs.solve();
    }catch(e){
    }
  });

});
