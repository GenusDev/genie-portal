/* pragma solidity 0.4.24;

//revceieves the address of active tokens in constructor
//has a function to disribute dividends
//has reference to crowdsale to get the investors array. this may not be possible...we cant pass an array of dynamic length

contract Dividends {
  GNIToken token;
  GNITokenCrowdsale crowdsale;

  constructor (GNIToken _token, GNITokenCrowdsale _crowdsale) {
    token = _token;
    crowdsale = _crowdsale;
  }

  function distributeDividends () external {
    //store the total amount of wei in a variable
    //iterate through each investor.
    //divide the total active tokens by the number of active investor tokens.
    //divide the total wei by the resulting number to find out how much to wei to transfer
    Investor[] = GNITokenCrowdsale(crowdsale).inves
    uint256 tokens = GNIToken(token).totalSupply();
    uint256 profits = address(this).balance.sub(weiRaised);

    for (uint256 i = 0; i < investors.length; i = i.add(1)) {
      grantDividend(investors[i].addr, tokens, profits);
    }

    grantDividend(developer, tokens, profits);
  }

  function grantDividend (address investor, uint256 tokens, uint256 profits) private {
    uint256 investorActive = GNIToken(token).balanceOf(investor);
    uint256 investorShare = tokens.div(investorActive);
    uint256 dividend = profits.div(investorShare);
    investor.transfer(dividend);
  }
} */
