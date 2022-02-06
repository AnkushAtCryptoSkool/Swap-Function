// SPDX-License-Identifier: MIT

pragma solidity >=0.4.22 <0.9.0;

import "./Token.sol";

contract Swap {

string public name = "Swap";
Token public token ;
uint public rate = 100;
address addr1 = msg.sender;
event Tokenpurchased(
    address account,
    address token,
    uint amount,
    uint rate
);

constructor(Token _token) public {

token =_token;
}

function buyTokens() public payable {
uint g;
g = msg.value;
uint totalamount = g * rate;
require(token.balances(address(this)) >= totalamount);
token.transfer(msg.sender,totalamount);

//emit an event 
emit Tokenpurchased(msg.sender, address(token), totalamount, rate);

}


function sellTokens(uint _amount) public payable{

require(token.balances(msg.sender) >= _amount);
uint etheramount =  _amount / rate;
token.approve(msg.sender,_amount);
token.transferFrom(msg.sender,address(this), _amount);

}



}