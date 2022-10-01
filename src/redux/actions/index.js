export const ADD_EMAIL = 'SAVE_EMAIL';
export default function saveEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}

export const SAVE_CURRENCIES = 'SAVE_CURRENCIES';
export function saveCurrencies(payload) {
  return {
    type: SAVE_CURRENCIES,
    payload,
  };
}

export const ADD_EXPENSES = 'SAVE_EXPENSES';
function saveExpenses(expenses) {
  return {
    type: ADD_EXPENSES,
    expenses,
  };
}

export function fetchExchangeRates(state) {
  return async (dispatch) => {
    const url = 'https://economia.awesomeapi.com.br/json/all';
    const request = await fetch(url);
    const response = await request.json();
    state.exchangeRates = response;
    dispatch(saveExpenses(state));
  };
}

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export function deleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    id,
  };
}
