
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
var holder = accounts[0];
var deposit = 1e5;
    
console.log(holder);
var options = {
	method: 'POST',
	uri: `http://localhost:8080/api/${config.namespace}/songs/register`,
	body: {
    name: "Song 4",
    owner: holder,
    url: "https://example.com/s4.mp3",
	},
	json: true,
};

var song;
request(options)
	.then(function(_song) {
    song = _song;
    console.log(song);
		return token.createTokens(holder, {from: accounts[0], value: deposit})
	})
  .then(function() {
    return token.registerSong
      .sendTransaction('mediachain', song.id,
       {from: accounts[0], value: 0, gas: 1000000})
  
  })
	.then(console.log)
