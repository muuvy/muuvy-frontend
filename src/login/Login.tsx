import React, { PureComponent } from 'react';
import axios from 'axios';
import styles from './Login.module.scss';
import muuvyLogo from './../img/logo.png';
import history from '../history';

interface LoginState {
  username?: string,
  error?: string
}

export default class Login extends PureComponent<{}, LoginState> {
  constructor(props: any, state: LoginState) {
    super(props, state);
    this.state = {
      username: '',
      error: '',
    };

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt: any) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }
    else {
      // POST to API-Service
      axios.post('http://localhost:8080/muuvy-backend-1.0.0/api/user/login/', {
        fullName: this.state.username
      })
        .then(function (response) {
          history.push('/home');
        })
        .catch(function (error) {
          console.log(error);
          history.push('/error')
        });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt: any) {
    this.setState({
      username: evt.target.value,
    });
  };

  render() {

    return (
      <div className={styles.AppWrapper}>
        <div className={styles.AppLogin}>
          <div className={styles.LogoArea}>
            <div className={styles.LogoCenter}>
              <img title="muuvy logo" className={styles.HeaderLogo} src={muuvyLogo} alt="" />
              <h1 className={styles.HeaderTitle}>muuvy</h1>
            </div>
          </div>

          <div className={styles.LoginForm}>
            <form onSubmit={this.handleSubmit}>
              <h2 className={styles.signInLabel}>Sign in to muuvy</h2>
              <label>Username</label>
              <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange} />
              <input id="submit" type="submit" value="Login" data-test="submit" />
              {
                this.state.error &&
                <p className={styles.LoginError} data-test="error" onClick={this.dismissError}>
                  <button onClick={this.dismissError}>✖</button>
                  <span>{this.state.error}</span>
                </p>
              }
            </form>
          </div>
        </div>
      </div>
    );
  }
}
