import React, { useState } from "react";

export const AuthContext = React.createContext({
  isAuth: false,
  login: () => {},
});

const AuthContextProvider = (props) => {
  const [isAuth, setIsAuth] = useState(false);

  const logInHandler = () => {
    setIsAuth(true);
  };

  return (
    <AuthContext.Provider value={{ login: logInHandler, isAuth: isAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
