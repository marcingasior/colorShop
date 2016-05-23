"use strict";

const _ = require('underscore');

exports.ColorService = function(){

  function buildColorRef(customers){
    let colorsRef = []; // keep references to customers which likes given color

    _.forEach(customers, (customer, idx) => {
      _.forEach(customer.colors, (c) =>
        !!colorsRef[c.id - 1 ] ? colorsRef[c.id - 1 ].push(idx) :(colorsRef[c.id - 1] = [idx])
      );
    });
    return colorsRef;
  }

  function satisfiedCustomer(customer, currentColors){
    return !!_.chain(customer.colors)
    .map( c => c.type === currentColors[c.id - 1])
    .find(i => i )
    .value();
  }

  function findUnhappy(customers, currentColors){
      return _.map(customers, customer => satisfiedCustomer(customer, currentColors));
  }
  var self = {
      buildRef: buildColorRef,
      isSatisfied: satisfiedCustomer,
      findUnhappyClients: findUnhappy
  };

  return self;

}();
