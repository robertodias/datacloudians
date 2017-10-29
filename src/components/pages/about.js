// IMPORT REACT
import React from 'react';
import {Well, Col} from 'react-bootstrap';

class About extends React.Component {
  render() {
    return (
      <Col sm={6} smOffset={3}>
        <Well>
          <h2><b>DataCloudians (DC$)</b></h2>
          <p>A Merit Money Platform, where colleagues can reward co-workers with DC$s as a symbol of appreciation for their support, efforts, performance and good work.</p>
          <p>Each member receives <b>DC$ 100</b>, monthly, and will be able to transfer it to anybody in the system.</p>
        </Well>
      </Col>
    );
  }
}

export default About;
