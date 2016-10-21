contract('BeatCoin', function(accounts) {
  describe('creation', function(){
    it("can create contract", function(done) {
      BeatCoin.new()
        .then(function(token) {
          assert(!!token);
        })
        .then(done);
    });
    it("can create and get tokens", function(done) {
      var token;
      var holder = accounts[1];
      var deposit = 1e18;
      var expected = deposit * 500;
      BeatCoin.new()
        .then(function(_t) {
          token = _t;
          return token.createTokens(holder, {from: holder, value: deposit})
        })
        .then(function() {
          return token.balanceOf(holder);
        })
        .then(function(balance) {
          assert.equal(balance, expected)
        })
        .then(done);
    });
  });

});
