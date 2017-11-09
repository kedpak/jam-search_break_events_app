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
    click(id, des, time, lat, long, place){
      this.setState({eventId: id,
                     eventDes: des,
                     eventTime: time,
                     latitude: lat,
                     longitude: long,
                     eventPlace: place});
      this.togglePopup();
    }
    degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
    }
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


      buildRow() {
        let hey = this.distanceInKmBetweenEarthCoordinates(this.props.searchLat, this.props.searchLng,
        45.50561  , -73.56712)

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
                events.place.location.longitude, events.place.location.street)}
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
    popUp() {
      return (
            <div className='popup'>
               <div className='popup_inner'>
               <button onClick={this.togglePopup.bind(this)} className="closeButton">X</button>
                  <p className="eventName">{this.state.eventId}</p>
                  <h2 className="when">When:</h2>
                  <p className="eventTime">{this.state.eventTime.slice(0, 10)}</p>
                  <h2 className="address">Address:</h2>
                  <p className="eventPlace">{this.state.eventPlace}</p>
                  <h2 className="info">Info:</h2>
                  <p className="eventDesc">{this.state.eventDes}</p>
                  <div className="inner_map">
                  <Map google={this.props.google} zoom={14}
                  initialCenter={{
                    lat: this.state.latitude,
                    lng: this.state.longitude
                  }}
                  style={{width:'600px', height:'600px', position:'relative'}}>
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
