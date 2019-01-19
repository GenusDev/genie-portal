pragma solidity ^0.4.24;
import "./ERC20Basic.sol";
import '../../utility/SafeMath.sol';


/**
 * @title Basic token
 * @dev Basic version of StandardToken, with no allowances.
 */
contract BasicToken is ERC20Basic {
  using SafeMath for uint256;

  /* mapping(address => uint256) internal balances; */

  struct Balance {
    uint256 active;
    uint256 inactive;
    uint256 assigned;
    bool exists;
  }

  mapping(address => Balance) internal balances;

  mapping(uint256 => address) internal accounts;
  uint256 internal totalAccounts_;

  uint256 internal totalSupply_;

  /**
  * @dev Total number of tokens in existence
  */


  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function totalAccounts () public view returns (uint256) {
    return totalAccounts_;
  }

  function existingAccount (address account) public view returns (bool) {
    return balances[account].exists;
  }

  function initAccount (address account) internal {
    if (!existingAccount(account)) {
      Balance memory newBalance;
      newBalance.exists = true;
      balances[account] = newBalance;

      accounts[totalAccounts_] = account;
      totalAccounts_ = totalAccounts_.add(1);
    }
  }

  /**
  * @dev Transfer token for a specified address
  * @param _to The address to transfer to.
  * @param _value The amount to be transferred.
  */
  function transfer(address _to, uint256 _value) public returns (bool) {

    require(_value <= balanceOf(msg.sender));
    require(_to != address(0));

    initAccount(_to);

    /* balances[msg.sender].total = balances[msg.sender].total.sub(_value); */
    /* balances[_to].total = balances[_to].total.add(_value); */
    emit Transfer(msg.sender, _to, _value);
    return true;
  }

  /**
  * @dev Gets the balance of the specified address.
  * @param _owner The address to query the the balance of.
  * @return An uint256 representing the amount owned by the passed address.
  */
  /* function balanceOf(address _owner) public view returns (uint256) {
    //if it is not 0
    return balances[_owner];
    //else return active balance of owner
  } */

}
