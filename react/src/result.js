import React, { Component } from 'react';
import ReactDom from 'react-dom';
import Popup from 'react-popup';

class Result extends React.Component {
  render() {
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <h1>{this.props.text}</h1>
        <button onClick={this.props.closePopup}>close me</button>
        </div>
      </div>
    );
  }
}

export default Result;
