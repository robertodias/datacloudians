"use strict"

//IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

//OUR ACTIONS
import {logout} from '../../actions/loginActions';

class Logout extends React.Component {

  componentDidMount() {
    this.props.logout();

    if (!this.props.user) {
      browserHistory.replace("/login");
    }
  }

  componentDidUpdate() {
    if (!this.props.user) {
      browserHistory.replace("/login");
    }
  }
  render() {
    return null
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Logout);
