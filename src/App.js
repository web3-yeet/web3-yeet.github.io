import React, { Component } from 'react';
import { Button } from 'reactstrap';
import Typist from 'react-typist';

import { ERC20, Wallet } from 'web3-yeet';

import logo from './logo.png';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isYou: false,
    };

    try {
      window.ethereum.enable();
    } catch (e) {
      console.log("no web3 wallet");
    }

    this.wallet = new Wallet();
    this.token  = new ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    this.bag    = '0xff91c94f45e1114b1c90be6d028381964030584c';
  }

  async componentDidMount(){
    const name = await this.token.getSymbol();
    this.setState({name: name});
    
    const decimalFactor = await this.token.getDecimalFactor().catch(console.error);
    console.log(decimalFactor)
  }

  sendCehh = () => {
    this.wallet.sendERC20(this.bag, 20, this.token);  
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
          <span className="outer-logo">
            <img src={logo} className="App-logo" alt="logo" />
          </span>
            <span className="title mt-3">
              Web3-YEET
            </span>
          <p className="buttons">
            <Button
              onClick={this.sendCehh}
              color="primary"
              block
            >
              <span className="float-left">{`🐕`}</span>
              <span>
                {`Send some`}
                <Typist
                  className="d-inline"
                  startDelay={2000}
                  cursor={{hideWhenDone: true, hideWhenDoneDelay: 0, blink: true}}
                  avgTypingSpeed={10}
                  onTypingDone={() => this.setState({done: true})}
                >
                  {`...`}
                  <Typist.Backspace count={3} delay={200}/>
                </Typist>
                { this.state.name && this.state.done
                  ? (<Typist className="d-inline" startDelay={1200} cursor={{hideWhenDone: true}} avgTypingSpeed={10}>
                      {` ${this.state.name}`}
                      <Typist.Delay ms={1000} />
                      {`?`}
                    </Typist>)
                  : this.state.done ? (`...`) : null }
              </span>
            </Button>
            <Button
              onClick={this.sendEth}
              color="success"
              block
            >
              <span className="float-left">{`🍻`}</span>
              <span>{`Send some ether?`}</span>
            </Button>
            <Button
              onClick={this.sign}
              color="danger"
              block
            >
              <span className="float-left mr-2">{`✍️`}</span>
              <span>{`Sign "this message"!`}</span>
            </Button>
            <Button
              onClick={this.check}
              color="warning"
              disabled={this.state.signature === undefined}
              block
            >
              <span className="float-left mr-1">{verifyText.emoji}</span>
              <span>{verifyText.text}</span>
            </Button>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
