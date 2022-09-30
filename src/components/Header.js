import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    expenses: 0,
    cambio: 'BRL',
  };

  render() {
    const { expenses, cambio } = this.state;
    const { email } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <p data-testid="total-field">{ expenses }</p>
        <p data-testid="header-currency-field">{ cambio }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
