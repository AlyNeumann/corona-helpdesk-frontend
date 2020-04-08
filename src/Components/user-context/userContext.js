import React, { useState, createContext, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../../theme';

export const UserContext = createContext({});
export const NeedsContext = createContext({});
export const ThemeContext = createContext({});

const UserContextStore = ({ children }) => {
    const [user, setUser] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [theme, setTheme] = useState(lightTheme);

    //check browser for theme preference
    //not working....yet
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !theme) {
            setTheme(darkTheme)
        }
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            <NeedsContext.Provider value={[needs, setNeeds]}>
                <ThemeContext.Provider value={[theme, setTheme]}>
                    {children}
                </ThemeContext.Provider>
            </NeedsContext.Provider>
        </UserContext.Provider>
    );
};

export default UserContextStore;