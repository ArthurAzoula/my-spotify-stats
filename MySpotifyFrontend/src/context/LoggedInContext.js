import React, { createContext, useContext, useReducer, useEffect } from 'react';

const LoggedInContext = createContext();

const initialState = {
    isLoggedIn: false,
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_LOGGED_IN':
            return { ...state, isLoggedIn: action.payload };
        default:
            return state;
    }
};

export const LoggedInProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        // Récupérer l'état de connexion depuis le serveur
        fetch('/auth/check-loggedin')
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'SET_LOGGED_IN', payload: data.loggedIn });
            });
    }, []);

    return (
        <LoggedInContext.Provider value={{ state, dispatch }}>
            {children}
        </LoggedInContext.Provider>
    );
};

export const useLoggedIn = () => {
    return useContext(LoggedInContext);
};
