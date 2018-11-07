/*
 * NB: since truffle-hdwallet-provider 0.0.5 you must wrap HDWallet providers in a
 * function when declaring them. Failure to do so will cause commands to hang. ex:
 * ```
 * mainnet: {
 *     provider: function() {
 *       return new HDWalletProvider(mnemonic, 'https://mainnet.infura.io/<infura-key>')
 *     },
 *     network_id: '1',
 *     gas: 4500000,
 *     gasPrice: 10000000000,
 *   },
 */
const HDWalletProvider = require("truffle-hdwallet-provider");
require('dotenv').config();
//
// var HDWalletProvider = require("truffle-hdwallet-provider");

// var infura_apikey = "32d629913620458ea1049490da4906b1";
// var mnemonic = "leaf oak make armed infant basic cup music beauty police urban double";
//
// MNEMONIC='legend gun agent spatial cycle tail educate crowd draw venue dial start'
// INFURA_API_KEY=aa56d8693c7f4fc8852b4ece901a4719


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gasLimit: 9999999999
    },
    ropsten: {
         provider: () => new HDWalletProvider(process.env.MNEMONIC, "https://ropsten.infura.io/v3/" + process.env.INFURA_API_KEY),
         network_id: 3,
         gas: 8000000,
      },
      solc: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
  }
};
