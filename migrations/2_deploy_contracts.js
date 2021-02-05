// migrations is changing the blockchains state to another state. simular to database migrations by adding colums or rows

const Token = artifacts.require("Token"); //looks for the artifacts in the abis

module.exports = function (deployer) {
  deployer.deploy(Token);
};
