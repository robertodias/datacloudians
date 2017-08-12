"use strict"

//IMPORT REACT
import React from 'react';

//IMPORT MENU AND Footer
import Menu from './components/menu';
import Footer from './components/footer';

//IMPORT REACT-REDUX
import  {connect} from 'react-redux';

//IMPORT REDUX
import {bindActionCreators} from 'redux';

class Main extends React.Component {

  render() {
    return(
      <div>
        <Menu />
          <div style={{marginTop:'20px'}}>
            {this.props.children}
          </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
