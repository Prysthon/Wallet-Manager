import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies } from '../redux/actions';

class WalletForm extends Component {
  async componentDidMount() {
    const { saveCurrenciesDispatch } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    const Allcurrency = Object.keys(response);
    const currency = Allcurrency.filter((coin) => coin !== 'USDT');
    saveCurrenciesDispatch(currency);
  }

  render() {
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            valor:
            <input
              type="text"
              name="value-input"
              id="value-input"
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description-input"
              id="description-input"
              data-testid="description-input"
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
            >
              {currencies.map((coin) => <option key={ coin }>{ coin }</option>)}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
            >
              <option value="Dinheiro">Dinheiro</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="tag-input">
            Categoria:
            <select
              id="tag-input"
              data-testid="tag-input"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrenciesDispatch: (state) => dispatch(saveCurrencies(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  saveCurrenciesDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
