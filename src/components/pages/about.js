"use strict"

//IMPORT REACT
import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';

class About extends React.Component{
  render() {
    return (
      <Grid>
        <Row style={{marginTop:'15px'}}>
          <div>
            <h2>DataCloudians (DC$)</h2>
            <br/>
            <p> Merit Money Platform, where colleagues can reward co-workers with DC$s as a symbol of appreciation for their support, efforts, performance and good work.
            Each member receives <b>DC$ 100</b>, monthly, and will be able to transfer it to anybody in the system.</p>
          </div>
        </Row>
      </Grid>
    );
  }
}

export default About;
