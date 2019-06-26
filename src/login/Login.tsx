import React, { useState, useContext } from 'react';

import API from '../muuvy-api';
import styles from './Login.module.scss';
import muuvyLogo from './../img/logo.png';
import history from '../history';
import { UserContext } from "../context";

export default function Login() {
  const [userName, setUsername] = useState('');
  const [error, setError] = useState('');
  const userContext : any = useContext(UserContext);

  async function handleSubmit(evt: any) {
    evt.preventDefault();

    if (!userName) {
      return setError('Username is required');
    }
    else {
      try {
        const res = await API.post('login', {
          fullName: userName
        });
        userContext.setUser(res.data);
        setError('');
        history.push('/home');
      }
      catch (httpError) {
        setError(httpError.message)
        console.log(httpError);
      }
    }
  }

  return (
    <div className={styles.AppLogin}>
      <div className={styles.LogoArea}>
        <div className={styles.LogoCenter}>
          <img title="muuvy logo" className={styles.HeaderLogo} src={muuvyLogo} alt="" />
          <h1 className={styles.HeaderTitle}>muuvy</h1>
        </div>
      </div>

      <div className={styles.LoginForm}>
        <form onSubmit={e => handleSubmit(e)}>
          <h2 className={styles.SignInLabel}>Sign in to muuvy</h2>
          <label>Username</label>
          <input className={styles.LoginInput} type="text" data-test="username" value={userName} onChange={e => setUsername(e.target.value)} />
          <input className={styles.SubmitButton} type="submit" value="Login" data-test="submit" />
          {
            error &&
            <p className={styles.LoginError} data-test="error" onClick={e => setError('')}>
              <button className={styles.LoginErrorButton} onClick={e => setError('')}>✖</button>
              <span className={styles.LoginErrorLabel}>{error}</span>
            </p>
          }
        </form>
      </div>
    </div>
  );
}