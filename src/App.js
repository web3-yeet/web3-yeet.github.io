import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Typist from 'react-typist';
import Ribbon from './Ribbon.js';

import { ERC20, Wallet } from 'web3-yeet';

import logo from './logo.png';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      isAvailable: false,
      isYou: false,
    };

    try {
      window.ethereum.enable();
    } catch (e) {
      console.log("No MetaMask detected.");
    }

    this.wallet = new Wallet();
    this.token  = new ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    this.bag    = '0xff91c94f45e1114b1c90be6d028381964030584c';
  }

  async componentDidMount(){
    const isAvailable = await this.wallet.isAvailable();
    const name = await this.token.getSymbol();
    
    this.setState({
      name: name,
      isAvailable: isAvailable,
    });
  }

  sendCehh = () => {
    this.wallet.sendERC20(this.bag, 20, this.token)
      .catch(e => toast.error(`${e.message}`));  
  }
  
  sendEth = () => {
    this.wallet.sendEther(this.bag, 0.024)
      .catch(e => toast.error(`${e.message}`));  
  }
  
  sign = async () => {
    try {
      const signature = await this.wallet.signMessage("this message");
      this.setState({signature: signature});
    } catch (e) {
      toast.error(`${e.message}`);
    }
  }

  check = async () => {
    const isYou = await this.wallet.checkMessage("this message", this.state.signature);  
    this.setState({isYou: isYou});
  }

  render() {
    const statusColor = this.state.isAvailable
    ? "#88BD38"
    : "#D0312F";
    const verifyText = !this.state.isYou 
    ? {emoji: `🔍`, text: `Verify it was you`}
    : {emoji: `🛂`, text: `Yep, it was you`};

    return (
      <div className="App">
        <Ribbon/>
        <header className="App-header">
          <span style={{
            position: "absolute",
            top: "0px",
            width: "100%",
            height: "4px",
            background: statusColor,
            zIndex: "-1",
            transition: "background-color 400ms linear",
          }}/>
          <span className="outer-logo">
            <img src={logo} className="App-logo" alt="logo" />
          </span>
            <span className="title mt-3">
              <span>
                Web3-YEET
              </span>
            </span>
          <span className="buttons">
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
            <ActionButton
              action={this.sendEth}
              emoji={`🍻`}
              text={`Send some ether?`}
            />
            <ActionButton
              action={this.sign}
              emoji={`✍️`}
              text={`Sign "this message"!`}
            />
            <ActionButton
              action={this.check}
              emoji={verifyText.emoji}
              text={verifyText.text}
              disabled={this.state.signature === undefined}
            />
          </span>
        </header>
        <ToastContainer hideProgressBar={true}/>
      </div>
    );
  }
}

const ActionButton = (props) => (
  <Button
    onClick={props.action}
    color="primary"
    disabled={props.disabled}
    block
  >
    <span className="float-left mr-3">{props.emoji}</span>
    <span>{props.text}</span>
  </Button>
);

export default App;
