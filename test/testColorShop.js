"use strict";

const assert = require('assert'),
customers = require('../data/simple-data.json'),
dependent= require('../data/dependent-data.json'),
unsolvable = require('../data/unsolvable-data.json'),
colorShop = require('../lib/colorShop');

describe("colorShop test", () => {

  it("should solve", () => {
    let cs = colorShop(customers);
    assert.equal(typeof cs, "object", "should return object");
    assert.ok(Array.isArray(cs.colorsRef), "colorsRef is an Array");
    let res = cs.solve();
    let expected = ["G","G","G","G","M"];
    assert.deepEqual(res, expected,"glossy colors satisfy all customers");
  });

  it("should throw exception", () => {
    let cs = colorShop(unsolvable);

    try{
      cs.solve();
    }catch(e){
    }
  });

  it("should solve dependendt", () => {
    let cs = colorShop(dependent);

    let res = cs.solve();
    let expected = ["M", "M", "M", "M","M"];
    assert.deepEqual(res, expected, "matte colors satisfy all customers");
  });
});
