pragma solidity ^0.4.0;

import "./CrowdsaleToken.sol";

/*
 * Main BeatCoin Token contract
 */
contract BeatCoin is CrowdsaleToken {

  string public name = "BeatCoin";
  string public symbol = "BEA";
  uint public decimals = 18;

  /*
   * registerSong
   * Register new song into a namespace
   *
   * string song: song id
   * uint price: namespace registration price
   * namespace: namespace owner address
   */
  function registerSong(string song, uint price, address namespace) {
    address artist = msg.sender;
    bool success = transfer(namespace, price);
    if (success) {
      SongRegistered(song, artist, namespace, price);
    }
  }


  /*
   * purchaseSong
   * Register new song into a namespace
   *
   * string song: song id
   * uint price: song purchase price
   * artist: artist's address
   */
  function purchaseSong(string song, uint price, address artist) {
    address purchaser = msg.sender;
    bool success = transfer(artist, price);
    if (success) {
      SongPurchased(song, purchaser, artist, price);
    }
  }

  function test() {
    TestEvent('hello world');
  }

  event TestEvent(string indexed song);
  event SongRegistered(string indexed song, address indexed artist, address indexed namespace, uint value);
  event SongPurchased(string indexed song, address indexed purchaser, address indexed artist, uint value);
  
}
