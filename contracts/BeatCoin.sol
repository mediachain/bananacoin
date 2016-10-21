pragma solidity ^0.4.0;

import "./CrowdsaleToken.sol";

/*
 * Main BeatCoin Token contract
 */
contract BeatCoin is CrowdsaleToken {

  // Standard Token public constants
  string public constant name = "BeatCoin";
  string public constant symbol = "BEA";
  uint public constant decimals = 18;

  // BeatCoin specific constants
  uint public constant REGISTRATION_PRICE = 15000;
  uint public constant SONG_PRICE = 5000;

  // Order (deferred payment) data structure
  struct Order {
    address payer;
    uint value;
    bool exists;
  }
  // mapping from name of store to its orders, mapped by item
  mapping(string => mapping(string => Order)) orders;


  function placeOrder(string store, string item, uint value) {
    mapping(string => Order) storeOrders = orders[store];

    Order memory order = Order(msg.sender, value, true);

    transfer(this, value);

    storeOrders[item] = order;
    OrderPlaced(order.payer, store, item, value);
  }

  function completeOrder(string store, string item, address account) {
    Order order = orders[store][item];
    if (!order.exists) throw;
    
    executePayment(order, account);
    
    OrderPlaced(order.payer, store, item, order.value);
    delete orders[store][item];
  }

  function executePayment(Order order, address account) internal {
    // this.tranfer makes the call external, making
    // msg.sender == this inside transfer
    this.transfer(account, order.value);
  }

  event OrderPlaced(address payer, string store, string item, uint value);
  event OrderCompleted(address payer, string store, string item, uint value);

  /*
   * registerSong
   * Register new song into a namespace
   *
   * string song: song id
   * string namespace: namespace
   */
  function registerSong(string song, string namespace) {
    address artist = msg.sender;

    placeOrder(namespace, song, REGISTRATION_PRICE);
  }


  /*
   * purchaseSong
   * Register new song into a namespace
   *
   * string song: song id
   */
  function purchaseSong(string song) {
    address purchaser = msg.sender;
    placeOrder(song, 'download', SONG_PRICE);
  }
}
