import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { saveCurrencies, fetchExchangeRates } from '../redux/actions';

class WalletForm extends Component {
  state = {
    id: 0,
    value: 0,
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    exchangeRates: {},
  };

  async componentDidMount() {
    const { saveCurrenciesDispatch } = this.props;
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    const Allcurrency = Object.keys(response);
    const currency = Allcurrency.filter((coin) => coin !== 'USDT');
    saveCurrenciesDispatch(currency);
  }

  clearState = () => {
    this.setState({
      value: '',
      description: '',
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

  onClick = () => {
    const { saveExpensesDispatch } = this.props;
    saveExpensesDispatch(this.state);
    this.setState((state) => ({ id: state.id + 1 }), () => this.clearState());
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="value-input">
            valor:
            <input
              type="number"
              name="value"
              id="value-input"
              value={ value }
              data-testid="value-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="description-input">
            Descrição:
            <input
              type="text"
              name="description"
              id="description-input"
              value={ description }
              data-testid="description-input"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="currency-input">
            Moeda:
            <select
              id="currency-input"
              data-testid="currency-input"
              name="currency"
              onChange={ this.handleChange }
            >
              {currencies
                .map((coin) => <option key={ coin } value={ coin }>{ coin }</option>)}
            </select>
          </label>
          <label htmlFor="method-input">
            Método de pagamento:
            <select
              id="method-input"
              data-testid="method-input"
              name="method"
              onChange={ this.handleChange }
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
              name="tag"
              onChange={ this.handleChange }
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
          <button type="button" onClick={ this.onClick }>Adicionar despesa</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  saveCurrenciesDispatch: (currency) => dispatch(saveCurrencies(currency)),
  saveExpensesDispatch: (state) => dispatch(fetchExchangeRates(state)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

WalletForm.propTypes = {
  saveCurrenciesDispatch: PropTypes.func.isRequired,
  saveExpensesDispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);
