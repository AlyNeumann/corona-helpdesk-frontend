import React, { useState, createContext} from 'react';

export const UserContext = createContext({});
export const NeedsContext = createContext({});

const UserContextStore = ({ children }) => {
    const [user, setUser] = useState([]);
    const [needs, setNeeds] = useState([]);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <NeedsContext.Provider value={[needs, setNeeds]}>
                {children}
            </NeedsContext.Provider>
        </UserContext.Provider>
    );
};

export default UserContextStore;