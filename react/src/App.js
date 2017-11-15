import React, { Component } from 'react';
import './App.css';
import ResultBox from './resultBox';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Form, Text } from 'react-form';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: '',
      status: false,
      location: 'default',
      location2: 'default',
      lat: 'default',
      lng: 'default',
      postForm: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.click = this.click.bind(this);
    this.onChange = (location) => this.setState({ location});
    this.onChange2 = (location2) => this.setState({ location2});
    this.postClick = this.postClick.bind(this);
    }
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    // handles submit of gps cord returned by auto fill
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
    //handles click for post events
    postClick() {
      this.setState({postForm: !this.state.postForm})
    }
    // pop up form
    popUpForm() {
      const inputProps2 = {
        value: this.state.location2,
        onChange: this.onChange2,
      }
      return (
      <div className='popup'>
         <div className='popup_form'>
         <Form>
         { formApi => (
           <div className="fill_form">
              <form onSubmit={formApi.submitForm} id="form1">
                  <label htmlFor="name">Name of Event: </label>
                  <Text field="name" id="name" />
              </form>
              <form onSubmit={formApi.submitForm} id="form2">
                  <label htmlFor="location">Event Location: </label>
                  <PlacesAutocomplete className="autoForm" inputProps={inputProps2} />
              </form>
              <form onSubmit={formApi.submitForm} id="form3">
                  <label htmlFor="description">Event Description: </label>
                  <Text field="description" id="description" />
              </form>
              <form onSubmit={formApi.submitForm} id="form4">
                  <label htmlFor="address">Event Address: </label>
                  <Text field="address" id="address" />
              </form>
              <form onSubmit={formApi.submitForm} id="form5">
                  <label htmlFor="date">Event date: </label>
                  <Text field="date" id="date" />
              </form>
              <button type="submit">Submit</button>
           </div>

         )}
            </Form>
            </div>
      </div>
    )
    }
  render() {
    let resultbox = this.state.status ? <ResultBox searchVal={this.state.value}
      searchLat={this.state.lat} searchLng={this.state.lng}/> : null;
    const inputProps = {
      value: this.state.location,
      onChange: this.onChange,
    }

    return (
      <div className="App">
         <form className="form-body" onSubmit={this.handleSubmit}>
         <h2 className="Logo">
           Jam Search
         </h2>
         <label className="nav_lab">
            search location:
            <PlacesAutocomplete className="autos" inputProps={inputProps} />
        </label>
        <input type="submit" value="Submit" onClick={this.click} className="sub_button"/>
            <button className="postEvent" onClick={this.postClick}>Post Event!</button>
        </form>
          <div className="spacer"></div>
          {resultbox}
          {
            this.state.postForm ?
            this.popUpForm()
            : null
          }
    </div>
    );
  }
}

export default App;
