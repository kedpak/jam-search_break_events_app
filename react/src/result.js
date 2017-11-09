import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';
import axios from 'axios';

class Result extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      posts: []
    };
    let eventId = "59f28ef15decd80ce870a167";
  }
  componentDidMount() {
    axios.get('http://localhost:3001/api/events')
       .then(res => {
         let posts = res.data.map(obj => obj);
         this.setState({posts});
       });
     }
  render() {
    return (

         this.state.posts.map(events =>
           <div className='popup'>
             <div className='popup_inner'>
           
      <button onClick={this.props.closePopup}>close me</button>
      </div>
    </div>
    )

    );
  }
}

export default Result;
