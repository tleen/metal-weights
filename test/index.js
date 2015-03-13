'use strict';

/* global describe, it, should */
/* jshint expr: true */

var calculator = require('..'),
pkg = require('../package.json');

describe('default', function(){

  var calc = calculator();

  it('should be a function', function(){
    calc.should.be.an.Object;
    calc.should.have.properties('round', 'square');
  });

  it('should have accurate default steel values', function(){
    calc.round(1,1).should.be.approximately(0.22, 0.01);
    calc.square(1,1).should.be.approximately(0.28, 0.01);
    calc.hexagon(1,1).should.be.approximately(0.24, 0.01);
    calc.octagon(1,1).should.be.approximately(0.23, 0.01);
    calc.flat(1,1,1).should.be.approximately(0.28, 0.01);
    calc.tube(1,0.1,1).should.be.approximately(0.08, 0.01);
    calc.circle(1,1,1).should.be.approximately(0.018, 0.001);
  });
});


