contract('Bounty', function(accounts) {
  describe('creation', function(){
    it("sets correct Factory address", function(done) {
      var targetFactory = BeatCoinFactory.deployed();
      var bounty = Bounty.deployed();
      bounty.factoryAddress.call().
        then(function(address) {
          assert.equal(address, targetFactory.address);
        }).
        then(done);
    });
  });
});
