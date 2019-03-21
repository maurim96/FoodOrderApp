var assert = require('assert');
var expect = require('chai').expect;
var should = require('chai').should();

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      // assert.equal([1, 2, 3].indexOf(4), -1);
      let a = 1;
      // let isTrue = [1, 2, 3].indexOf(4) === -1;
      // expect(isTrue).to.be.true;
      [1, 2, 3].indexOf(4).should.equal(-1);
    });
  });
});
