"use strict"

//IMPORT REACT
import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import {Modal, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';

//OUR ACTIONS
import {logout, closeLogoutModal, openLogoutModal} from '../../actions/loginActions';

class Logout extends React.Component {

  componentDidMount() {
    this.props.openLogoutModal();
    if (!this.props.user) {
      browserHistory.replace("/login");
    }
  }

  componentDidUpdate() {
    if (!this.props.user) {
      browserHistory.replace("/login");
    }
  }

  confirm() {
    browserHistory.replace("/");
    this.props.logout();
  }

  cancel() {
    this.props.closeLogoutModal();
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
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    showLogoutModal: state.login.showLogoutModal
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    logout,
    closeLogoutModal,
    openLogoutModal
  }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Logout);
