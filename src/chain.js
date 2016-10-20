
var BeatCoin = require("../build/contracts/BeatCoin.sol.js");
var Web3 = require('web3');
var web3 = new Web3();

export default ({config, db}, callback) => {
  var provider = new web3.providers.HttpProvider(config.ethRpcUrl);
  BeatCoin.setProvider(provider);
  var beatcoin = BeatCoin.deployed();
  var sr = beatcoin.TestEvent();
  sr.watch(() => {
    console.log('TestEvent');
  })
	callback();
}
