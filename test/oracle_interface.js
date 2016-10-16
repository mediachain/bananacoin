contract('OracleInterface', function(accounts) {
  describe('requestSongWriter', function(){
    it("returns song adress", function(done) {
      var oracle_interface = OracleInterface.deployed();
      var song_writer_event = oracle_interface.SongWriterEvent({});
      var dummy_result = '0x';
      song_writer_event.watch(function(err, result) {
        if (err) { throw err };
        assert.equal(result.args.result, dummy_result);
        song_writer_event.stopWatching();
        done();
      })
      oracle_interface.requestSongWriter('Bruno Mars');
    });
  })
});
