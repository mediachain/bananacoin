module.exports = function(deployer) {
  deployer.deploy(BeatCoin);
  deployer.autolink();
  deployer.deploy(OracleInterface);
};
