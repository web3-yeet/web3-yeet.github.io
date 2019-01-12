import React, { Component } from 'react';
import { Button } from 'reactstrap';

import { ERC20, Wallet } from 'web3-yeet';

import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      name: '...',
    };

    window.ethereum.enable();
    this.wallet = new Wallet();
    this.token  = new ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    this.bag    = '0xff91c94f45e1114b1c90be6d028381964030584c';
  }

  async componentDidMount(){
    const name = await this.token.getSymbol();
    this.setState({name: name});
  }

  sendCehh = () => {
    this.wallet.sendERC20(this.bag, 42, this.token);  
  }
  
  sendEth = () => {
    this.wallet.sendEther(this.bag, 0.024);  
  }
  
  sign = () => {
    this.wallet.signMessage("this message");  
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Web3-YEET
          </p>
          <p>
            <Button
              onClick={this.sendCehh}
              color="primary"
              block
            >
              {`Send some ${this.state.name}?`}
            </Button>
            <Button
              onClick={this.sendEth}
              color="info"
              block
            >
              {`Send some ether?`}
            </Button>
            <Button
              onClick={this.sign}
              color="success"
              block
            >
              {`Sign "this message"!`}
            </Button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
