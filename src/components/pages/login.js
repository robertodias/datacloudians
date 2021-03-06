// IMPORT REACT
import React from 'react';
import {browserHistory} from 'react-router';
import {Col, Well, Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import sha1 from 'sha1';

// IMPORT REDUX
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// OUR ACTIONS
import {postLogin, resetLoginButtonForm, checkAuth} from '../../actions/loginActions';

// Update REACT PropTypes
import PropTypes from 'prop-types';

class Login extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.checkAuth();
    }
  }

  componentDidUpdate() {
    if (this.props.user && this.props.redirectUrl) {
      browserHistory.replace(this.props.redirectUrl);
    }
  }

  render() {
    return (
      <Col sm={6} smOffset={3}>
        <Well>
          <Form horizontal>
            <FormGroup controlId="email" validationState={this.props.validation}>
              <Col componentClass={ControlLabel} sm={2}>
                Email
              </Col>
              <Col sm={8}>
                <FormControl ref="emailValue" type="email" placeholder="Email" />
              </Col>
            </FormGroup>

            <FormGroup controlId="password" validationState={this.props.validation}>
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={8}>
                <FormControl ref="passValue" type="password" placeholder="Password" />
              </Col>
            </FormGroup>
            <FormGroup>
              <Col smOffset={2} sm={8}>
                <Button
                  onClick={(!this.props.msg) ? (this.handleSubmit.bind(this)) : (this.resetForm.bind(this))}
                  bsStyle={(!this.props.style) ? ('primary') : (this.props.style)}>
                  {(!this.props.msg) ? ('Sign in') : (this.props.msg)}
                </Button>
              </Col>
            </FormGroup>
          </Form>
        </Well>
      </Col>
    );
  }

  handleSubmit() {
    const hash = sha1(findDOMNode(this.refs.passValue).value);
    const user = [{
      email: findDOMNode(this.refs.emailValue).value,
      password: hash,
    }];
    this.props.postLogin(user);
  }

  resetForm() {
    // RESET FORM AND BUTTON
    this.props.resetLoginButtonForm();
    findDOMNode(this.refs.emailValue).value = '';
    findDOMNode(this.refs.passValue).value = '';
  }
}

function mapStateToProps(state) {
  return {
    user: state.login.user,
    redirectUrl: state.login.redirectUrl,
    msg: state.login.msg,
    style: state.login.style,
    validation: state.login.validation,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postLogin,
    resetLoginButtonForm,
    checkAuth,
  }, dispatch);
}

Login.propTypes = {
  user: PropTypes.any,
  checkAuth: PropTypes.any,
  redirectUrl: PropTypes.any,
  validation: PropTypes.any,
  postLogin: PropTypes.any,
  msg: PropTypes.any,
  style: PropTypes.any,
  resetLoginButtonForm: PropTypes.any,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
