import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  state = {
    expenses: 0,
    cambio: 'BRL',
  };

  totalExpenses = () => {
    const { values } = this.props;
    const totalList = values
      .map(({ currency, exchangeRates, value }) => exchangeRates[currency].ask * value);
    let sum = 0;
    totalList.forEach((number) => { sum += number; });
    return (sum.toFixed(2));
  };

  render() {
    const { expenses, cambio } = this.state;
    const { email, values } = this.props;
    return (
      <div>
        <h2 data-testid="email-field">{ email }</h2>
        <p data-testid="total-field">
          { values.length === 0 ? expenses : this.totalExpenses() }
        </p>
        <p data-testid="header-currency-field">{ cambio }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  values: state.wallet.expenses,
});

Header.propTypes = {
  email: PropTypes.string.isRequired,
  // values: PropTypes.shape([{}]).isRequired,
  values: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Header);
