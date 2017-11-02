import React, { Component } from 'react';
import './App.css';
import Result from './result';
import NavBar from './NavBar';
import ResultBox from './resultBox';

class App extends Component {

  render() {
    return (
      <div className="App">
          <NavBar className="navbar-body"/>
          <div className="spacer"></div>
          <p className="App-intro">
            Find a jam
          </p>
      <ResultBox />
      </div>
    );
  }
}


export default App;
