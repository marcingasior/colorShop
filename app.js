exports.colorShop = function(){
"use strict";

let _ = require('underscore'),
  customers = require('./data.json');



function ColorShop(customers){
  this.init(customers);
}


ColorShop.prototype.init = function(customers){

  this.customers = customers;
  let colorsRef = []; // keep references to customers which likes given color

  _.forEach(customers, (customer, idx) => {
    _.forEach(customer, c =>
      !!colorsRef[c[0] - 1 ] ? colorsRef[c[0] -1 ].push(idx) :(colorsRef[c[0] -1] = [idx])
    );
  }
  );

  this.colorsRef = colorsRef;
  let c = this.colors = [];
  c.length = colorsRef.length;
  c.fill("G");
  console.log(JSON.stringify(c));

}

ColorShop.prototype.validate = function(){
  let c = this.colors;
   function isSatisfied(customer){
     return _.find(_.map(customer, color =>
       color[1] === c[color[0] - 1]
     ), i => i );
   }
   let invalid = [];
  _.each(this.customers, function(customer, idx){
      if (!isSatisfied(customer)){
        invalid.push(idx);
      }
  });
  return invalid;
}


let c = new ColorShop(customers);
let invalid = c.validate();
console.log(c.customers[invalid[0]]);
return c;

}();
