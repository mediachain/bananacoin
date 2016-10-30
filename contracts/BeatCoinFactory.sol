pragma solidity ^0.4.0;
import "BeatCoin.sol";

contract BeatCoinFactory {
  function deployContract() returns (address) {
    return new BeatCoin();
  }
}
