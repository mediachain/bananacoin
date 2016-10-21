pragma solidity ^0.4.0;

/*
 * Order Payment contract helper
 */
contract OrderPayment {

  // Order (deferred payment) data structure
  struct Order {
    address payer;
    uint value;
    bool exists;
  }
  // mapping from name of store to its orders, mapped by item
  mapping(string => mapping(string => Order)) orders;


  function placeOrder(string store, string item, uint value) internal {
    mapping(string => Order) storeOrders = orders[store];

    Order memory order = Order(msg.sender, value, true);

    placeDeposit(value);

    storeOrders[item] = order;
    OrderPlaced(order.payer, store, item, value);
  }

  // TODO: add security so that only oracle can call this
  function completeOrder(string store, string item, address account) {
    Order order = orders[store][item];
    if (!order.exists) throw;
    
    sendDeposit(order, account);
    
    OrderCompleted(order.payer, store, item, order.value);
    delete orders[store][item];
  }

  function placeDeposit(uint value) internal;

  function sendDeposit(Order order, address account) internal;

  event OrderPlaced(address payer, string store, string item, uint value);
  event OrderCompleted(address payer, string store, string item, uint value);

}
