
const assert = require("assert");
const customers = require('./data.json'),
      colorService = require('./colorService').ColorService;

describe("colorService test", () => {
  "use strict";

    describe("should contain",() => {
        it("functions", () => {
            assert.equal(typeof colorService.buildRef, "function", "should be a function type");
        });
    });

    describe("build ref", () => {
      it("return a proper color to customer reference mapping array", () => {
        let res = colorService.buildRef(customers);
        const expected = [[0],[1],[0,1],[1],[0,2]];
        assert.deepEqual(expected, res, "customer ref is equal")
      });
    });


    describe("satisfied client", () => {
      let cust = { colors: [{id: 1, type: "G"}, {id:2, type:"M"}] };
      it("should not satisfy client", () => {
         assert.equal(false, colorService.isSatisfied(cust, ["M","G"]));
      });
      it("should satisfy client", () => {
         assert.ok(colorService.isSatisfied(cust, ["M","M"]));
      });
    });

    describe("find unhappy clients", () => {
      it("identify unsatisfied customers", () => {
        var unhappy = colorService.findUnhappyClients(customers, ["G","G","G","G","G"]);
        assert.deepEqual([true,true,false], unhappy, "find list of unhappy");
      });

    });

});
