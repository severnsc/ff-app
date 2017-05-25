import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PlayerRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      percentage: this.props.percentage,
      oldPercentage: null,
      max: null,
      amountSpent: 0,
      oldAmountSpent: null,
    };
    this.calculateMax = this.calculateMax.bind(this);
    this.handleAmountSpentFocus = this.handleAmountSpentFocus.bind(this);
  }

  handlePercentageBlur() {
    this.props.percentageChange(this.state.oldPercentage, this.state.percentage);
  }

  handleAmountSpentFocus() {
    if(this.state.amountSpent > 0){
      this.setState({oldAmountSpent: this.state.amountSpent})
    }else{
      this.setState({oldAmountSpent: this.calculateMax()})
    }
  }

  handleAmountSpentBlur() {
    this.props.amountSpentChange(this.state.oldAmountSpent, this.state.amountSpent)
  }

  calculateMax() {
    if(this.state.amountSpent > 0){
      return this.state.amountSpent
    }
    let multiplier = this.state.percentage / 100;
    let max = parseInt(this.props.budget) * multiplier;
    return max;
  }

  render() {
    return (
      <tr>
        <td>{this.props.position}</td>
        <td><input type="text" /></td>
        <td>
          <input 
            type="text" 
            value={this.state.amountSpent}
            onFocus={this.handleAmountSpentFocus}
            onChange={(event) => this.setState({amountSpent: event.target.value})} 
            onBlur={this.handleAmountSpentBlur.bind(this)}
          />
        </td>
        <td><input type="text" readOnly value={this.calculateMax()} onChange={(event) => this.setState({max: event.target.value})} /></td>
        <td><input type="text" value={this.state.percentage} 
          onChange={(event) => this.setState({percentage: event.target.value})}
          onFocus={(event) => this.setState({oldPercentage: event.target.value})}
          onBlur={this.handlePercentageBlur.bind(this)}
        /></td>
      </tr>
    );
  }
}

class PlayerRows extends Component {
  constructor(props){
    super(props);
    this.state = {
      budget: 200,
      qbs: 1,
      rbs: 7,
      wrs: 6,
      tes: 1,
      sum: 100,
      amountSpent: 200,
    };
    this.calculateSum = this.calculateSum.bind(this);
    this.calculateAmountSpent = this.calculateAmountSpent.bind(this);
  }

  calculateSum(oldValue, newValue) {
    let difference = (newValue * 10 - oldValue * 10)/10;
    let sum = (this.state.sum * 10 + difference * 10)/10;
    this.setState({sum});
  }

  calculateAmountSpent(oldValue, newValue) {
    let difference = newValue - oldValue;
    let amountSpent = this.state.amountSpent + parseInt(difference);
    this.setState({amountSpent});
  }

  render() {
    
    let qbKeys = null;
    let qbRows = [];
    if(this.state.qbs > 0){
      qbKeys = [...Array(parseInt(this.state.qbs)).keys()];
      qbRows = qbKeys.map((x) => {return <PlayerRow position="QB" key={x} percentage={.5/(qbKeys.length)} percentageChange={this.calculateSum} amountSpentChange={this.calculateAmountSpent} budget={this.state.budget} /> });
    }

    let rbKeys = null;
    let rbRows = [];
    if(this.state.rbs > 0){
      rbKeys = [...Array(parseInt(this.state.rbs)).keys()];
      let rbValues = [5, 5, 2.5, 2.5, 1.25, 1.25, .5];
      rbRows = rbKeys.map((x) => {return <PlayerRow position="RB" key={x} percentage={rbValues[x]} percentageChange={this.calculateSum} amountSpentChange={this.calculateAmountSpent} budget={this.state.budget} /> });
    }

    let wrKeys = null;
    let wrRows = [];
    if(this.state.wrs > 0){
      wrKeys = [...Array(parseInt(this.state.wrs)).keys()];
      let wrValues = [25, 25, 10, 10, 5, 5];
      wrRows = wrKeys.map((x) => {return <PlayerRow position="WR" key={x} percentage={wrValues[x]} percentageChange={this.calculateSum} amountSpentChange={this.calculateAmountSpent} budget={this.state.budget} /> });
    }

    let teKeys = null;
    let teRows = [];
    if(this.state.tes > 0){
      teKeys = [...Array(parseInt(this.state.tes)).keys()];
      teRows = teKeys.map((x) => {return <PlayerRow position="TE" key={x} percentage={.5/(teKeys.length)} percentageChange={this.calculateSum} amountSpentChange={this.calculateAmountSpent} budget={this.state.budget} /> });
    }

    return(
      <div className="row">
        <div className="setup">
          <input type="text" 
            value={this.state.budget} 
            onChange={(event) => {this.setState({budget: event.target.value})}}
            onBlur={(event) => this.setState({amountSpent: event.target.value})} 
          />
          <span>
            QBs<input 
              type="text" 
              value={this.state.qbs} 
              onChange={(event) => {this.setState({qbs: event.target.value})}}
              />
            RBs<input 
              type="text" 
              value={this.state.rbs} 
              onChange={(event) => {this.setState({rbs: event.target.value})}}
              onBlur={this.updateRBRows}
              />
            WRs<input 
              type="text" 
              value={this.state.wrs} 
              onChange={(event) => {this.setState({wrs: event.target.value})}} 
              onBlur={this.updateWRRows}
              />
            TEs<input 
              type="text" 
              value={this.state.tes} 
              onChange={(event) => this.setState({tes: event.target.value})} 
              onBlur={this.updateTERows}
              />
          </span>
        </div>
        <div className="players">
          <table>
            <thead>
              <tr>
                <td>Position</td>
                <td>Player Name</td>
                <td>Amount Spent</td>
                <td>Maximum allowable amount</td>
                <td>Maximum percentage of budget</td>
              </tr>
            </thead>
            <tbody>
              {qbRows}
              {wrRows}
              {rbRows}
              {teRows}
              <PlayerRow 
                position="DST" 
                percentage={.5}
                percentageChange={this.calculateSum}
                amountSpentChange={this.calculateAmountSpent}
                budget={this.state.budget} />
              <PlayerRow 
                position="K" 
                percentage={.5} 
                percentageChange={this.calculateSum}
                amountSpentChange={this.calculateAmountSpent}
                budget={this.state.budget} 
              />
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td>Amount Spent: {this.state.amountSpent}</td>
                <td>{this.state.sum}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerRows />
      </div>
    );
  }
}

export default App;
