import React, { useState, createContext, useEffect } from 'react';
// import { ThemeProvider } from 'styled-components';
// import { lightTheme, darkTheme } from '../../theme';

export const UserContext = createContext({});
export const NeedsContext = createContext({});
export const ThemeContext = createContext({});
export const NewMessageContext = createContext({});

const UserContextStore = ({ children }) => {
    const [user, setUser] = useState([]);
    const [needs, setNeeds] = useState([]);
    const [currentTheme, setCurrentTheme] = useState('light');
    const [newMessageAlert, setNewMessageAlert] = useState(false)

    //check browser for theme preference
    //not working....yet
    useEffect(() => {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !currentTheme) {
            setCurrentTheme('dark')
        }
    }, [])

    return (
        <UserContext.Provider value={[user, setUser]}>
            <NeedsContext.Provider value={[needs, setNeeds]}>
                <ThemeContext.Provider value={[currentTheme, setCurrentTheme]}>
                    <NewMessageContext.Provider value={[newMessageAlert, setNewMessageAlert]}>
                    {children}
                    </NewMessageContext.Provider>
                </ThemeContext.Provider>
            </NeedsContext.Provider>
        </UserContext.Provider>
    );
};

export default UserContextStore;