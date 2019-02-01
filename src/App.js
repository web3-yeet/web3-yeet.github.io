import React, { Component }      from 'react';
import { Button }                from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Typist                    from 'react-typist';
import Ribbon                    from './Ribbon.js';

import { ERC20, Wallet } from 'web3-yeet';

import logo from './logo.png';
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

const EventEmitter = require('events');


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAvailable: false,
    };

    this.wallet        = new Wallet();
    this.token         = new ERC20('0x4f38f4229924bfa28d58eeda496cc85e8016bccc');
    this.bag           = '0xff91c94f45e1114b1c90be6d028381964030584c';
    
    this.accountPoller = new Poller(1000);
    this.accountPoller.onPoll(this.accountCheck);
    this.accountPoller.poll();
  }

  accountCheck = async () => {
    try {
      const isAvailable = await this.wallet.isAvailable();
      const name = await this.token.getSymbol();
      const address = isAvailable
        ? await this.wallet.getAddress()
        : undefined; 
      
      this.setState({
        name:         name,
        isAvailable:  isAvailable,
        address:      address,
      }, () => this.accountPoller.poll());
    } catch (e) {
      await this.wallet.ledgerLogout();

      this.setState({
        ledgerAccess: false,
        loadingLedger: false
      });

      this.accountPoller.poll();
    }
  }

  sendCehh = () => {
    try {
      this.wallet.sendERC20(this.bag, 20, this.token)
    } catch (e) {
      if(/metamask/i.test(e.message))
        toast.info(`MetaMask request rejected!`);
      else
        toast.error(`${e.message}`)
    }
  }
  
  sendEth = () => {
    try {
      this.wallet.sendEther(this.bag, 0.024)
    } catch (e) {
      if(/metamask/i.test(e.message))
        toast.info(`MetaMask request rejected!`);
      else
        toast.error(`${e.message}`)
    }
  }
  
  sign = async () => {
    try {
      const signature = await this.wallet.signMessage("this message");
      this.setState({signature: signature});
    } catch (e) {
      if(/metamask/i.test(e.message))
        toast.info(`MetaMask request rejected!`);
      else
        toast.error(`${e.message}`)
    }
  }

  check = async () => {
    const isYou = await this.wallet.checkMessage("this message", this.state.signature);  
    this.setState({isYou: isYou});
  }
  
  accessLedger = async () => {
    this.setState({loadingLedger: true}, async () => {
      await this.wallet.setLedger().catch(e => {});  
      
      this.setState({
        loadingLedger: false,
        ledgerAccess: this.wallet.ledgerAccess
      });
    });
  }

  render() {
    const address = this.state.address
      ? `${this.state.address.slice(0,12)}...`
      : `No address!`;
    const statusColor = this.state.isAvailable
      ? "#88BD38"
      : "#D0312F";
    const verifyText = typeof this.state.isYou !== 'undefined'
      ? !this.state.isYou 
        ? {emoji: `🚫`, text: `Not you!`}
        : {emoji: `🛂`, text: `Yep, it was you`}
      : {emoji: `🔍`, text: `Verify it was you`};
    const ledgerText =
      (typeof this.state.ledgerAccess !== 'undefined'
      && typeof this.state.loadingLedger !== 'undefined'
      && !this.state.loadingLedger)
        ? !this.state.ledgerAccess
          ? {emoji: `⚠`, text: `Ledger RIP retry?`}
          : {emoji: `💡`, text: `WE GOT IT!!!`}
        : !this.state.loadingLedger
          ? {emoji: `🔌`, text: `Ledger wallet?`}
          : {emoji: `⚙️`, text: `Loading...`}

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
            <div key={this.state.address} className="mb-4 h6">
              <a className="float-left">
                <i className="fas fa-address-card"></i>
                {" "}
                <i className="fas fa-caret-right"></i>
              </a>
              <span>
                  <Typist
                    className="d-inline text-monospace"
                    startDelay={1000}
                    cursor={{hideWhenDone: true, hideWhenDoneDelay: 0, blink: true}}
                  >
                    {`${address}`}
                  </Typist>
              </span>
            </div>
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
              action={this.accessLedger}
              emoji={ledgerText.emoji}
              text={ledgerText.text}
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

class Poller extends EventEmitter {
    constructor(timeout = 1000) {
        super();
        this.timeout = timeout;
    }

    poll() {
        setTimeout(() => this.emit('poll'), this.timeout);
    }

    onPoll(cb) {
        this.on('poll', cb);
    }
}

export default App;
