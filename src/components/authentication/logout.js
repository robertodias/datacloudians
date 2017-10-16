// IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Modal, Button} from 'react-bootstrap';

// Update REACT PropTypes
import PropTypes from 'prop-types';

// OUR ACTIONS
import {logout, closeLogoutModal, openLogoutModal} from '../../actions/loginActions';

class Logout extends React.Component {
  componentDidMount() {
    this.props.openLogoutModal();
    if (!this.props.user) {
      browserHistory.replace('/login');
    }
  }

  componentDidUpdate() {
    if (!this.props.user) {
      browserHistory.replace('/login');
    }
  }

  render() {
    return (
      <Modal show={this.props.showLogoutModal}>
        <Modal.Header>
          <Modal.Title>Logout Warning</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to leave the DC$ application?
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={(this.cancel.bind(this))}>Cancel</Button>
          <Button onClick={(this.confirm.bind(this))}bsStyle="primary">Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  confirm() {
    browserHistory.replace('/');
    this.props.logout();
  }

  cancel() {
    this.props.closeLogoutModal();
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    showLogoutModal: state.login.showLogoutModal,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    closeLogoutModal,
    openLogoutModal,
  }, dispatch);
}

Logout.propTypes = {
  openLogoutModal: PropTypes.any,
  closeLogoutModal: PropTypes.any,
  showLogoutModal: PropTypes.any,
  setRedirectUrl: PropTypes.any,
  logout: PropTypes.any,
  user: PropTypes.any,
  children: PropTypes.node.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
