
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
var artist = accounts[1];
var deposit = 1e5;
    
console.log(artist, 'will register a song');
var options = {
	method: 'POST',
	uri: `http://localhost:8080/api/${config.namespace}/songs/register`,
	body: {
    name: "Song A",
    owner: artist,
    url: "https://example.com/a.mp3",
	},
	json: true,
};

var song;
request(options)
	.then(function(_song) {
    song = _song;
    console.log(song);
		return token.createTokens(artist, {from: artist, value: deposit})
	})
  .then(function() {
    return token.registerSong
      .sendTransaction('mediachain', song.id,
       {from: artist, value: 0, gas: 1000000})
  
  })
	.then(console.log)
