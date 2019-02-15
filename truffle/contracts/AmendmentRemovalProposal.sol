pragma solidity >=0.4.22 <0.6.0;
import './Amendment.sol';
import './utility/Ownable.sol';
import './Cooperative.sol';

contract AmendmentRemovalProposal is Ownable {
  uint256 amendmentId;

  constructor (uint256 _amendmentId) public {
    amendmentId = _amendmentId;
  }

  function executeRemoval () public {
    Cooperative(owner).adoptAmendmentRemoval(amendmentId);
  }
}
