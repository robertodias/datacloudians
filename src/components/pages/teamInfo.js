// REACT
import React from 'react';

// REDUX
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getUser} from '../../actions/userActions';

// BOOTSTRAP
import {Grid, Col, Row} from 'react-bootstrap';

// OWN COMPONENTS
import User from './user';

// Update REACT PropTypes
import PropTypes from 'prop-types';

class TeamInfo extends React.Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    const userList = this.props.user.map(function teamInfo(userArr) {
      return (
        <Col xs={12} sm={6} md={4} key={userArr._id}>
          <User
            _id={userArr._id}
            name={userArr.name}
            balance={userArr.balance}
          />
        </Col>
      );
    });

    return (
      <Grid>
        <Row style={{marginTop: '15px'}}>
          {userList}
        </Row>
      </Grid>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser: getUser,
  }, dispatch);
}

TeamInfo.propTypes = {
  user: PropTypes.any,
  getUser: PropTypes.any,
  redirectUrl: PropTypes.any,
  validation: PropTypes.any,
  postLogin: PropTypes.any,
  msg: PropTypes.any,
  style: PropTypes.any,
  resetLoginButtonForm: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(TeamInfo);
