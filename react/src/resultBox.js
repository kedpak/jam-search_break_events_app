import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Result from './result';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

class ResultBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
      posts: [],
      eventId: "default",
      eventDes: "default",
      eventTime: "default",
      latitude: "default",
      longitude: "default"
    };
    this.click = this.click.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
  });
  }
   componentDidMount() {
    axios.get('http://localhost:3001/api/events')
      .then(res => {
        let posts = res.data.map(obj => obj);
        this.setState({posts});
      });
    }
    click(id, des, time, lat, long){
      this.setState({eventId: id,
                     eventDes: des,
                     eventTime: time,
                     latitude: lat,
                     longitude: long});
      this.togglePopup();
    }
      buildRow() {
        return this.state.posts
        .filter(events =>
            events.place
            && events.place.location
            && events.place.location.city === this.props.searchVal)
        .map(events =>
            <div key={events.key} className='result_box'
                onClick={() => this.click(events.name, events.description,
                events.time, events.place.location.latitude, events.place.location.longitude)}
                id={events._id}

                >
                <p>{events.name}</p>
                {events._id}
                <p>{events.place.location.city}</p>
                <div className="the_map" style={{overflow:'hidden'}}>
                <Map google={this.props.google} zoom={14}
                initialCenter={{
                  lat: events.place.location.latitude,
                  lng: events.place.location.longitude
                }}
                style={{width:'200px', height:'200px', position:'relative'}}>
                  <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />
                  <InfoWindow onClose={this.onInfoWindowClose}>
                    <div>

                    </div>
                  </InfoWindow>
                </Map>
                </div>
            </div>);
    }
    popUp() {
      return (
            <div className='popup'>
               <div className='popup_inner'>
                  <p>{this.state.eventId}</p>
                  <p className="eventDesc">{this.state.eventDes}</p>
                  <button onClick={this.togglePopup.bind(this)}>close me</button>
                  <Map google={this.props.google} zoom={14}
                  initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                  }}
                  style={{width:'600px', height:'600px', position:'relative'}}>
                    <Marker onClick={this.onMarkerClick}
                          name={'Current location'} />
                    <InfoWindow onClose={this.onInfoWindowClose}>
                      <div>

                      </div>
                    </InfoWindow>
                  </Map>

               </div>
            </div>
      )
    }
  render() {
    let rows = this.buildRow();
    return (
      <div>
        {rows}
        {
         this.state.showPopup ?
           this.popUp()
           : null
        }
      </div>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: 'AIzaSyDhc1bxQCcF6ecfAwC1Pj-Fv4OW9IZ3xbI'
})(ResultBox)
