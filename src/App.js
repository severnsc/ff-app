import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PlayerRow extends Component {
  render() {
    return (
      <span>
        <input type="text" name={this.props.playerName}/>
        <input type="text" name={this.props.amountName}/>
        <input type="text" readOnly name={this.props.maxName}/>
        <input type="text" name={this.props.percentageName}/>
      </span>
    );
  }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      QB: 1,
      WR: 6,
      RB: 7,
      TE: 1,
      DST: 1,
      K: 1,
    };
    var playerRows = null;
  }

  updateQB(amount) {
    this.setState((prevState, props) => {QB: amount});
  }

  updateRB(amount) {
    this.setState((prevState, props) => {RB: amount})
  }

  updateWR(amount) {
    this.setState((prevState, props) => {WR: amount})
  }

  updateTE(amount) {
    this.setState((prevState, props) => {TE: amount})
  }

  updatePlayerRows() {

  }

  render() {

    return (
      <div className="App">
        <div class="Setup">
          <span>How much is your auction budget?</span>
          <input type="text" name="auctionBudget" />
        </div>
      </div>
    );
  }
}

export default App;
