pragma solidity ^0.4.0;

contract OracleInterface {
  string host;
  event NameSpaceEvent(string result);
  event SongWriterEvent(string result);

  function OracleInterface(string oraclizeHost){
  }

  function requestNameSpace(string _name){
  }

  function requestSongWriter(string _name){
    bytes32 requestID = 1; // Dummy ID
    __callback(requestID, '0x');
  }

  function __callback(bytes32 requestID, string result) {
    if (true){ // dummy for now
      SongWriterEvent(result);
    }else{
      NameSpaceEvent(result);
    }
  }
}
