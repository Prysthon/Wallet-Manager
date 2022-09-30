export const ADD_EMAIL = 'SAVE_EMAIL';
export default function saveEmail(payload) {
  return {
    type: ADD_EMAIL,
    payload,
  };
}
