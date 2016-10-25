
var BeatCoin = require("../build/contracts/BeatCoin.sol.js");
var Web3 = require('web3');
var web3 = new Web3();
var config = require('../src/config.json');
var request = require('request-promise');


var provider = new web3.providers.HttpProvider(config.ethRpcUrl);
web3.setProvider(provider);
BeatCoin.setProvider(provider);
var accounts = web3.eth.accounts;

var token = BeatCoin.deployed();

accounts.push(config.namespaceOwner);
for (var i = 0; i<accounts.length; i++) {
  () => {
    var j = i;
    token.balanceOf(accounts[j])
    .then((balance) => {
      console.log(accounts[j], '=>', balance.toNumber());
    });
  
  }();
}
