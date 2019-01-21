const Token = artifacts.require("Token");
// const InvestorList = artifacts.require("InvestorList");
const GNITokenCrowdsale = artifacts.require("GNITokenCrowdsale");
const GNITokenCrowdsaleMock = artifacts.require("GNITokenCrowdsaleMock");
const Dividends = artifacts.require("Dividends");
const Reimbursements = artifacts.require("Reimbursements");
const ProjectLeaderTracker = artifacts.require("ProjectLeaderTracker");
const ECRecovery = artifacts.require("ECRecovery");
const Voting = artifacts.require("Voting");

let tokenInstance;
// let investorListInst;
let votingInstance;

module.exports = function (deployer, network, accounts) {
    const rate = 10000;
    const developer = accounts[0];

    return deployer
        .then(() => {
          return deployer.deploy(Token);
        })
        .then(() => {
          return deployer.deploy(
            Dividends,
            Token.address,
            developer
          );
        })
        .then(() => {
          return deployer.deploy(
            Reimbursements,
            Token.address
          )
        })
        .then(() => {
          return deployer.deploy(
            ProjectLeaderTracker
          )
        })
        .then(() => {
          return deployer.deploy(ECRecovery);
        })
        .then(() => {
          return deployer.deploy(Voting, Token.address, ProjectLeaderTracker.address);
        })
        .then(() => {
          return deployer.link(ECRecovery, GNITokenCrowdsale);
        })
        .then(() => {
          return deployer.link(ECRecovery, GNITokenCrowdsaleMock);
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
            return deployer.deploy(
                GNITokenCrowdsale,
                openingTime,
                doomsDay,
                rate,
                developer,
                Dividends.address,
                Token.address,
                ProjectLeaderTracker.address,
                Reimbursements.address,
                Voting.address
            );
        })
        // .then(() => {
        //   tokenInstance = Token.at(Token.address);
        //   return tokenInstance.initializeDividendWallet(Dividends.address);
        // })
        // .then(() => {
        //   votingInstance = Voting.at(Voting.address);
        //   return votingInstance.transferOwnership(GNITokenCrowdsale.address);
        // })
        // .then(() => {
        //   const projectLeaderBoardInst = ProjectLeaderTracker.at(ProjectLeaderTracker.address);
        //   return projectLeaderBoardInst.transferOwnership(GNITokenCrowdsale.address);
        // })
        // .then(() => {
        //   return tokenInstance.transferOwnership(GNITokenCrowdsale.address);
        // })
        // .then(() => {
        //   const reimbursementsInst = Reimbursements.at(Reimbursements.address);
        //   return reimbursementsInst.transferOwnership(GNITokenCrowdsale.address);
        // });
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
