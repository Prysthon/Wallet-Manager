import React from 'react';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        Carteira
      </div>
    );
  }
}

export default connect()(Wallet);
