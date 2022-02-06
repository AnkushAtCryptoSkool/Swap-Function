import React, { Component } from 'react';
import Buy from './Buy';
import Sell from './Sell';
class Main extends Component {

  constructor(props){
    super(props)
    this.state = {
      currentform: 'buy',

    }

}


  render() {
    
    let content
    if(this.state.currentform === 'buy')
    {
      content = 
      <Buy  userethbalance={this.props.userethbalance}
      tokenbalance={this.props.tokenbalance}
      buyTokens={this.props.Buytokens}/>

    }
    else
    {
      content = <Sell userethbalance={this.props.userethbalance}
      tokenbalance={this.props.tokenbalance}
      sellTokens={this.props.sellTokens}/>
    }
    return (
      
      <div id="content" className="mt-3" >

<div className="d-flex justify-content-between mb-3">
<button 
className="btn btn-light"
 onClick={(event)=> {
   this.setState({currentform: 'buy'})
 }} >Buy

 </button>
<span className="text-muted">&lt; &nbsp; &gt;</span>
<button className="btn btn-light"
className="btn btn-light"
onClick={(event)=> {
  this.setState({currentform: 'sell'})
}}>Sell
</button>

</div>


            <div className="card mb-4" >

          <div className="card-body">
              {content}
          </div>

        </div>
 




      </div>
    );
  }
}

export default Main;
