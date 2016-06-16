"use strict";
const _ = require('underscore');

exports.ColorService = () => {

  let normalizeCustomers = (config) => {
    return _.map(config.customers, (customer) => {
        return {colors : _.map(customer, (color) => {
          return  {"id": color.id - 1, "type": color.type };
        })
      };
    });
  };

  let buildColorRef = (customers) => {
    let colorsRef = []; // keep references to customers which likes given color

    _.forEach(customers, (customer, idx) => {
      _.forEach(customer.colors, (c) => {
        if(!!colorsRef[c.id]){
          colorsRef[c.id].push(idx);
        }else{
          colorsRef[c.id] = [idx];
        }
      });
    });
    return colorsRef;
  };

  let satisfiedCustomer = (customer, currentColors) => {
    return !!_.chain(customer.colors)
    .map( c => c.type === currentColors[c.id])
    .find(i => i )
    .value();
  };

  let findUnhappyCustomerIds = (customers, currentColors) => {
    return _.map(customers, customer => satisfiedCustomer(customer, currentColors))
    .map( (val, idx) => val ? -1 : idx )
    .filter( _ => _ > 0 );
  };

  let findMatteIndx = (customer) => {
    let matte = _.findWhere(customer.colors, {"type" : "M"} );
    if (typeof matte == "undefined"){
      throw new Error("Unsolvable");
    }else{
      return matte.id;
    }

  };

  var self = {
      normalizeCustomers: normalizeCustomers,
      buildRef: buildColorRef,
      isSatisfied: satisfiedCustomer,
      findUnhappyCustomerIds : findUnhappyCustomerIds,
      findMatteIndx: findMatteIndx
  };

  return self;

}();
