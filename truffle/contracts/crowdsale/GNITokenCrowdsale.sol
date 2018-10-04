pragma solidity 0.4.24;

import '../token/GNIToken.sol';
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';

contract GNITokenCrowdsale is TimedCrowdsale {
    using SafeMath for uint256;
    address public developerWallet;
    uint256 public totalValuation;

    constructor
        (
          uint256 _openingTime,
          uint256 _doomsDay,
          uint256 _rate,
          address _wallet,
          MintableToken _token
        )
        public
        Crowdsale(_rate, _wallet, _token)
        TimedCrowdsale(_openingTime, _doomsDay) {
            totalValuation = 0;
        }

        struct Project {
            string name;
            uint256 closingTime;
            uint256 valuation;
            uint256 capitalRequired;
            string lat;
            string lng;
            uint256 voteCount;
            bool capitalReached;
            bool active;
        }

        event LogProject (
            string name,
            uint256 valuation,
            uint256 capitalRequired,
            string lat,
            string lng,
            uint256 voteCount,
            bool capitalReached,
            bool active
        );


        mapping(string => Project) private projects;


         function getProjectInfo(string _name) public view returns(
             string, uint256, uint256, bool, uint256, uint256

         ) {
             Project memory project = projects[_name];
             return (
                 project.name,
                 project.valuation,
                 project.capitalRequired,
                 project.active,
                 project.voteCount,
                 project.closingTime
             );
         }

         //change _valuation to projectvaluation
         function pitchProject(string _name, uint capitalRequired, uint _valuation, string _lat, string _lng) public payable {
            issueTokensBasedOnPrice(_valuation);

             totalValuation = totalValuation.add(_valuation);

             // Increase crowdsale duation by 90 days
             _extendDoomsDay(90);

             // Create project information
             Project memory newProject = Project({
                 name: _name,
                 closingTime: now + 86600 * 240,
                 valuation: _valuation,
                 capitalRequired: capitalRequired,
                 lat: _lat,
                 lng: _lng,
                 capitalReached: false,
                 active: false,
                 voteCount: 0
             });

             // Save project information
             projects[_name] = newProject;



             // log the creation of the new project
             emit LogProject(_name, _valuation, capitalRequired, _lat, _lng, 0, false, false);
         }

         function issueTokensBasedOnPrice(uint256 valuation) private {
           uint tokensToIssue = valuation.div(rate);

           //tokens go to the this contract
           //we need to do this because transfer expects to take tokens from msg.sender, which is this contract
           GNIToken(token).mint(this, tokensToIssue);
         }

         //sender is always the beneficiary
         //sender becomes this contract in BasicToken
         //funds from msg.value are allocated to this contract since this function is a payable.
         //later, we can assign funds to the wallet (which is the developer wallet). No second wallet is needed because the contract serves as an escrow wallet.
         function handleInvestment (string _projectName) public payable {
           buyTokens(msg.sender);
           updateProjectVotedFor(_projectName);
         }

         function collectFunds () public {
           wallet.transfer(1);
         }

         function updateProjectVotedFor(string _projectName) {
           updateVoteCount(_projectName);
           extendProjectClosingTime(_projectName);
         }

         /* Project storage _projectVotedFor = projects[_projectName]; */

         function updateVoteCount(string _projectName) internal {
             projects[_projectName].voteCount = projects[_projectName].voteCount.add(1);
         }

        function extendProjectClosingTime(string _projectName) internal {
          projects[_projectName].closingTime = projects[_projectName].closingTime.add(43200);
        }

        function _extendDoomsDay(uint256 _days) internal onlyWhileOpen {
            doomsDay = doomsDay.add(_days.mul(1728000));
        }

}
