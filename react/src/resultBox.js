import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import Result from './result';

class ResultBox extends Component {
  constructor(props){
    super(props);
    this.state = {
      showPopup: false,
      posts: [],
      eventId: "default",
      eventDes: "default",
      eventTime: "default"
    };
    this.click = this.click.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    let eventId = "59f28ef15decd80ce870a167";
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
    click(id, des, time){
      this.setState({eventId: id,
                     eventDes: des,
                     eventTime: time});
      this.togglePopup();
    }
    buildRow() {
      return (
        this.state.posts.map(events =>
          <div key={events.key} className='result_box'
            onClick={ () => this.click(events._id, events.description, events.time)}
            id={events._id}
            >
          <p>{events.name}</p>
          {events._id}
          {events.place && events.place.location && <p>{events.place.location.city}</p>}
          </div>
        )
      )
    }
    popUp() {
      let result = this.state.posts.map(a => a._id)
      console.log(this.state.eventId)
      return (

          console.log(result),
            <div className='popup'>
              <div className='popup_inner'>
              <p>{this.state.eventId}</p>
              <p>{this.state.eventDes}</p>
              <button onClick={this.togglePopup.bind(this)}>close me</button>
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

export default ResultBox;
