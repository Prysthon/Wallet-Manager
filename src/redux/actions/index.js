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
