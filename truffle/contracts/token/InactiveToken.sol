/* pragma solidity 0.4.24;
import "../utility/Ownable.sol";

contract InactiveToken is Ownable {
  mapping(address => uint256) internal balances;

  uint256 internal totalSupply_;

  event TransferInactive(address indexed from, address indexed to, uint256 value);

  function totalSupply() public view returns (uint256) {
    return totalSupply_;
  }

  function transfer(address _to, uint256 _value) public returns (bool) {

    require(_value <= balances[msg.sender]);
    require(_to != address(0));

    balances[msg.sender] = balances[msg.sender].sub(_value);
    balances[_to] = balances[_to].add(_value);
    emit TransferInactive(msg.sender, _to, _value);
    return true;
  }

  function balanceOf(address _owner) public view returns (uint256) {
    return balances[_owner];
  }

  event Mint(address indexed to, uint256 amount);
  event MintFinished();

  bool public mintingFinished = false;

  event logOwner(
        address owner,
        address sender
  );


  modifier canMint() {
    require(!mintingFinished);
    _;
  }

  modifier hasMintPermission() {
    emit logOwner(owner,msg.sender);
    require(msg.sender == owner);
    _;
  }
  /* hasMintPermission */

  /* function mint(
    address _to,
    uint256 _amount
  )
    public
    canMint
    returns (bool)
  {
    totalSupply_ = totalSupply_.add(_amount);
    balances[_to] = balances[_to].add(_amount);
    emit Mint(_to, _amount);
    emit Transfer(address(0), _to, _amount);
    return true;
  }

  function finishMinting() public onlyOwner canMint returns (bool) {
    mintingFinished = true;
    emit MintFinished();
    return true;
  }
}  */
