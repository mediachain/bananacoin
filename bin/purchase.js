
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
var fan = accounts[1];
var deposit = 1e5;
    
console.log(fan, 'will purchase a song');
var options = {
	method: 'GET',
	uri: `http://localhost:8080/api/${config.namespace}/songs/`,
	json: true,
};

var songs;
request(options)
	.then(function(_songs) {
    songs = _songs;
		return token.createTokens(fan, {from: fan, value: deposit})
	})
  .then(function() {
    return token.purchaseSong
      .sendTransaction(songs[0].id, fan,
       {from: fan, value: 0, gas: 1000000})
  
  })
	.then(console.log)
