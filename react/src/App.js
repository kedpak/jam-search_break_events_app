import React, { Component } from 'react';
import './App.css';
import Result from './result';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showPopup: false
    };
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
  });

  }
  render() {
    return (
      <div className="App">
        <Header />
        <button onClick={this.togglePopup.bind(this)}>THIS</button>

        <p className="App-intro">
          The ultimate platform to find a B-boy jam near your area!
        </p>
        {this.state.showPopup ?
          <Result
            text='Close Me'
            closePopup={this.togglePopup.bind(this)}
          />
          : null
        }
      </div>
    );
  }
}

class Header extends React.Component {
   render() {
      return (
         <div className="Header-body">
            <h1 className="App-title">JAM SEARCH</h1>
         </div>
      );
   }
}

export default App;

