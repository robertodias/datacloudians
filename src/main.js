// IMPORT REACT
import React from 'react';

// Update REACT PropTypes
import PropTypes from 'prop-types';

// IMPORT MENU AND Footer
import Menu from './components/menu';
import Footer from './components/footer';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Menu />
        <div style={{marginTop: '20px'}}>
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Main;
