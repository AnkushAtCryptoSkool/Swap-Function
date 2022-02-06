var Swap = artifacts.require("Swap");
var Token = artifacts.require("Token");

module.exports = async function(deployer) {
  await deployer.deploy(Token,1000000);
 
  const token = await Token.deployed();
 
  await deployer.deploy(Swap, token.address);
 
  const swap = await Swap.deployed();
  token.transfer(swap.address,'1000000');

};
