pragma solidity ^0.4.23;
import './utility/SharedStructs.sol';
import './utility/SafeMath.sol';

contract InvestorList {
  using SafeMath for uint256;
  SharedStructs.Investor[] public investors;
  mapping(address => uint256) internal investorIds;

  event LogVotes (
    address voter,
    uint256 projectId,
    uint256 amount
    );

  function investorCount() external view returns(uint256) {
    return investors.length;
  }

  //make this function only accessible by crowdsale for security
  function addrById (uint256 id) external view returns(address) {
    return investors[id].addr;
  }

  function transferVoteCredit (uint256 id, uint256 projectId) external {
    uint256 voteCredit = investors[id].votes[projectId];
    investors[id].votes[projectId] = 0;
    investors[id].voteCredit = investors[id].voteCredit.add(voteCredit);
  }

  function handleNewPurchase(uint256 projectId, uint256 votes, address investor) external {
    if (investorIds[investor] == 0) {
      addInvestor(investor);
    }
    investors[investorIds[investor]].votes[projectId] = investors[investorIds[investor]].votes[projectId].add(votes);
    emit LogVotes(investor, projectId, votes);
  }

  function addInvestor(address investor) private {
    SharedStructs.Investor memory newInvestor;

    newInvestor.addr = investor;

    uint256 id = investors.length;
    newInvestor.id = id;
    investorIds[investor] = id;

    investors.push(newInvestor);
  }
}