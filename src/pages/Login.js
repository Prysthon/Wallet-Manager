import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import saveEmail from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  isvalid = () => {
    const { email, password } = this.state;
    const MIN_PASSWORD = 6;
    const MIN_EMAIL = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (password.length >= MIN_PASSWORD && MIN_EMAIL.test(email)) {
      return this.setState({
        isDisabled: false,
      });
    }
    return this.setState({
      isDisabled: true,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.isvalid());
  };

  handleSubmit = () => {
    const { history, saveEmailDispatch } = this.props;
    const { email } = this.state;
    saveEmailDispatch(email);
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="email">
            E-mail:
            <input
              id="email"
              name="email"
              type="email"
              data-testid="email-input"
              pattern=".+@globex\.com"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              id="password"
              name="password"
              type="password"
              data-testid="password-input"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  saveEmailDispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  saveEmailDispatch: (state) => dispatch(saveEmail(state)),
});

export default connect(null, mapDispatchToProps)(Login);
