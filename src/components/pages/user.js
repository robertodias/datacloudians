"use strict"

//IMPORT REACT
import React from 'react';
import {Row, Col, Well} from 'react-bootstrap';
import {connect} from 'react-redux';

//IMPORT REDUX
import {bindActionCreators} from 'redux';

class User extends React.Component {

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={12}>
            <h4>{(this.props.name)}</h4>
            <h5>Current Balance: <b>DC$ {this.props.balance}</b></h5>
          </Col>
        </Row>
      </Well>
    )
  }

}

export default User;
