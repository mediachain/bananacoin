pragma solidity ^0.4.0;

import "zeppelin/StandardToken.sol";

/*
 * Crowdsale Token contract
 */
contract CrowdsaleToken is StandardToken {

  uint PRICE = 500;
  // Address to send ether from sale
  address public wallet;

  function CrowdsaleToken(address w) {
    if (w == 0) throw;
    wallet = w;
  }

  function () payable {
    createTokens(msg.sender);
  }
  
  function createTokens(address recipient) payable {
    if (msg.value == 0) throw;

    uint tokens = safeMul(msg.value, getPrice());

    totalSupply = safeAdd(totalSupply, tokens);
    balances[recipient] = safeAdd(balances[recipient], tokens);

    if (!wallet.send(msg.value)) throw;
  }
  
  function getPrice() constant returns (uint result){
    return PRICE;
  }

}
