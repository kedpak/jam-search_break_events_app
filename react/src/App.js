import React, { Component } from 'react';
import './App.css';
import Result from './result';
import NavBar from './NavBar';
import ResultBox from './resultBox';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      status: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.click = this.click.bind(this);

  }

    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit(event) {
      alert('A name was submitted: ' + this.state.value);
      event.preventDefault();
    }
    click() {
      this.setState({status: !this.state.status});
    }
  render() {
    let resultbox = this.state.status ? <ResultBox searchVal={this.state.value} /> : null;
    return (
      <div className="App">
      <form className="form-body" onSubmit={this.handleSubmit}>
         <h2 className="Logo">
           Jam Search
         </h2>
        <label className="nav_lab">
           search location:
          <input type="text" value={this.state.value} onChange={this.handleChange} className="searchBox"/>
        </label>
          <input type="submit" value="Submit" onClick={this.click} className="sub_button"/>
      </form>
          <div className="spacer"></div>
          <p className="App-intro">
            Find a jam
          </p>
          {resultbox}
          </div>
    );
  }
}

export default App;
