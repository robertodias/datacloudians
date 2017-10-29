// PAGE FOOTER
import React from 'react';
import {Col} from 'react-bootstrap';

class Footer extends React.Component {
  render() {
    return (
      <Col sm={6} smOffset={3}>
        <footer className="footer text-center">
          <div className="container">
            <p className="footer-text">Copyright DataCloud Brazil 2017</p>
          </div>
        </footer>
      </Col>
    );
  }
}

export default Footer;
