import React, { Component } from 'react';
import axios from 'axios';
import './Login.css';
import muuvyLogo from './img/logo.png';
import history from '../history';

class LoginPage extends Component {
  constructor() {
    super();
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

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }
    else {
    // POST to API-Service
    axios.post('http://localhost:8080/api/user/login/', {
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

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  render() {

    return (
    <div className="App-Wrapper">
        <div className="App-Login">
            <div class="LogoArea">
              <div class="LogoCenter">
              <img title="muuvy logo" class="Header__Logo" src={muuvyLogo} alt="" />
              <h1 class="Header__Title">muuvy</h1>
              </div>
            </div>

          <div class="LoginForm">
          <form onSubmit={this.handleSubmit}>
              <h2 class="signInLabel">Sign in to muuvy</h2>
              <label>Username</label>
              <input type="text" data-test="username" value={this.state.username} onChange={this.handleUserChange}/> 
              <input id="submit" type="submit" value="Login" data-test="submit" />  
              {
                this.state.error &&
                <p class="LoginError" data-test="error" onClick={this.dismissError}>
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

export default LoginPage;