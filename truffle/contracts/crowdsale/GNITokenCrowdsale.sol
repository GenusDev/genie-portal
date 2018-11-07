pragma solidity 0.4.24;
import './TimedCrowdsale.sol';
import '../utility/SafeMath.sol';
import '../Project.sol';
import '../token/ERC20/Token.sol';
import '../InvestorList.sol';

contract GNITokenCrowdsale{
  using SafeMath for uint256;

  /* uint256 public totalValuation; */
  /* InvestorList private investorList; */

  /* constructor
      (
        uint256 _openingTime,
        uint256 _doomsDay,
        uint256 _rate,
        address _developer,
        Token _token,
        InvestorList _investorList
      )
      public
      TimedCrowdsale(_openingTime, _doomsDay) {
        investorList = InvestorList(_investorList);
        totalValuation = 0;
      } */


  function doSomething() public pure returns (uint256) {
      return 2;
  }
}
