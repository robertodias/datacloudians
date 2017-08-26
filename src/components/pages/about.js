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
            <h3 style={{padding:'20px'}}>DataCloudians (DC$) is a Merit Money Platform, where colleagues can reward co-workers with DC$s as a symbol of appreciation for their support, efforts, performance and good work.
            Members will receive  DC$100 monthly and will be able to transfer it to anybody in the system.</h3>
          </div>
        </Jumbotron>
      </div>
    );
  }
}

export default About;
