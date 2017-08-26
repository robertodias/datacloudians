"use strict"

//IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

//OUR ACTIONS
import {setRedirectUrl} from '../../actions/loginActions';

class CheckIsLogged extends React.Component {

  componentDidMount() {
    const { dispatch, currentURL } = this.props
    if (!this.props.user) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.setRedirectUrl(currentURL);
      browserHistory.replace("/login");
    }
  }

  render() {
    if (this.props.user) {
      return this.props.children
    } else {
      return null
    }
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    currentURL: ownProps.location.pathname
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setRedirectUrl
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CheckIsLogged);
