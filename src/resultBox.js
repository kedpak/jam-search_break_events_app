import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

/* This component creates boxes for each search result */
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
      longitude: "default",
      eventPlace: "default"
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
  click(id, des, time, lat, long, place, state, country){
      this.setState({eventId: id,
                     eventDes: des,
                     eventTime: time,
                     latitude: lat,
                     longitude: long,
                     eventPlace: place,
                     eventState: state,
                     eventCountry: country
                      });
      this.togglePopup();
    }
  degreesToRadians(degrees) {
      return degrees * Math.PI / 180;
    }

    // finds difference betweent two gps coordinates to determine if search is 50 mil of location
  distanceInKmBetweenEarthCoordinates(lat1, lon1, lat2, lon2) {
        let earthRadiusKm = 6371;
        let dLat = this.degreesToRadians(lat2-lat1);
        let dLon = this.degreesToRadians(lon2-lon1);
        lat1 = this.degreesToRadians(lat1);
        lat2 = this.degreesToRadians(lat2);

        let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
              return earthRadiusKm * c;
      }

  /* iterate through db and display data which match parameters */
  buildRow() {
        return this.state.posts
        .filter(events =>
            events.place
            && events.place.location
            && Math.abs(this.distanceInKmBetweenEarthCoordinates(this.props.searchLat, this.props.searchLng,
              events.place.location.latitude, events.place.location.longitude)) < Math.abs(80.4672) )
        .map(events =>
            <div key={events.key} className='result_box'
                onClick={() => this.click(events.name, events.description,
                events.start_time, events.place.location.latitude,
                events.place.location.longitude, events.place.location.street,
                events.place.location.state, events.place.location.country)}
                id={events._id}
                >
                <p>{events.name}</p>
                {events.start_time.slice(0, 10)}

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
                    </InfoWindow>
                </Map>
                </div>
            </div>);
    }

    /* Data displayed within popup after onClick of specific component */
  popUp() {
      return (
            <div className='popup' onClick={this.togglePopup.bind(this)}>
               <div className='popup_inner'>
                  <p className="eventName">{this.state.eventId}</p>
                  <h2 className="when">When:</h2>
                  <p className="eventTime">{this.state.eventTime.slice(0, 10)}</p>
                  <h2 className="address">Address:</h2>
                  <p className="eventPlace">{this.state.eventPlace}</p>
                  <p className="eventState">{this.state.eventState}</p>
                  <p className="eventState">{this.state.eventCountry}</p>
                  <h2 className="info">Info:</h2>
                  <p className="eventDesc">{this.state.eventDes}</p>
                  <div className="inner_map">
                  <Map google={this.props.google} zoom={14}
                  initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                  }}
                  style={{width:'300px', height:'300px', position:'center'}}>
                    <Marker onClick={this.onMarkerClick}
                          name={'Current location'} />
                    <InfoWindow onClose={this.onInfoWindowClose}>
                    </InfoWindow>
                  </Map>

                  </div>
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
