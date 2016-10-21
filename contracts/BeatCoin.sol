pragma solidity ^0.4.0;

import "./CrowdsaleToken.sol";
import "./OrderPayment.sol";

/*
 * Main BeatCoin Token contract
 */
contract BeatCoin is CrowdsaleToken, OrderPayment {

  // Standard Token public constants
  string public constant name = "BeatCoin";
  string public constant symbol = "BEA";
  uint public constant decimals = 18;

  // BeatCoin specific constants
  uint public constant REGISTRATION_PRICE = 10000;
  uint public constant SONG_PRICE = 5000;

  // public methods

  /*
   * registerSong
   * Register new song into a namespace
   *
   * string namespace: namespace
   * string song: song id
   */
  function registerSong(string namespace, string song) {
    placeOrder(namespace, song, REGISTRATION_PRICE);
  }


  /*
   * purchaseSong
   * Register new song into a namespace
   *
   * string song: song id
   */
  function purchaseSong(string song) {
    placeOrder(song, 'download', SONG_PRICE);
  }



  // internal methods
  function placeDeposit(uint value) internal {
    transfer(this, value);
  }

  function sendDeposit(Order order, address account) internal {
    // this.tranfer makes the call external, making
    // msg.sender == this inside transfer
    this.transfer(account, order.value);
  }
}
