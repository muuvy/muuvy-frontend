import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({ user: {id: "", fullName: "", apiKey: "", favorites: []}});

export const Provider = (props: any) => {
    const {
        user: initialUser,
        children
    } = props;
    const [user, setUser] = useState(initialUser);

    const userContext = {
        user,
        setUser
    };

    return (
        <Context.Provider value={userContext}>{children}</Context.Provider>
    );
};

export const { Consumer } = Context;

Provider.propTypes = {
    user: PropTypes.object
};

Provider.defaultProps = {
    user: { id: "", fullName: "", apiKey: "", favorites: [] }
};