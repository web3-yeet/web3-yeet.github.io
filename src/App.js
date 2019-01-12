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
      isYou: false,
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
  
  sign = async () => {
    const signature = await this.wallet.signMessage("this message");  
    this.setState({signature: signature})
  }

  check = async () => {
    const isYou = await this.wallet.checkMessage("this message", this.state.signature);  
    this.setState({isYou: isYou});
  }

  render() {
    const verifyText = !this.state.isYou 
    ? {emoji: `🔍`, text: `Verify it was you`}
    : {emoji: `🛂 `, text: `Yep, it was you`};

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
              <span className="float-left">{`🐕`}</span>
              {`Send some ${this.state.name}?`}
            </Button>
            <Button
              onClick={this.sendEth}
              color="success"
              block
            >
              <span className="float-left">{`🍻`}</span>
              {`Send some ether?`}
            </Button>
            <Button
              onClick={this.sign}
              color="danger"
              block
            >
              <span className="float-left mr-2">{`✍️`}</span>
              {`Sign "this message"!`}
            </Button>
            <Button
              onClick={this.check}
              color="warning"
              disabled={this.state.signature === undefined}
              block
            >
              <span className="float-left mr-1">{verifyText.emoji}</span>
              {verifyText.text}
            </Button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
