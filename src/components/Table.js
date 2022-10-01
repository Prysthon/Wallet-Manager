import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(({ description,
              tag, method, value, currency, exchangeRates, id }) => {
              console.log(+value);
              const valueFloat = Number(value);
              const exchangeName = exchangeRates[currency].name;
              const exchangeRate = Number(exchangeRates[currency].ask);
              const convertedValue = (value * exchangeRate);
              return (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ valueFloat.toFixed(2) }</td>
                  <td>{ exchangeName }</td>
                  <td>{ exchangeRate.toFixed(2) }</td>
                  <td>{ convertedValue.toFixed(2) }</td>
                  <td>Real</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default connect(mapStateToProps)(Table);
