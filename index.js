'use strict';

var dbcsv = require('dbcsv'),
_ = require('lodash');

var coefficients = dbcsv('./coefficients.csv');
var conversions = dbcsv('./conversions.csv');

function square(x){ return (x*x); }

// all measurements in inches
var formulae = {
  round : square, // Diameter 
  square : square,
  hexagon : square,
  octagon : square,
  flat : function(thickness, width){ return (thickness * width); },
  tube : function(outerDiameter, wall){ return ((outerDiameter - wall) * wall); },
  circle : function(thickness, diameter){ return (thickness * square(diameter)); }
};

// return shape weight calculator based on type, name,
// make all shapes available
module.exports = function(type, name){
  
  var calculator = {};

  var t = (type || 'steel');
  var n = (name || 'generic');

  _.forOwn(formulae, function(formula, shape){
    var coefficient = 1.0;
    var result = coefficients.search({shape : shape});
    if(result.length && result[0][t]) coefficient = parseFloat(result[0][t]); 

    // xx - pull in based on name unique coefficients?

    // coefficients are per foot, so calculate per foot then normalize to inches    
    calculator[shape] = function(){
      var args = _.values(arguments);
      var length = args.pop(); // in inches
      var foot = (formula.apply(null, args) * coefficient);
      return ( (foot/12) * length);
    };
  });

  return calculator;
};
