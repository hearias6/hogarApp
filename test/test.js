
var practica = require('../controllers/practicaController');
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
chai.use(chaiHttp);


describe('operaciones aritmeticas', function() {

  it('sumar dos numeros', function() {
      expect(practica.sumar(2,2)).to.be.equal(4);
  })

});


/*
// @desscription ejemplo basicos con mocha - chai - expect, para test unit node.js
// @link https://jsjutsu.com/blog/2015/06/testing-nodejs/

// @description ejemplos con post - put - get mocha - chai - expect - shuld
// pendiente...
// @link http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WDujV9LhC1t
// @link https://scotch.io/tutorials/test-a-node-restful-api-with-mocha-and-chai
// @link http://mcculloughwebservices.com/2015/07/13/testing-nodejs-with-mocha-and-chai/
*/
