const InactiveToken = artifacts.require("InactiveToken");
const ActiveToken = artifacts.require("ActiveToken");
const VotingToken = artifacts.require("VotingToken");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const SeedableCrowdsale = artifacts.require("SeedableCrowdsale");
const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const Dividends = artifacts.require("Dividends");
const Reimbursements = artifacts.require("Reimbursements");
const ProjectFactory = artifacts.require("ProjectFactory");
const ProjectLeaderTracker = artifacts.require("ProjectLeaderTracker");
const Voting = artifacts.require("Voting");
const SeedableVoting = artifacts.require("SeedableVoting");
const Activation = artifacts.require("Activation");
const { seed } = require('../seeds');

let activeTokenInstance;
let inactiveTokenInstance;
let votingTokenInstance;
let votingInstance;
let crowdsaleInstance;
let activationInstance;
let projectLeaderTrackerInst;
let projectFactoryInst;

module.exports = function (deployer, network, accounts) {
  console.log("NETWORK", network)
    const rate = 1; //changed this to 1 from 10000 (subject to change still)
    const developer = accounts[0];  //will need to make this variable and import from the interface on first deployment of a developer's site (Progeny)

    return deployer
        .then(() => {
          return deployer.deploy(
            ProjectLeaderTracker
          )
        })
        .then(() => {
          return deployer.deploy(
            VotingToken
          )
        })
        .then(() => {
          return deployer.deploy(
            ActiveToken,
            VotingToken.address
          )
        })
        .then(() => {
          return deployer.deploy(
            InactiveToken,
            VotingToken.address,
            ActiveToken.address
          )
        })
        .then(() => {
          return deployer.deploy(
            Dividends,
            ActiveToken.address
          );
        })
        .then(() => {
          return deployer.deploy(
            Reimbursements,
            InactiveToken.address
          )
        })
        .then(() => {
          return deployer.deploy(
            Activation,
            InactiveToken.address,
            ProjectLeaderTracker.address
          )
        })

        .then(() => {
          return deployer.deploy(
            Voting,
            VotingToken.address,
            ProjectLeaderTracker.address,
            Activation.address
          );
        })
        .then(() => { // establish start time variable
            return new Promise((resolve, reject) => {
                web3.eth.getBlock('latest', (err, time) => {
                    if (err) reject();
                    const openingTime = time.timestamp + 50;
                    resolve(openingTime);
                })
            })
        })
        .then((openingTime) => {
          const doomsDay = openingTime + 86400 * 240; // 240 days
          // const votingAddr = network === 'ropsten' ? SeedableVoting.address : Voting.address
          if (network === 'ropsten') {
            return deployer.deploy(
                SeedableCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                InactiveToken.address,
                ProjectLeaderTracker.address,
                Reimbursements.address
                // votingAddr,
                // Activation.address
            );
          }
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                InactiveToken.address,
                ProjectLeaderTracker.address,
                Reimbursements.address
            );
        })
        .then(() => {
          return network === 'ropsten' ?  SeedableCrowdsale.at(SeedableCrowdsale.address) : GNITokenCrowdsale.at(GNITokenCrowdsale.address);
        })
        .then(_crowdsaleInstance => {
          crowdsaleInstance = _crowdsaleInstance
        })
        .then(() => {
          return deployer.deploy(
            ProjectFactory,
            Activation.address,
            Voting.address,
            ProjectLeaderTracker.address,
            crowdsaleInstance.address,
            developer,
            Dividends.address
          );
        })
         //organize around seeding, ownership designation and contract instanciation / contract references
        //activation and voting will deploy after crowdsale
        .then(() => {
          return ProjectFactory.at(ProjectFactory.address);
        })
        .then(_projectFactoryInst => {
          projectFactoryInst = _projectFactoryInst;
          return projectFactoryInst.transferCrowdsaleKey(crowdsaleInstance.address);
        })
        .then(() => {
          return crowdsaleInstance.transferProjectFactoryKey(projectFactoryInst.address);
        })
        .then(() => {
          return ActiveToken.at(ActiveToken.address);
        })
        .then(_activeTokenInstance => {
          activeTokenInstance = _activeTokenInstance;
          return activeTokenInstance.setDividendWallet(Dividends.address);
        })
        .then(() => {
          return activeTokenInstance.setMinter(crowdsaleInstance.address);
        })
        .then(() => {
          // return network === 'ropsten' ? SeedableVoting.at(SeedableVoting.address) : Voting.at(Voting.address);
          return Voting.at(Voting.address);
        })
        .then(_votingInstance => {
          votingInstance = _votingInstance;
          votingInstance.setCrowdsale(crowdsaleInstance.address);
        })
        .then(() => {
          return crowdsaleInstance.transferVotingKey(votingInstance.address);
        })
        .then(() => {
          return ProjectLeaderTracker.at(ProjectLeaderTracker.address);
        })
        .then(_projectLeaderTrackerInst => {
          projectLeaderTrackerInst = _projectLeaderTrackerInst;
          return projectLeaderTrackerInst.transferCrowdsaleKey(crowdsaleInstance.address);
        })
        .then(() => {
          return projectLeaderTrackerInst.transferProjectFactoryKey(projectFactoryInst.address);
        })
        .then(() => {
          return Activation.at(Activation.address)
        })
        .then(_activationInstance => {
          activationInstance = _activationInstance;
          return activationInstance.setCrowdsale(crowdsaleInstance.address);
        })
        .then(() => {
          return activationInstance.transferProjectFactoryKey(projectFactoryInst.address);
        })
        .then(() => {
          return projectLeaderTrackerInst.transferActivationKey(activationInstance.address)
        })
        .then(() => {
          return crowdsaleInstance.transferActivationKey(activationInstance.address);
        })
        .then(() => {
          return InactiveToken.at(InactiveToken.address);
        })
        .then(_inactiveTokenInstance => {
          inactiveTokenInstance = _inactiveTokenInstance;
        })
        .then(() => {
          return inactiveTokenInstance.transferCrowdsaleKey(crowdsaleInstance.address);
        })
        .then(() => {
          return inactiveTokenInstance.transferActivationKey(activationInstance.address);
        })
        .then(() => {
          return VotingToken.at(VotingToken.address);
        })
        .then(_votingTokenInstace => {
          votingTokenInstance = _votingTokenInstace;
          votingTokenInstance.transferVotingKey(Voting.address);
        })
        .then(() => {
          return votingTokenInstance.setActiveToken(activeTokenInstance.address);
        })
        .then(() => {
          return votingTokenInstance.setInactiveToken(inactiveTokenInstance.address);
        })
        .then(() => {
          return Reimbursements.at(Reimbursements.address);
        })
        .then(reimbursementsInst => {
          return reimbursementsInst.transferCrowdsaleKey(crowdsaleInstance.address);
        })
        .then(() => {
          if (network === 'ropsten') {
            // console.log("voting", votingInstance)
            return seed(crowdsaleInstance, projectFactoryInst, inactiveTokenInstance, votingInstance, developer, accounts[1], accounts[2]);
          }
        })

};
// .then(() => {
//   investorListInst = InvestorList.at(InvestorList.address);
//   return investorListInst.transferOwnership(GNITokenCrowdsale.address);
// })
// .then(() => {
//   return investorListInst.transferPrimary(Token.address);
// })
// console.log('DEVELOPER', developer);
// console.log('OPENING TIME', openingTime);
// console.log('DOOMS DAY', doomsDay);
// console.log('RATE', rate);
// console.log('DIVIDENDS', Dividends.address);
// console.log("TOKEN", Token.address);
// console.log("INVESTOR LIST", InvestorList.address);
