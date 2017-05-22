import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PlayerRow extends Component {
  render() {
    return (
      <div>
        {this.props.position}
        <input type="text" />
        <input type="text" />
        <input type="text" readOnly />
        <input type="text" />
      </div>
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
      qbRows: [<PlayerRow position="QB" key="1" />],
      rbRows: [
        <PlayerRow position="RB" key="1" />,
        <PlayerRow position="RB" key="2" />,
        <PlayerRow position="RB" key="3" />,
        <PlayerRow position="RB" key="4" />,
        <PlayerRow position="RB" key="5" />,
        <PlayerRow position="RB" key="6" />,
        <PlayerRow position="RB" key="7" />,
      ],
      wrRows: [
        <PlayerRow position="WR" key="1" />,
        <PlayerRow position="WR" key="2" />,
        <PlayerRow position="WR" key="3" />,
        <PlayerRow position="WR" key="4" />,
        <PlayerRow position="WR" key="5" />,
        <PlayerRow position="WR" key="6" />,
      ],
      teRows: [
        <PlayerRow position="TE" key="1" />,
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
          {this.state.qbRows}
          {this.state.wrRows}
          {this.state.rbRows}
          {this.state.teRows}
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
