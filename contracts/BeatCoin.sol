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

  // structure with the info of an approved future payment
  struct Order {
    address payer;
    string store;
    string item;
    uint value;
    bool exists;
  }
  // mapping from name of store to its orders, mapped by item
  mapping(string => mapping(string => Order)) public orders;


  function orderItem(string store, string item, uint value) {
    mapping(string => Order) storeOrders = orders[store];

    Order order = Order();
    order.payer = msg.sender;
    order.store = store;
    order.item = item;
    order.value = value;
    order.exists = true;

    transfer(this, value);

    storeOrders[item] = order;
    OrderPlaced(order);
  }

  function completeOrder(string store, string item, address account) {
    Order order = orders[store][item];
    if (!order.exists) throw;
    
    executePayment(order, account);
    
    OrderCompleted(order);
    delete orders[store][item];
  }

  function executePayment(Order order, address account) {
    // this.tranfer makes the call external, making
    // msg.sender == this inside transfer
    this.transfer(account, order.value);
  }

  event OrderPlaced(Order order);
  event OrderCompleted(Order order);

  /*
   * registerSong
   * Register new song into a namespace
   *
   * string song: song id
   * string namespace: namespace
   */
  function registerSong(string song, string namespace) {
    address artist = msg.sender;

    orderItem(namespace, song, REGISTRATION_PRICE);
  }


  /*
   * purchaseSong
   * Register new song into a namespace
   *
   * string song: song id
   */
  function purchaseSong(string song) {
    address purchaser = msg.sender;
    orderItem(song, 'download', SONG_PRICE);
  }
}
