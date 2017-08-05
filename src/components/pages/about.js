"use strict"

//IMPORT REACT
import React from 'react';
import {Jumbotron} from 'react-bootstrap';

class About extends React.Component{
  render() {
    return (
      <div>
        <Jumbotron>
          <div style={{padding:'20px'}}>
            <h1>About</h1>
            <p>DataCloudians DC$</p>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
