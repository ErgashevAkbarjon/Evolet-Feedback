import React, { useState } from "react";

const AuthContext = React.createContext();
export default AuthContext;

export function AuthContextProvider(props) {
    const [auth, setAuth] = useState(null);

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {props.children}
        </AuthContext.Provider>
    );
}

