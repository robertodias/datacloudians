"use strict"

//IMPORT REACT
import React from 'react';
import {Col, Well, Form, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

//IMPORT AXIOS
import axios from 'axios';

//IMPORT REDUX
import {bindActionCreators} from 'redux';

//OUR ACTIONS
import {postLogin, resetSaveButtonForm} from '../../actions/loginActions';


class Login extends React.Component {

  handleSubmit() {
    const user=[{
      //_id: will come  from MongoDB
      email: findDOMNode(this.refs.email).value,
      password: findDOMNode(this.refs.password).value

    }]
    this.props.postLogin(user);
  }

  resetForm() {
    // RESET FORM AND BUTTON
    this.props.resetSaveButtonForm();
    findDOMNode(this.refs.email).value = '';
    findDOMNode(this.refs.password).value = '';
  }

  render() {
    return (
      <Col sm={12}>
        <Col sm={6} smOffset={3}>
          <Well>
            <Form horizontal>
              <FormGroup controlId="email" validationState={this.props.validation}>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={8}>
                  <FormControl ref="email" placeholder="Email" />
                </Col>
              </FormGroup>

              <FormGroup controlId="password" validationState={this.props.validation}>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={8}>
                  <FormControl ref="password" placeholder="Password" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={8}>
                  <Button
                    onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                    bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                    {(!this.props.msg)?("Sign in"):(this.props.msg)}
                  </Button>
                </Col>
              </FormGroup>
            </Form>
          </Well>
        </Col>
      </Col>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    msg: state.user.msg,
    style: state.user.style,
    validation: state.user.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postLogin,
    resetSaveButtonForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
