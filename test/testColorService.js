"use strict";

const assert = require("assert");
const customers = require('./simple-data.json'),
      colorService = require('../colorService').ColorService;

describe("colorService test", () => {

    describe("should contain",() => {
        it("functions", () => {
            assert.equal(typeof colorService.buildRef, "function", "should be a function type");
        });
    });

    describe("normalize customers", () => {
      it("should return normalized array of customers", () =>{
          let res = colorService.normalizeCustomers([{"colors": [{id:1, type: "G"}]}]);
          let expected = [{colors: [{id: 0, type: "G"}]}];
          assert.deepEqual(res, expected, "customer is normalized");
      });
    });

    describe("build ref", () => {
      it("return a proper color to customer reference mapping array", () => {
        let res = colorService.buildRef(colorService.normalizeCustomers(customers));
        const expected = [
          [0],
          [1],
          [0, 1],
          [1],
          [0, 2]
        ];
        assert.deepEqual(res, expected, "customer ref is equal");
      });
    });


    describe("satisfied client", () => {
      let cust = { colors: [{id: 0, type: "G"}, {id:1, type:"M"}] };
      it("should not satisfy client", () => {
         assert.equal(false, colorService.isSatisfied(cust, ["M","G"]));
      });
      it("should satisfy client", () => {
         assert.ok(colorService.isSatisfied(cust, ["M","M"]));
      });
    });

    describe("find unhappy clients", () => {
      it("identify unsatisfied customers", () => {
        var unhappy = colorService.findUnhappyCustomerIds(customers, ["G","G","G","G","G"]);
        assert.deepEqual([2], unhappy, "find list of unhappy ids");
      });

    });

    describe("mattes", ()=>{
      it("should return matte index", () => {
          let customer = { "colors": [{"id":2,"type":"G"},{"id":3,"type":"M"},{"id":4,"type":"G"}]};
          let index = colorService.findMatteIndx(customer);
          assert.ok(3, index, "found proper matte index");
      });

      it("should throw exception", () => {
        let customer = {colors: [{id:3, type: "G"}]};
        try{
          colorService.findMatteIndx(customer);
        }catch(e){
          assert.ok(/Unsolvable/.test(e.message),"Return proper error message");
        }
      });
    });
});
