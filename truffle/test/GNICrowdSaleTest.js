const GNITokenCrowdsale = artifacts.require("./GNITokenCrowdsale.sol");

contract("GNITokenCrowdsale", accounts => {
  it("Contract should send tokens deployed but not purchased to developer wallet", async () => {

    const GNITokenCrowdsale = await GNITokenCrowdsale.deployed();

    await GNITokenCrowdsale.deployProject(Project1, { from: accounts[0] });

    TotalTokensDeployed = GNITokenCrowdsale.

    distributeDividends

    // Get myString from public variable getter
    const storedString = await myStringStore.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });

  it("Contract should send tokens deployed but not purchased to developer wallet", async () => {

    const GNITokenCrowdsale = await GNITokenCrowdsale.deployed();

    await GNITokenCrowdsale.deployProject(Project1, { from: accounts[0] });

    TotalTokensDeployed = GNITokenCrowdsale.

    distributeDividends

    // Get myString from public variable getter
    const storedString = await myStringStore.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });

  it("Tokens are deployed based on the proportion of deployed tokens relative to all tokens held'", async () => {

    let tokensDeployed;
    let tokensPurchased;
    let developerWallet;

    const GNITokenCrowdsale = await GNITokenCrowdsale.deployed();

    // Set myString to "Hey there!"
    await GNITokenCrowdsale.deployProject(Project1, { from: accounts[0] });

    TotalTokensDeployed = GNITokenCrowdsale.

    distributeDividends

    // Get myString from public variable getter
    const storedString = await myStringStore.myString.call();

    assert.equal(storedString, "Hey there!", "The string was not stored");
  });
});
