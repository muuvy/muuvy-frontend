import React from 'react';
import { Router, Route } from 'react-router-dom';
import history from './history';
import './App.css';
import Layout from './layout/Layout';
import Login from './login/Login';
import { UserContextProvider } from './context';

export default class App extends React.PureComponent {
    public render() {
        return (
            <UserContextProvider>
                <Router history={history}>
                    <Route path="/" exact component={Login} />
                    <Route path="/home" component={Layout} />
                </Router>
            </UserContextProvider>
        )
    }
}
