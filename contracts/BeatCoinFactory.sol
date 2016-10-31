pragma solidity ^0.4.0;
import "BeatCoin.sol";
import {Factory, Target} from "zeppelin/Bounty.sol";

contract BeatCoinFactory is Factory {
  function deployContract() returns (address) {
    return new BeatCoin();
  }
}
