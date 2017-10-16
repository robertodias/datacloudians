// IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';

// Update REACT PropTypes
import PropTypes from 'prop-types';

// OUR ACTIONS
import {setRedirectUrl} from '../../actions/loginActions';

class CheckIsLogged extends React.Component {
  componentDidMount() {
    const { currentUrl } = this.props;
    if (!this.props.user) {
      // set the current url/path for future redirection (we use a Redux action)
      // then redirect (we use a React Router method)
      this.props.setRedirectUrl(currentUrl);
      browserHistory.replace('/login');
    }
  }

  render() {
    if (this.props.user) {
      return this.props.children;
    }
    return null;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    currentUrl: ownProps.location.pathname,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setRedirectUrl,
  }, dispatch);
}

CheckIsLogged.propTypes = {
  currentUrl: PropTypes.any,
  setRedirectUrl: PropTypes.any,
  user: PropTypes.any,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckIsLogged);
