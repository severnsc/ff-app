import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class PlayerRow extends Component {
  render() {
    return (
      <span>
        {this.props.position}
        <input type="text" />
        <input type="text" />
        <input type="text" readOnly />
        <input type="text" />
      </span>
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
    };
    this.updateBudget = this.updateBudget.bind(this);
    this.updateQBs = this.updateQBs.bind(this);
    this.updateRBs = this.updateRBs.bind(this);
    this.updateWRs = this.updateWRs.bind(this);
    this.updateTEs = this.updateTEs.bind(this);
  }

  updateBudget(event) {
    this.setState({budget: event.target.value})
  }

  updateQBs(event) {
    this.setState({qbs: event.target.value})
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
            QBs<input type="text" value={this.state.qbs} onChange={this.updateQBs} />
            RBs<input type="text" value={this.state.rbs} onChange={this.updateRBs} />
            WRs<input type="text" value={this.state.wrs} onChange={this.updateWRs} />
            TEs<input type="text" value={this.state.tes} onChange={this.updateTEs} />
          </span>
        </div>
        <div class="players">
          {this.props.children}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <PlayerRows>
        </PlayerRows>
      </div>
    );
  }
}

export default App;
