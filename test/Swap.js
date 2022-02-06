// const { assert } = require("chai");

const { assert } = require("chai");
const { default: Web3 } = require("web3");

var Swap = artifacts.require('Swap.sol');
var Token = artifacts.require('Token.sol');

function tokens(n) {
    return web3.utils.toWei(n,'ether');
}

contract('Swap', function([deployer , investor]){
    let token, swap

before(async () => {
     token = await Token.new(1000000);
     swap = await Swap.new(token.address);
    await token.transfer(swap.address, '1000000');
    
})

describe('Token Deployment', async() =>   {
    
    it('Token contract has a name', async() =>   {
        const name1 = await token.name();
        assert.equal(name1, 'IA Token');
    })
})

    describe('Swap deployment', async() =>   {
    
    it('contract has a name', async() =>   {
    
        const name = await swap.name();
        assert.equal(name, 'Swap');
    
    })
    it('contract has tokens', async() =>   {
        let balance = await token.balances(swap.address)
        assert.equal(balance.toString(), '1000000');
    })
})

describe('buyTokens()', async() =>   {

    let result 

    before(async () => {
    result = await swap.buyTokens({from : investor, value : '1'});
  
   })
   

    it('allows users to purchase tokens', async() => {

        // await swap.buyTokens({from : investor, value : '10'});
  
        let investorbalance = await token.balances(investor);
        assert.equal(investorbalance.toString(), 100);

        let swapbalance = await token.balances(swap.address);
        assert.equal(swapbalance.toString(), 999900);

        swapbalance = await web3.eth.getBalance(swap.address);
        assert.equal(swapbalance.toString(), 1)

        const event = result.logs[0].args
        assert.equal(event.account, investor, 'investor check');
        assert.equal(event.token,token.address, 'token check');
        assert.equal(event.amount.toString(),100,'amount transfered check');
        assert.equal(event.rate.toString(),100,'rate check');
       
   

    })


})

describe('selltokens()', async() => {
let result
    before(async () => {
        await token.approve(swap.address, 100, { from: investor })
        result = await swap.sellTokens(10, { from : investor })
    })

    it('allows users to sell tokens', async() => {
      
   let investorbalance = await token.balances(investor);
   assert.equal(investorbalance.toString(), 0);

    })


})


})