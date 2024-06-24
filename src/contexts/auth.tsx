import React from "react";

type AuthContextData = {
  isAuth: boolean;
};

const AuthContext = React.createContext({} as AuthContextData);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const isAuth = true;
  return (
    <AuthContext.Provider
      value={{
        isAuth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
