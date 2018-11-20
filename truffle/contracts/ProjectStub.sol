pragma solidity ^0.4.23;
import './Project.sol';
import './ContractStub.sol';

contract ProjectStub is Project, ContractStub {
  constructor (
    uint256 _id,
    string _name,
    address _developer,
    uint256 _valuation,
    uint256 _capitalRequired,
    uint256 _developerTokens,
    uint256 _investorTokens,
    string _lat,
    string _lng,
    uint256 _mockVotes
    )
    public
    Project(
      _id,
      _name,
      _developer,
      _valuation,
      _capitalRequired,
      _developerTokens,
      _investorTokens,
      _lat,
      _lng
      )
      {
    totalVotes = _mockVotes;
  }

  function vote (address voter, uint256 voteAmount) external {
    CallData storage methodState = method['vote'];
    methodState.firstAddress = voter;
    methodState.firstUint = voteAmount;
  }

  function removeVotes (address voter, uint256 voteAmount) external {
    CallData storage methodState = method['removeVotes'];
    if (methodState.firstAddress == address(0)) {
      methodState.firstAddress = voter;
      methodState.firstUint = voteAmount;
    } else if (methodState.secondAddress == address(0)) {
      methodState.secondAddress = voter;
      methodState.secondUint = voteAmount;
    } else {
      methodState.thirdAddress = voter;
      methodState.thirdUint = voteAmount;
    }
  }

  bool stubOpenStatus;

  function setStubOpenStatus (bool status) public {
    stubOpenStatus = status;
  }

  function open () public view returns (bool) {
    return stubOpenStatus;
  }

  uint256 stubCapRequired;

  function setStubCapRequired (uint256 cap) public {
    stubCapRequired = cap;
  }

  function capitalRequired_ () public view returns (uint256) {
    return stubCapRequired;
  }

  function developerTokens_ () public view returns (uint256) {
    return 10000000;
  }

  function investorTokens_ () public view returns (uint256) {
    return 10000000;
  }

  function activate () external {
    CallData storage methodState = method['activate'];
    methodState.called = true;
  }
}
