"use strict";

const _ = require('underscore'),
service = require('./service').ColorService;

module.exports = function(config){

  var colorShop = {
    colorsRef: [],
    customers: [],
    currentColors:[],
    unhappyCustIndx: [],

    init: function(config) {
      this.customers = service.normalizeCustomers(config);
      this.colorsRef = service.buildRef(this.customers);
      this.currentColors.length = this.colorsRef.length;
      this.currentColors.fill("G");
    },

    solve: function() {
      this.appendToUnhappy(
        service.findUnhappyCustomerIds(this.customers, this.currentColors)
      );

      let i = 0;

      try{
        while(i < this.unhappyCustIndx.length){
          let cust =this.customers[this.unhappyCustIndx[i]];
          i++;
          if (service.isSatisfied(cust, this.currentColors)){
            continue;
          }

          let matteIdx = service.findMatteIndx(cust);
          this.currentColors[matteIdx] = "M";
          this.appendToUnhappy(this.colorsRef[matteIdx]);
        }
      }finally{
        console.log("Final number of iterations i = " + i);
      }

      return this.currentColors;
    },

    appendToUnhappy: function(arr) {
      let customers = this.customers;
      let colors = this.currentColors;
      this.unhappyCustIndx = this.unhappyCustIndx.concat(
        _.filter(arr, (i) => !service.isSatisfied(customers[i], colors))
      );
      return this.unhappyCustIndx;
    }
  };

  colorShop.init(config);

  return colorShop;
};
