
import songs from './models/songs';
var BeatCoin = require("../build/contracts/BeatCoin.sol.js");
var Web3 = require('web3');

var web3 = new Web3();

export default ({config, db}, callback) => {
  var provider = new web3.providers.HttpProvider(config.ethRpcUrl);
  BeatCoin.setProvider(provider);
  web3.setProvider(provider);

  var token = BeatCoin.deployed();
  var accounts = web3.eth.accounts;
  // TODO: set to secured oracle geth account
  var account = accounts[9];
  var ope = token.OrderPlaced();
  var oce = token.OrderCompleted();
  
  var txs = {};

  ope.watch(function(err, event) {
    console.log('OrderPlaced')

    var tx = event.transactionHash;
    var args = event.args;
    if (txs[tx]) {
      console.log('Already processed ', tx);
      return;
    }
    txs[tx] = true;

    var store = args.store;
    if (store === config.namespace) {
      console.log('call back with namespace', config.namespaceOwner);
      var song = args.item;
      token.completeOrder(config.namespace, song,
                          config.namespaceOwner, {from: account});
    } else {
      var f = songs.filter(song => song.id === store);
      if (f.length === 0) {
        console.log('Can\'t resolve owner for song with id', store);
        return;
      }
      var song = f[0];
      console.log('call back with song', song.owner);
      var buyer = args.item;
      token.completeOrder(song.id, buyer,
                          config.namespaceOwner, {from: account});
    }
  });
  oce.watch(function(err, event) {
    console.log('OrderCompleted');
    var args = event.args;
    var store = args.store;
    if (store === config.namespace) {
      var songID = args.item;
      var f = songs.filter(song => song.id === songID);
      if (f.length === 0) {
        console.log('Can\'t complete register order for song with id', songID);
        return;
      }
      var song = f[0];
      song.owner = args.payer;
      song.active = true;
      console.log('new song!', song);
      console.log('song #:', songs.length);
    } else {
      var songID = store;
      var f = songs.filter(song => song.id === songID);
      if (f.length === 0) {
        console.log('Can\'t complete purchase order for song with id', songID);
        return;
      }
      var song = f[0];
      song.purchasers.push(args.payer);
      console.log('song', song.id, 'purchased by', args.payer);
      console.log('purchasers:', song.purchasers);
    }
  });
	callback();
}
