import React, { PureComponent, useState } from 'react';

import API from '../muuvy-api';

import styles from './Login.module.scss';
import muuvyLogo from './../img/logo.png';
import history from '../history';
import { User } from '../dto/DTO';

interface LoginState {
  username?: string,
  error?: string,
  user?: User,
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

  async handleSubmit(evt: any) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }
    else {
      try {
        const res = await API.post('login', {
          fullName: this.state.username
        });
        debugger;
        this.setState({ user: res.data });
        history.push('/home');
        this.setState({ error: '' });
      }
      catch (error) {
        console.log(error);
        history.push('/error')
      }
    }
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
