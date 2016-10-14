pragma solidity ^0.4.0;

import "zeppelin/StandardToken.sol";

/*
 * Main BeatCoin Token contract
 */
contract BeatCoin is StandardToken {

    string public name = "BeatCoin";
    string public symbol = "BEA";
    uint public decimals = 18;

    uint PRICE = 500;

    function () payable {
        createTokens(msg.sender);
    }
    
    function createTokens(address recipient) payable {
        if (msg.value == 0) throw;
    
        uint tokens = safeMul(msg.value, getPrice());

        totalSupply = safeAdd(totalSupply, tokens);
        balances[recipient] = safeAdd(balances[recipient], tokens);
    }
    
    function getPrice() constant returns (uint result){
      return PRICE;
    }
}
