import React, { Component } from 'react';
import './App.css';
import Result from './result';
import NavBar from './NavBar';
import ResultBox from './resultBox';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      status: false,
      location: 'default',
      lat: 'default',
      lng: 'default'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.click = this.click.bind(this);
    this.onChange = (location) => this.setState({ location})
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    handleSubmit = (event) => {
      event.preventDefault()
      geocodeByAddress(this.state.location)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.setState({lat: latLng.lat, lng: latLng.lng}))
      .catch(error => console.error('Error', error))

    }
    click() {
      this.setState({status: !this.state.status});
    }
  render() {
    let resultbox = this.state.status ? <ResultBox searchVal={this.state.value}
      searchLat={this.state.lat} searchLng={this.state.lng}/> : null;
    const inputProps = {
      value: this.state.location,
      onChange: this.onChange,
    }
    const options = [
        'one', 'two', 'three'
      ]
      const defaultOption = options[0]
    return (
      <div className="App">
      <form className="form-body" onSubmit={this.handleSubmit}>
         <h2 className="Logo">
           Jam Search
         </h2>
        <label className="nav_lab">
            search location:
          <PlacesAutocomplete className="auto" inputProps={inputProps} />
        </label>
        <input type="submit" value="Submit" onClick={this.click} className="sub_button"/>
        <button className="postEvent">Post Event!</button>
      </form>
          <div className="spacer"></div>

          {resultbox}
    </div>
    );
  }
}

export default App;
