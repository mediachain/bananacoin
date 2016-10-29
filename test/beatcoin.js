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

    it.only("can check contract balance as invariant", function(done) {
      var token, supply;
      var holder = accounts[1];
      var anotherHolder = accounts[2];
      var deposit = 1e18;
      BeatCoin.new()
        .then(function(_t) {
          token = _t;
          return token.createTokens(holder, {from: holder, value: deposit})
        })
        .then(function() {
          return token.createTokens(anotherHolder, {from: anotherHolder, value: deposit})
        })
        .then(function() {
          return token.totalSupply.call();
        })
        .then(function(_s) {
          supply = _s;
          return token.getPrice()
        })
        .then(function(price) {
          assert.equal(deposit * 2, web3.eth.getBalance(token.address))
          return token.checkInvariant.call()
        })
        .then(function(result) {
          assert.isTrue(result)
        })
        .then(done);
    });
  });

  var createFunded = function(holder) {
    var token;
    var deposit = 1000;
    return BeatCoin.new()
      .then(function(_t) {
        token = _t;
        return token.createTokens(holder, {from: holder, value: deposit})
      })
      .then(function() {
        return token;
      });
  }

  describe('registerSong', function(){
    it("can register song", function(done) {
      var token;
      var holder = accounts[1];
      var song = 'f30b5e64-a8a4-47af-99e2-f1e2aa97e569';
      var namespace = 'mediachain';
      var nsAccount = accounts[2];
      var oracle = accounts[3];
      createFunded(holder)
        .then(function(_t) {
          token = _t;
          return token.registerSong(namespace, song, {from: holder})
        })
        .then(function() {
          return token.completeOrder(namespace, song,
                                     nsAccount, {from: oracle});
        })
        .then(function() {
          return token.balanceOf(holder);
        })
        .then(function(balance) {
          assert.equal(balance, 500000-10000)
        })
        .then(function() {
          return token.balanceOf(nsAccount);
        })
        .then(function(balance) {
          assert.equal(balance, 10000)
        })
        .then(done);
    });
    it("emits events on registration", function(done) {
      var token;
      var holder = accounts[1];
      var song = 'f30b5e64-a8a4-47af-99e2-f1e2aa97e569';
      var namespace = 'mediachain';
      var nsAccount = accounts[2];
      var oracle = accounts[3];
      createFunded(holder)
        .then(function(_t) {
          token = _t;
          var ope = token.OrderPlaced();
          ope.watch(function(err, event) {
            assert.equal(event.args.payer, holder);
            assert.equal(event.args.store, namespace);
            assert.equal(event.args.item, song);
            assert.equal(event.args.value, 10000);
            ope.stopWatching();
          });
          var oce = token.OrderCompleted();
          oce.watch(function(err, event) {
            assert.equal(event.args.payer, holder);
            assert.equal(event.args.store, namespace);
            assert.equal(event.args.item, song);
            assert.equal(event.args.value, 10000);
            oce.stopWatching();
            done();
          });

          return token.registerSong(namespace, song, {from: holder})
        })
        .then(function() {
          return token.completeOrder(namespace, song,
                                     nsAccount, {from: oracle});
        })
    });
  });

  describe('purchaseSong', function(){
    it("can purchase song", function(done) {
      var token;
      var holder = accounts[1];
      var song = 'f30b5e64-a8a4-47af-99e2-f1e2aa97e569';
      var artistAccount = accounts[2];
      var oracle = accounts[3];
      createFunded(holder)
        .then(function(_t) {
          token = _t;
          return token.purchaseSong(song, holder, {from: holder})
        })
        .then(function() {
          return token.completeOrder(song, holder,
                                     artistAccount, {from: oracle});
        })
        .then(function() {
          return token.balanceOf(holder);
        })
        .then(function(balance) {
          assert.equal(balance, 500000-5000)
        })
        .then(function() {
          return token.balanceOf(artistAccount);
        })
        .then(function(balance) {
          assert.equal(balance, 5000)
        })
        .then(done);
    });
    it("emits events on purchase", function(done) {
      var token;
      var holder = accounts[1];
      var song = 'f30b5e64-a8a4-47af-99e2-f1e2aa97e569';
      var artistAccount = accounts[2];
      var oracle = accounts[3];
      createFunded(holder)
        .then(function(_t) {
          token = _t;
          var ope = token.OrderPlaced();
          ope.watch(function(err, event) {
            assert.equal(event.args.payer, holder);
            assert.equal(event.args.store, song);
            assert.equal(event.args.item, holder);
            assert.equal(event.args.value, 5000);
            ope.stopWatching();
          });
          var oce = token.OrderCompleted();
          oce.watch(function(err, event) {
            assert.equal(event.args.payer, holder);
            assert.equal(event.args.store, song);
            assert.equal(event.args.item, holder);
            assert.equal(event.args.value, 5000);
            oce.stopWatching();
            done();
          });

          return token.purchaseSong(song, holder, {from: holder})
        })
        .then(function() {
          return token.completeOrder(song, holder,
                                     artistAccount, {from: oracle});
        })
    });
  });

});
