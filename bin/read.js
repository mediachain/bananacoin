
var BeatCoin = require("./build/contracts/BeatCoin.sol.js");
var Web3 = require('web3');
var web3 = new Web3();
var config = require('./src/config.json');

var provider = new web3.providers.HttpProvider(config.ethRpcUrl);
web3.setProvider(provider);
BeatCoin.setProvider(provider);
var accounts = web3.eth.accounts;

var token = BeatCoin.deployed();
var holder = accounts[0];
var deposit = 1e5;

token.createTokens(holder, {from: accounts[0], value: deposit})
  .then(function() {
    return token.registerSong
      .sendTransaction('mediachain', 'song-id-2',
       {from: accounts[0], value: 0, gas: 1000000})
  
  })
  .then(console.log)
  .catch(console.log)
