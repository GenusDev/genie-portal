pragma solidity >=0.4.22 <0.6.0;
import './Dividends.sol';
import './token/ERC20/Token.sol';

contract DividendsMock is Dividends {

  constructor (Token token_, address  developer_)
  public
  Dividends(token_, developer_) {}

  function init (address  dev) public {
    developer = dev;
  }

  function lastDividendPointsOf(address account) public view returns(uint256) {
    return lastDividendPoints[account];
  }

  function addMockTotalDividendPonts(uint256 eth, uint256 tokens) public {
    totalDividendPoints = eth.mul(1e18).mul(pointMultiplier).div(tokens);
  }

  function setMockLastDividendPoints (uint256 eth, uint256 tokens, address account) public {
    lastDividendPoints[account] = eth.mul(1e18).mul(pointMultiplier).div(tokens);
  }
}
