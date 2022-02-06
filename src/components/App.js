import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from'./Navbar'
import Token from '../abis/Token.json'
import Swap from '../abis/Swap.json'
import Main from'./Main'

class App extends Component {


async componentWillMount() {
    await this.loadweb3();
    await this.loadblockchaindata()
  }

  async loadblockchaindata(){
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts() // fetch address of accounts connected with metamask
    console.log(accounts[0]) // accounts[0] ensures fetching first part of the array
    this.setState({account : accounts[0]})
    const userethbalance = await web3.eth.getBalance(this.state.account)
    this.setState({userethbalance : userethbalance})
    // this.setState({userethbalance : userethbalance}) =  this.setState({userethbalance}) when they have the same name 
    console.log(this.state.userethbalance)
    
    // Loading Token

    const networkId = await web3.eth.net.getId()
    
    const tokendata = Token.networks[networkId]
    if(tokendata)
    {
      const abi = Token.abi
      const address = tokendata.address
      const token  = new web3.eth.Contract(abi, address)
      this.setState({token : token})
      let tokenbalance = await token.methods.balances(this.state.account).call()
      console.log("tokenbalance", tokenbalance)
      this.setState({tokenbalance : tokenbalance.toString()})
    }
    else
    {
      window.alert('Token contract not deployed to detected network')
    }

    // Loading Swap

    
    const swapdata = Swap.networks[networkId]
    if(swapdata)
    {
      const abi = Token.abi
      const address1 = swapdata.address
      const swap  = new web3.eth.Contract(abi, address1)
      this.setState({swap : swap})
        }
    else
    {
      window.alert('Token contract not deployed to detected network')
    }

    console.log(this.state.swap)

     this.setState({loading: false}) 





  }
  async loadweb3() {

     if (window.ethereum) {
       // latest dapp browsers
          window.web3 = new Web3(window.ethereum);
          await window.ethereum.enable()
      }
      // Legacy dapp browsers...
      else if (window.web3) {
          window.web3 = new Web3(window.web3.currentProvider);
       }
      // Non-dapp browsers...
      else {
          window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
      }
  }


buyTokens = (etherAmount) => {
  this.setState({ loading : true})
  console.log("sdsdsdhhhhhhhhhhhhhhh")
  console.log(etherAmount)
  this.state.swap.methods.buyTokens().send({ value: etherAmount, from: this.state.account}).on('transactionHash', (hash) =>{
    console.log("second last",etherAmount)
  
    this.setState({ loading : false})  
  })
}

sellTokens = (tokenAmount) => {
  this.setState({ loading : true})
  console.log("selll")
  console.log(tokenAmount)
  this.state.token.methods.approve(this.state.swap.address, tokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) =>{
  this.state.swap.methods.sellTokens(tokenAmount).send({ from: this.state.account}).on('transactionHash', (hash) =>{
    
    console.log("second last selll",tokenAmount)
  
    this.setState({ loading : false})  
  })
 })
}

  constructor(props){
      super(props)
      this.state = {
        account: '',
        token: {},
        swap: {},
        userethbalance: '0',
        tokenbalance: '0',
        loading: true
        

      }

  }
  render() {
      let content 
      if(this.state.loading)
      {
        content = <p id="loader" className='text-center' >Loading.........</p>
      }
      else
      {
        content = <Main 
        userethbalance = {this.state.userethbalance} 
        tokenbalance= {this.state.tokenbalance}
        buyTokens= {this.buyTokens}
        sellTokens= {this.sellTokens}
        
        /> 
      }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto ml-auto" style={{maxwidth: '600px'}}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {/* <img src={logo} className="App-logo" alt="logo" /> */}
                </a>
                    {content}
               </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
