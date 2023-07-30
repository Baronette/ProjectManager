import React, { useState, useContext, createContext } from 'react';

const AuthorizationContext = createContext();
const AuthorizationContextComponent = ({ children }) => {
    const [user, setUser] = useState();
    return (
        <AuthorizationContext.Provider value={{ user, setUser }}>
            {children}
        </AuthorizationContext.Provider>
    )
}
const useAuthorization = () => {
    return useContext(AuthorizationContext);
}
export { AuthorizationContextComponent, useAuthorization }