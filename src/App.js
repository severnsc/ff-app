import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PlayerRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      percentage: this.props.percentage,
    };
  }

  render() {
    return (
      <tr>
        <td>{this.props.position}</td>
        <td><input type="text" /></td>
        <td><input type="text" /></td>
        <td><input type="text" readOnly /></td>
        <td><input type="text" value={this.state.percentage} /></td>
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
      qbRows: [<PlayerRow position="QB" key="1" percentage={.5} />],
      rbRows: [
        <PlayerRow position="RB" key="1" percentage={5} />,
        <PlayerRow position="RB" key="2" percentage={5} />,
        <PlayerRow position="RB" key="3" percentage={2.5} />,
        <PlayerRow position="RB" key="4" percentage={2.5} />,
        <PlayerRow position="RB" key="5" percentage={1.25} />,
        <PlayerRow position="RB" key="6" percentage={1.25} />,
        <PlayerRow position="RB" key="7" percentage={.5} />,
      ],
      wrRows: [
        <PlayerRow position="WR" key="1" percentage={25} />,
        <PlayerRow position="WR" key="2" percentage={25} />,
        <PlayerRow position="WR" key="3" percentage={10} />,
        <PlayerRow position="WR" key="4" percentage={10} />,
        <PlayerRow position="WR" key="5" percentage={5} />,
        <PlayerRow position="WR" key="6" percentage={5} />,
      ],
      teRows: [
        <PlayerRow position="TE" key="1" percentage={.5} />,
      ],
    };
    this.updateQBRows = this.updateQBRows.bind(this);
    this.updateRBRows = this.updateRBRows.bind(this);
    this.updateWRRows = this.updateWRRows.bind(this);
    this.updateTERows = this.updateTERows.bind(this);
  }

  updateQBRows(event) {
    let qbRows = [];
    let qbKeys = [...Array(parseInt(event.target.value)).keys()];
    qbRows = qbKeys.map((x) => {return <PlayerRow position="QB" key={x} /> });
    this.setState({qbRows});
  }

  updateRBRows(event) {
    let rbRows = [];
    let rbKeys = [...Array(parseInt(event.target.value)).keys()];
    rbRows = rbKeys.map((x) => {return <PlayerRow position="RB" key={x} /> });
    this.setState({rbRows});
  }

  updateWRRows(event) {
    let wrRows = [];
    let wrKeys = [...Array(parseInt(event.target.value)).keys()];
    wrRows = wrKeys.map((x) => {return <PlayerRow position="WR" key={x} /> });
    this.setState({wrRows}); 
  }

  updateTERows(event) {
    let teRows = [];
    let teKeys = [...Array(parseInt(event.target.value)).keys()];
    teRows = teKeys.map((x) => {return <PlayerRow position="TE" key={x} /> });
    this.setState({teRows});
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
            <tr>
              <td>Position</td>
              <td>Player Name</td>
              <td>Amount Spent</td>
              <td>Maximum allowable amount</td>
              <td>Maximum percentage of budget</td>
            </tr>
            {this.state.qbRows}
            {this.state.wrRows}
            {this.state.rbRows}
            {this.state.teRows}
            <PlayerRow position="DST" percentage={.5} />
            <PlayerRow position="K" percentage={.5} />
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
