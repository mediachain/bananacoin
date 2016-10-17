pragma solidity ^0.4.0;

contract OracleInterface {
  /* avoid using first enum(0) as it accidentally collides when a map has no value(0) for a given key */
  enum callbackTypes { _, requestSongWriter, requestNameSpace }
  mapping (bytes32 => callbackTypes) public callbacks;

  event NameSpaceEvent(string result);
  event SongWriterEvent(string result);
  event UnknownEvent(bytes32 requestID, string result);

  function requestSongWriter(string _name){
    bytes32 requestID = 0x1000000000000000000000000000000000000000000000000000000000000000; // Dummy ID
    callbacks[requestID] = callbackTypes.requestSongWriter;
    __callback(requestID, 'result 1');
  }

  function requestNameSpace(string _name){
    bytes32 requestID = 0x2000000000000000000000000000000000000000000000000000000000000000; // Dummy ID
    callbacks[requestID] = callbackTypes.requestNameSpace;
    __callback(requestID, 'result 2');
  }

  function __callback(bytes32 requestID, string result) {
    if (callbacks[requestID] == callbackTypes.requestSongWriter){
      SongWriterEvent(result);
    } else if (callbacks[requestID] == callbackTypes.requestNameSpace){
      NameSpaceEvent(result);
    } else {
      UnknownEvent(requestID, result);
    }
  }
}
