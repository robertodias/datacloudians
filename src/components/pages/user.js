// IMPORT REACT
import React from 'react';
import {Row, Col, Well} from 'react-bootstrap';

// Update REACT PropTypes
import PropTypes from 'prop-types';

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
    );
  }
}

User.propTypes = {
  name: PropTypes.any,
  balance: PropTypes.any,
};

export default User;
