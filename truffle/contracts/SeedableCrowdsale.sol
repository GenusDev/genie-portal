pragma solidity >=0.4.22 <0.6.0;
import './crowdsale/GNITokenCrowdsale.sol';
import './token/InactiveToken.sol';
import './projectLeader/ProjectLeaderTracker.sol';
import './reimbursements/Reimbursements.sol';
import './voting/Voting.sol';

contract SeedableCrowdsale is GNITokenCrowdsale {
  constructor
    (
      uint256 _openingTime,
      uint256 _doomsDay,
      uint256 _rate,
      address  _developer,
      InactiveToken _token,
      ProjectLeaderTracker _projectLeaderTracker,
      address  _reimbursements
    )
    public
    GNITokenCrowdsale(_openingTime, _doomsDay, _rate, _developer, _token, _projectLeaderTracker, _reimbursements) {}

  /* function seedProject (
    string memory _projectInfo,
    uint256 _capitalRequired,
    uint256 _valuation,
    string _cashflow
    ) public {
    uint256 newDoomsDay = now.add(155520000);
    if (newDoomsDay > doomsDay) {
      doomsDay = newDoomsDay;
      canReOpen = false;
    }
    _pitchProject(
          _projectInfo,
          _capitalRequired,
          _valuation,
          _cashflow
        );
  } */

  function _extendDoomsDay (uint256 _days) internal {
    uint256 newDoomsDay = now.add(_days.mul(1728000));
    if (newDoomsDay > doomsDay) {
      doomsDay = newDoomsDay;
      canReOpen = false;
    }
  }
}
