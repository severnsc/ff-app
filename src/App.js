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
      qbRows: [<PlayerRow position="QB" />],
      rbRows: [
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />,
        <PlayerRow position="RB" />
      ],
      wrRows: [
        <PlayerRow position="WR" />,
        <PlayerRow position="WR" />,
        <PlayerRow position="WR" />,
        <PlayerRow position="WR" />,
        <PlayerRow position="WR" />,
        <PlayerRow position="WR" />
      ],
      teRows: [<PlayerRow position="TE" />],
    };
    this.updateBudget = this.updateBudget.bind(this);
    this.updateRBs = this.updateRBs.bind(this);
    this.updateWRs = this.updateWRs.bind(this);
    this.updateTEs = this.updateTEs.bind(this);
  }

  updateBudget(event) {
    this.setState({budget: event.target.value})
  }

  updateQBs(event) {
    this.setState(() => {qbs: event.target.value});
    this.updateQBRows();
  }

  updateQBRows() {
    var qbRows = this.state.qbRows;
    if(qbRows.length !== this.state.qbs){
      for(var i=this.state.qbRows.length;i<this.state.qbs;i++){
        qbRows.push(<PlayerRow position="QB" />);
      };
      this.setState(() => {qbRows: qbRows});
    }
  }

  updateRBs(event) {
   this.setState({rbs: event.target.value}) 
  }

  updateWRs(event) {
   this.setState({wrs: event.target.value}) 
  }

  updateTEs(event) {
   this.setState({tes: event.target.value}) 
  }

  render() {
    return(
      <div class="row">
        <div class="setup">
          <input type="text" value={this.state.budget} onChange={this.updateBudget} />
          <span>
            QBs<input type="text" value={this.state.qbs} onChange={this.updateQBs.bind(this)} />
            RBs<input type="text" value={this.state.rbs} onChange={this.updateRBs} />
            WRs<input type="text" value={this.state.wrs} onChange={this.updateWRs} />
            TEs<input type="text" value={this.state.tes} onChange={this.updateTEs} />
          </span>
        </div>
        <div class="players">
          {this.state.qbRows}
          {this.state.rbRows}
          {this.state.wrRows}
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
