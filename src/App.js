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
    };
    this.calculateMax = this.calculateMax.bind(this);
  }

  handleBlur() {
    this.props.percentageChange(this.state.oldPercentage, this.state.percentage);
  }

  calculateMax() {
    let multiplier = this.state.percentage / 100;
    let max = parseInt(this.props.budget) * multiplier;
    return max;
  }

  render() {
    return (
      <tr>
        <td>{this.props.position}</td>
        <td><input type="text" /></td>
        <td><input type="text" /></td>
        <td><input type="text" readOnly value={this.calculateMax()} onChange={(event) => this.setState({max: event.target.value})} /></td>
        <td><input type="text" value={this.state.percentage} 
          onChange={(event) => this.setState({percentage: event.target.value})}
          onFocus={(event) => this.setState({oldPercentage: event.target.value})}
          onBlur={this.handleBlur.bind(this)}
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
      sum: 100
    };
    this.qbRows = [<PlayerRow position="QB" key="1" percentage={.5} percentageChange={this.calculateSum.bind(this)} budget={this.state.budget} />];
    this.rbRows = [
        <PlayerRow position="RB" key="1" percentage={5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="2" percentage={5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="3" percentage={2.5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="4" percentage={2.5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="5" percentage={1.25} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="6" percentage={1.25} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="RB" key="7" percentage={.5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
      ];
    this.wrRows = [
        <PlayerRow position="WR" key="1" percentage={25} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="WR" key="2" percentage={25} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="WR" key="3" percentage={10} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="WR" key="4" percentage={10} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="WR" key="5" percentage={5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
        <PlayerRow position="WR" key="6" percentage={5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
      ];
    this.teRows = [
        <PlayerRow position="TE" key="1" percentage={.5} percentageChange={this.calculateSum.bind(this)} budget={200} />,
      ];
    this.updateQBRows = this.updateQBRows.bind(this);
    this.updateRBRows = this.updateRBRows.bind(this);
    this.updateWRRows = this.updateWRRows.bind(this);
    this.updateTERows = this.updateTERows.bind(this);
    this.calculateSum = this.calculateSum.bind(this);
  }

  updateQBRows(event) {
    let qbKeys = [...Array(parseInt(event.target.value)).keys()];
    this.qbRows = qbKeys.map((x) => {return <PlayerRow position="QB" key={x} percentageChange={this.calculateSum} budget={this.state.budget} /> });
  }

  updateRBRows(event) {
    let rbKeys = [...Array(parseInt(event.target.value)).keys()];
    this.rbRows = rbKeys.map((x) => {return <PlayerRow position="RB" key={x} percentageChange={this.calculateSum} budget={this.state.budget} /> });
  }

  updateWRRows(event) {
    let wrKeys = [...Array(parseInt(event.target.value)).keys()];
    this.wrRows = wrKeys.map((x) => {return <PlayerRow position="WR" key={x} percentageChange={this.calculateSum} budget={this.state.budget} /> });
  }

  updateTERows(event) {
    let teKeys = [...Array(parseInt(event.target.value)).keys()];
    this.teRows = teKeys.map((x) => {return <PlayerRow position="TE" key={x} percentageChange={this.calculateSum} budget={this.state.budget} /> });
  }

  calculateSum(oldValue, newValue) {
    let difference = (newValue * 10 - oldValue * 10)/10;
    let sum = (this.state.sum * 10 + difference * 10)/10;
    this.setState({sum});
  }

  render() {
    return(
      <div className="row">
        <div className="setup">
          <input type="text" 
            value={this.state.budget} 
            onChange={(event) => {this.setState({budget: event.target.value})}} 
          />
          <span>
            QBs<input 
              type="text" 
              value={this.state.qbs} 
              onChange={(event) => {this.setState({qbs: event.target.value})}} 
              onBlur={this.updateQBRows} 
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
            {this.qbRows}
            {this.wrRows}
            {this.rbRows}
            {this.teRows}
            <PlayerRow position="DST" percentage={.5} percentageChange={this.calculateSum} budget={this.state.budget} />
            <PlayerRow position="K" percentage={.5} percentageChange={this.calculateSum} budget={this.state.budget} />
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
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
