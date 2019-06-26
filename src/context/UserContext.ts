import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import { User } from "../dto/DTO";

export const Context = createContext({});

export const Provider = (props: any) => {
    const {
        user: initialUser,
        children
    } = props;
    const [user, setUser] = useState(initialUser);

    const addNewUser = (user: User) => {
        setUser({ user: user });
    };

    // Make the context object:
    const userContext = {
        user,
        setUser,
        addNewUser
    };

    //return <Context.Provider value={ userContext }> { children } < /Context.Provider>;  
};

export const { Consumer } = Context;

Provider.propTypes = {
    user: PropTypes.object
};

Provider.defaultProps = {
    user: {}
};