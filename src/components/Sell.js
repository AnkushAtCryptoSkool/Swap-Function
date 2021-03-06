import React, { Component } from 'react';

class Sell extends Component {

  constructor(props){
    super(props)
    this.state = {
      output: '0',
    }

}


  render() {
    return (
        <form className="mb-3" onSubmit={(event) => {
            event.preventDefault()
            let tokenAmount
            tokenAmount = this.input.value.toString()
            // etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
            console.log('stokensells',tokenAmount)
            this.props.sellTokens(tokenAmount)
          }}>
          <div>
            <label className="float-left"><b>Input</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.tokenbalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-4">
            <input
              type="text"
              onChange={(event) => {
                const tokenAmount = this.input.value.toString()
                this.setState({
                  output: tokenAmount / 100
                })
              }}
              ref={(input) => { this.input = input }}
              className="form-control form-control-lg"
              placeholder="0"
              required />
            <div className="input-group-append">
              <div className="input-group-text">
                {/* <img src={ethLogo} height='32' alt=""/> */}
                &nbsp;&nbsp;&nbsp; Dapp
              </div>
            </div>
          </div>
          <div>
            <label className="float-left"><b>Output</b></label>
            <span className="float-right text-muted">
              Balance: {window.web3.utils.fromWei(this.props.userethbalance, 'Ether')}
            </span>
          </div>
          <div className="input-group mb-2">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="0"
              value={this.state.output}
              disabled
            />
            <div className="input-group-append">
              <div className="input-group-text">
                {/* <img src={tokenLogo} height='32' alt=""/> */}
                &nbsp; ETH
              </div>
            </div>
          </div>
          <div className="mb-5">
            <span className="float-left text-muted">Exchange Rate</span>
            <span className="float-right text-muted">100 Dapp = 1 Eth</span>
          </div>
          <button type="submit" className="btn btn-primary btn-block btn-lg">SWAP!</button>
        </form>


        );
  }
}

export default Sell;
