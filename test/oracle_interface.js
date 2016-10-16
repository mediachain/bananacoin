contract('OracleInterface', function(accounts) {
  describe('requestSongWriter', function(){
    it("returns song adress", function(done) {
      var oracle_interface = OracleInterface.deployed();
      var event = oracle_interface.SongWriterEvent({});
      var dummy_result = 'result 1';
      event.watch(function(err, result) {
        if (err) { throw err };
        assert.equal(result.args.result, dummy_result);
        event.stopWatching();
        done();
      })

      oracle_interface.requestSongWriter('Bruno Mars');
    });
  })

  describe('requestNameSpace', function(){
    it("returns name space", function(done) {
      var oracle_interface = OracleInterface.deployed();
      var event = oracle_interface.NameSpaceEvent({});
      var dummy_result = 'result 2';
      event.watch(function(err, result) {
        if (err) { throw err };
        assert.equal(result.args.result, dummy_result);
        event.stopWatching();
        done();
      })
      oracle_interface.requestNameSpace('Some Namespace');
    });
  })

  describe('callbacks', function(){
    describe('unknown ID', function(){
      it("returns name space", function(done) {
        var oracle_interface = OracleInterface.deployed();
        var event = oracle_interface.UnknownEvent({});
        var request_id = '0x4000000000000000000000000000000000000000000000000000000000000000';

        event.watch(function(err, result) {
          if (err) { throw err };
          assert.equal(result.args.requestID, request_id);
          assert.equal(result.args.result, 'Unknown events');
          event.stopWatching();
          done();
        })

        oracle_interface.__callback(request_id, 'Unknown events');
      });
    })
  })
});
