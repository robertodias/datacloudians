"use strict"

//IMPORT REACT
import React from 'react';
import {Col, Row, Well, Panel, FormControl, FormGroup, ControlLabel, Button} from 'react-bootstrap';
import {findDOMNode} from 'react-dom';
import {connect} from 'react-redux';

//IMPORT AXIOS
import axios from 'axios';

//IMPORT REDUX
import {bindActionCreators} from 'redux';

//OUR ACTIONS
import {postUser, deleteUser, getUser, resetSaveButtonForm} from '../../actions/userActions';
import sha1 from 'sha1';

class UserAdmin extends React.Component{

  componentDidMount() {
    this.props.getUser();
  }

  handleSubmit() {
    const hash = sha1(findDOMNode(this.refs.password).value);
    const user=[{
      //_id: will come  from MongoDB
      name: findDOMNode(this.refs.name).value,
      balance: findDOMNode(this.refs.balance).value,
      email: findDOMNode(this.refs.email).value,
      password: hash
    }]
    this.props.postUser(user);
  }

  onDelete() {
    let userId = findDOMNode(this.refs.delete).value;
    if(userId !== "select") {
      this.props.deleteUser(userId);
    }
  }

  resetForm() {
    // RESET FORM AND BUTTON
    this.props.resetSaveButtonForm();
    findDOMNode(this.refs.name).value = '';
    findDOMNode(this.refs.balance).value = '';
    findDOMNode(this.refs.email).value = '';
    findDOMNode(this.refs.password).value = '';
  }

  render() {
    const userList = this.props.user.map(function(userArr) {
      return (
        <option key={userArr._id} value={userArr._id}>{userArr.name}</option>
      )
    })

    return (
      <Well>
        <Row>
          <Col xs={12} sm={12}>
            <Panel style={{marginTop:'10px'}}>
              <FormGroup controlId="name" validationState={this.props.validation}>
                <ControlLabel>Name</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter a Name..."
                  ref="name"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="balance" validationState={this.props.validation}>
                <ControlLabel>Balance DC$</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter a Balance..."
                  ref="balance"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="email" validationState={this.props.validation}>
                <ControlLabel>Email</ControlLabel>
                <FormControl
                  type="email"
                  placeholder="Enter your email..."
                  ref="email"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="password" validationState={this.props.validation}>
                <ControlLabel>Password</ControlLabel>
                <FormControl
                  type="password"
                  placeholder="Enter a Password..."
                  ref="password"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <Button
                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                {(!this.props.msg)?("Create User"):(this.props.msg)}
              </Button>
            </Panel>
            <Panel style={{marginTop:'10px'}}>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select an User to delete</ControlLabel>
                <FormControl ref="delete" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {userList}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete.bind(this)} bsStyle="danger">
                Delete User
              </Button>
            </Panel>
          </Col>
        </Row>
      </Well>
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
    postUser,
    deleteUser,
    getUser,
    resetSaveButtonForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserAdmin);
