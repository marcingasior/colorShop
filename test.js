
const assert = require("assert");
var colorShop = require('./colorShop');

describe("colorShop test", function(){
  "use strict";


    describe("should return object", function(){
        it("should be fine", function(){
            assert.equal(typeof colorShop, "object", "should return object");
            assert.ok(Array.isArray(colorShop.colorsRef), "colorsRef is an Array");
        });

    })

});
