"use strict";

module.exports = (options) => {

  let opts = {
    colors: options.colors || "100",
    customers: options.customers||"100",
    likeMatte: options.likeMatte || 0.1
  };

  var res = {
    colors: opts.colors,
    customers: []
  };

  function generateCustomer(colors){
    let customer = [];
    let count = 1 + Math.floor(Math.random()*colors*0.001);
    for(let i = 0; i < count; i++){
      customer.push({id: Math.floor(Math.random()*colors), type: "G"});
    }

    if (Math.random() < opts.likeMatte){
      customer[Math.floor(Math.random()*count)].type = "M";
    }
    return customer;
  }

  for(let i = 0; i < opts.customers; i++){
    res.customers.push(generateCustomer(opts.colors));
  }

  return res;
};
