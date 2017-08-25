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
import {getUser} from '../../actions/userActions';
import {postTransaction, getTransaction, resetSaveButtonForm} from '../../actions/transactionActions';

class Transaction extends React.Component{

  componentWillMount () {
    const history = this.props.history;
    console.log(this.props);
    if (false) {
      history.push('/'); // redirects the user to '/'
    }
  }

  componentDidMount() {
    this.props.getUser();
  }

  handleSubmit() {
    const transaction=[{
      //_id: will come  from MongoDB
      from: findDOMNode(this.refs.from).value,
      to: findDOMNode(this.refs.to).value,
      description: findDOMNode(this.refs.description).value,
      amount: findDOMNode(this.refs.amount).value
    }]
    this.props.postTransaction(transaction);
  }

  resetForm() {
    // RESET FORM AND BUTTON
    this.props.resetSaveButtonForm();
    findDOMNode(this.refs.to).selected = false;
    findDOMNode(this.refs.from).selected = false;
    findDOMNode(this.refs.description).value = '';
    findDOMNode(this.refs.amount).value = '';
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
          <Col>
            <Panel style={{marginTop:'10px'}}>
              <FormGroup controlId="formControlsSelectFrom">
                <ControlLabel>Select your User</ControlLabel>
                <FormControl ref="from" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {userList}
                </FormControl>
              </FormGroup>
              <FormGroup controlId="formControlsSelectTo">
                <ControlLabel>Select the user that will receive DC$</ControlLabel>
                <FormControl ref="to" componentClass="select" placeholder="select">
                  <option value="select">select</option>
                  {userList}
                </FormControl>
              </FormGroup>
              <FormGroup controlId="description" validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter a Description..."
                  ref="description"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId="amount" validationState={this.props.validation}>
                <ControlLabel>Amount DC$</ControlLabel>
                <FormControl
                  type="text"
                  placeholder="Enter an Amount..."
                  ref="amount"
                />
                <FormControl.Feedback/>
              </FormGroup>
              <Button
                onClick={(!this.props.msg)?(this.handleSubmit.bind(this)):(this.resetForm.bind(this))}
                bsStyle={(!this.props.style)?("primary"):(this.props.style)}>
                {(!this.props.msg)?("Confirm"):(this.props.msg)}
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
    transaction: state.transaction.transaction,
    msg: state.transaction.msg,
    style: state.transaction.style,
    validation: state.transaction.validation
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    postTransaction,
    getTransaction,
    getUser,
    resetSaveButtonForm
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
