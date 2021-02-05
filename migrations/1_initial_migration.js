// migrations is changing the blockchains state to another state. simular to database migrations by adding colums or rows

const Migrations = artifacts.require("Migrations");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
};
