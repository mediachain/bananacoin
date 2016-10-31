module.exports = function(deployer) {
  deployer.deploy(BeatCoin);
  deployer.deploy(BeatCoinFactory).then(function() {
    return deployer.deploy(Bounty, BeatCoinFactory.address);
  });
  deployer.autolink();
  deployer.deploy(OracleInterface);
};
