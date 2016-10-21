
var BeatCoin = require("./build/contracts/BeatCoin.sol.js");
var Web3 = require('web3');
var web3 = new Web3();
var config = require('./src/config.json');

var provider = new web3.providers.HttpProvider(config.ethRpcUrl);
BeatCoin.setProvider(provider);
var beatcoin = BeatCoin.deployed();
beatcoin.placeOrder.sendTransaction('mediachain'{from: '0xf8876bdb966de1968e930c2645a795596a48da3d', value: 0})
.then(console.log)
.catch(console.log)
